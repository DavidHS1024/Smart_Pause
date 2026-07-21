"""Motor de recomendación híbrido: filtrado colaborativo + ontología."""
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import UUID, uuid4
from typing import List, Dict, Optional
from datetime import datetime

from app.core.config import settings
from app.models.recommendation import Recommendation
from app.models.knowledge_card import KnowledgeCard
from app.models.learning_object import LearningObject
from app.services.collaborative_filter import get_cf_recommendations
from app.services.ontology_traversal import traverse, find_matching_resources


class HybridEngine:
    """Motor híbrido que combina filtrado colaborativo con recorrido ontológico.
    
    La puntuación final se calcula como:
        score = alpha * ontology_score + (1 - alpha) * cf_score
    
    Donde alpha controla el peso relativo de cada componente.
    """
    
    def __init__(self, alpha: Optional[float] = None):
        """Inicializar el motor híbrido.
        
        Args:
            alpha: Peso del componente ontológico (0.0-1.0).
                   Por defecto usa RECOMMENDATION_ALPHA del archivo de configuración.
        """
        self.alpha = alpha or settings.RECOMMENDATION_ALPHA
    
    async def get_ontology_recommendations(
        self,
        db: AsyncSession,
        student_id: UUID,
        concept_id: Optional[UUID] = None
    ) -> List[Dict]:
        """Obtener recomendaciones basadas en la ontología.
        
        Analiza las brechas de conocimiento del estudiante y recorre
        el grafo ontológico para encontrar recursos relacionados.
        """
        recommendations = []
        
        # Obtener brechas de conocimiento (conceptos con bajo dominio)
        kc_query = select(KnowledgeCard).where(
            KnowledgeCard.student_id == student_id,
            KnowledgeCard.mastery_level < 0.5
        )
        if concept_id:
            kc_query = kc_query.where(KnowledgeCard.concept_id == concept_id)
        
        result = await db.execute(kc_query)
        weak_cards = result.scalars().all()
        
        for card in weak_cards:
            # Buscar entidades ontológicas vinculadas al concepto
            from app.models.ontology import OntologyEntity
            entity_query = select(OntologyEntity).where(
                OntologyEntity.concept_id == card.concept_id
            )
            entity_result = await db.execute(entity_query)
            entities = entity_result.scalars().all()
            
            for entity in entities:
                # Recorrer el grafo para encontrar nodos relacionados
                graph = await traverse(db, entity.id, depth=2)
                entity_ids = [UUID(node["data"]["id"]) for node in graph["nodes"]]
                
                # Encontrar recursos de aprendizaje asociados
                resources = await find_matching_resources(db, entity_ids)
                
                for resource in resources:
                    # Calcular puntuación ontológica basada en la brecha
                    gap_score = 1.0 - card.mastery_level
                    ontology_score = gap_score * 0.8 + 0.2  # Mínimo 0.2
                    
                    recommendations.append({
                        "learning_object_id": resource.id,
                        "ontology_score": float(ontology_score),
                        "reason": f"Recurso relacionado con brecha en '{entity.name}' (dominio: {card.mastery_level:.0%})"
                    })
        
        return recommendations
    
    async def generate_recommendations(
        self,
        db: AsyncSession,
        student_id: UUID,
        concept_id: Optional[UUID] = None,
        top_n: int = 10
    ) -> List[Recommendation]:
        """Generar recomendaciones híbridas combinando CF y ontología.
        
        Args:
            db: Sesión de base de datos
            student_id: ID del estudiante
            concept_id: ID de concepto específico (opcional)
            top_n: Número máximo de recomendaciones
        
        Returns:
            Lista de objetos Recommendation guardados en la base de datos
        """
        # Obtener recomendaciones de ambas fuentes
        cf_recs = await get_cf_recommendations(db, student_id, top_n=top_n * 2)
        onto_recs = await self.get_ontology_recommendations(db, student_id, concept_id)
        
        # Combinar recomendaciones por learning_object_id
        combined: Dict[UUID, Dict] = {}
        
        for rec in cf_recs:
            lo_id = rec["learning_object_id"]
            if lo_id not in combined:
                combined[lo_id] = {
                    "cf_score": 0.0,
                    "ontology_score": 0.0,
                    "reasons": []
                }
            combined[lo_id]["cf_score"] = rec["score"]
            combined[lo_id]["reasons"].append(rec["reason"])
        
        for rec in onto_recs:
            lo_id = rec["learning_object_id"]
            if lo_id not in combined:
                combined[lo_id] = {
                    "cf_score": 0.0,
                    "ontology_score": 0.0,
                    "reasons": []
                }
            combined[lo_id]["ontology_score"] = rec["ontology_score"]
            combined[lo_id]["reasons"].append(rec["reason"])
        
        # Calcular puntuación híbrida
        scored_recs = []
        for lo_id, data in combined.items():
            hybrid_score = (
                self.alpha * data["ontology_score"] +
                (1 - self.alpha) * data["cf_score"]
            )
            scored_recs.append({
                "learning_object_id": lo_id,
                "score": hybrid_score,
                "cf_score": data["cf_score"],
                "ontology_score": data["ontology_score"],
                "reason": " | ".join(data["reasons"])
            })
        
        # Ordenar por puntuación híbrida
        scored_recs.sort(key=lambda x: x["score"], reverse=True)
        scored_recs = scored_recs[:top_n]
        
        # Persistir recomendaciones en la base de datos
        saved_recommendations = []
        for rec in scored_recs:
            recommendation = Recommendation(
                id=uuid4(),
                student_id=student_id,
                learning_object_id=rec["learning_object_id"],
                score=rec["score"],
                cf_score=rec["cf_score"],
                ontology_score=rec["ontology_score"],
                reason=rec["reason"],
                status="pendiente"
            )
            db.add(recommendation)
            saved_recommendations.append(recommendation)
        
        await db.flush()
        return saved_recommendations
