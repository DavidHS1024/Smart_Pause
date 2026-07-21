"""Servicio de recorrido y consulta del grafo ontológico."""
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, text
from uuid import UUID
from typing import List, Dict, Any, Optional
from app.models.ontology import OntologyEntity, OntologyRelation
from app.models.learning_object import LearningObject


async def get_full_graph(db: AsyncSession) -> Dict[str, List[Dict]]:
    """Obtener el grafo completo de la ontología para visualización."""
    # Query all entities
    entities_result = await db.execute(select(OntologyEntity))
    entities = entities_result.scalars().all()
    
    # Query all relations
    relations_result = await db.execute(select(OntologyRelation))
    relations = relations_result.scalars().all()
    
    nodes = [
        {
            "data": {
                "id": str(e.id),
                "label": e.name,
                "type": e.entity_type,
                "properties": e.properties or {}
            }
        }
        for e in entities
    ]
    
    edges = [
        {
            "data": {
                "id": str(r.id),
                "source": str(r.source_id),
                "target": str(r.target_id),
                "label": r.relation_type,
                "weight": r.weight or 1.0
            }
        }
        for r in relations
    ]
    
    return {"nodes": nodes, "edges": edges}


async def traverse(
    db: AsyncSession,
    source_id: UUID,
    depth: int = 3
) -> Dict[str, List[Dict]]:
    """Recorrer el grafo desde un nodo fuente usando CTE recursivo."""
    # Use recursive CTE to traverse the graph
    cte_query = text("""
        WITH RECURSIVE traversal AS (
            -- Caso base: nodo fuente
            SELECT 
                oe.id, oe.name, oe.entity_type, oe.properties,
                0 as depth,
                oe.id as path_start
            FROM ontology_entities oe
            WHERE oe.id = :source_id
            
            UNION ALL
            
            -- Caso recursivo: seguir relaciones
            SELECT 
                oe2.id, oe2.name, oe2.entity_type, oe2.properties,
                t.depth + 1,
                t.path_start
            FROM traversal t
            JOIN ontology_relations r ON r.source_id = t.id
            JOIN ontology_entities oe2 ON oe2.id = r.target_id
            WHERE t.depth < :max_depth
        )
        SELECT DISTINCT id, name, entity_type, properties, depth
        FROM traversal
        ORDER BY depth
    """)
    
    result = await db.execute(cte_query, {"source_id": str(source_id), "max_depth": depth})
    rows = result.fetchall()
    
    # Build nodes from traversal results
    visited_ids = [row[0] for row in rows]
    nodes = [
        {
            "data": {
                "id": str(row[0]),
                "label": row[1],
                "type": row[2],
                "properties": row[3] or {},
                "depth": row[4]
            }
        }
        for row in rows
    ]
    
    # Get edges between visited nodes
    if visited_ids:
        edges_query = select(OntologyRelation).where(
            OntologyRelation.source_id.in_(visited_ids),
            OntologyRelation.target_id.in_(visited_ids)
        )
        edges_result = await db.execute(edges_query)
        relations = edges_result.scalars().all()
        
        edges = [
            {
                "data": {
                    "id": str(r.id),
                    "source": str(r.source_id),
                    "target": str(r.target_id),
                    "label": r.relation_type,
                    "weight": r.weight or 1.0
                }
            }
            for r in relations
        ]
    else:
        edges = []
    
    return {"nodes": nodes, "edges": edges}


async def find_matching_resources(
    db: AsyncSession,
    entity_ids: List[UUID],
    resource_type: Optional[str] = None
) -> List[LearningObject]:
    """Encontrar objetos de aprendizaje asociados a entidades ontológicas."""
    # Get concept_ids from entities
    entities_query = select(OntologyEntity.concept_id).where(
        OntologyEntity.id.in_(entity_ids),
        OntologyEntity.concept_id.isnot(None)
    )
    result = await db.execute(entities_query)
    concept_ids = [row[0] for row in result.fetchall()]
    
    if not concept_ids:
        return []
    
    # Find learning objects for those concepts
    lo_query = select(LearningObject).where(
        LearningObject.concept_id.in_(concept_ids)
    )
    if resource_type:
        lo_query = lo_query.where(LearningObject.resource_type == resource_type)
    
    result = await db.execute(lo_query)
    return list(result.scalars().all())
