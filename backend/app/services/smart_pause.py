"""Servicio de detección de estancamiento e intervención inteligente (Smart Pause)."""
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from uuid import UUID
from typing import List, Dict, Optional, Any
from datetime import datetime, timedelta

from app.models.telemetry import LearningEvent, TestResult
from app.models.learning_object import LearningObject
from app.services.recommendation_engine import HybridEngine


# Umbrales de detección de estancamiento
PAUSE_THRESHOLD = 3          # Número mínimo de pausas para detectar confusión
SPEED_THRESHOLD = 0.8        # Velocidad relativa mínima (ratio)
TEST_FAIL_THRESHOLD = 2      # Número de tests fallidos para estado crítico
FAIL_SCORE_THRESHOLD = 0.5   # Puntuación por debajo de la cual se considera fallo


async def detect_stagnation(
    db: AsyncSession,
    student_id: UUID,
    events: List[Dict[str, Any]]
) -> Dict[str, Any]:
    """Detectar estancamiento del estudiante basado en eventos de telemetría.
    
    Tipos de estancamiento detectados:
    - confusion: >= 3 pausas en una sesión
    - difficulty: velocidad de reproducción <= 0.8x
    - critical: >= 2 tests fallidos consecutivos
    
    Args:
        db: Sesión de base de datos
        student_id: ID del estudiante
        events: Lista de eventos de la sesión actual
    
    Returns:
        Dict con detected(bool), type(str), severity(str), details(dict)
    """
    result = {
        "detected": False,
        "type": None,
        "severity": None,
        "details": {}
    }
    
    # Contar pausas en los eventos proporcionados
    pause_count = sum(1 for e in events if e.get("event_type") == "pausa")
    
    # Verificar velocidad de reproducción
    speed_events = [
        e for e in events 
        if e.get("metadata", {}).get("speed") is not None
    ]
    avg_speed = None
    if speed_events:
        speeds = [e["metadata"]["speed"] for e in speed_events]
        avg_speed = sum(speeds) / len(speeds)
    
    # Verificar tests fallidos recientes
    recent_tests = await db.execute(
        select(TestResult)
        .where(
            TestResult.student_id == student_id,
            TestResult.completed_at >= datetime.utcnow() - timedelta(hours=24)
        )
        .order_by(TestResult.completed_at.desc())
        .limit(5)
    )
    test_results = recent_tests.scalars().all()
    failed_tests = [t for t in test_results if t.score < FAIL_SCORE_THRESHOLD]
    
    # Evaluar estancamiento por prioridad (crítico > dificultad > confusión)
    if len(failed_tests) >= TEST_FAIL_THRESHOLD:
        result.update({
            "detected": True,
            "type": "critical",
            "severity": "alta",
            "details": {
                "failed_tests": len(failed_tests),
                "avg_score": sum(t.score for t in failed_tests) / len(failed_tests),
                "concepts": [str(t.concept_id) for t in failed_tests]
            }
        })
    elif avg_speed is not None and avg_speed <= SPEED_THRESHOLD:
        result.update({
            "detected": True,
            "type": "difficulty",
            "severity": "media",
            "details": {
                "avg_speed": avg_speed,
                "events_analyzed": len(speed_events)
            }
        })
    elif pause_count >= PAUSE_THRESHOLD:
        result.update({
            "detected": True,
            "type": "confusion",
            "severity": "media",
            "details": {
                "pause_count": pause_count,
                "total_events": len(events)
            }
        })
    
    return result


async def generate_intervention(
    db: AsyncSession,
    student_id: UUID,
    stagnation: Dict[str, Any]
) -> Dict[str, Any]:
    """Generar una intervención personalizada basada en el tipo de estancamiento.
    
    Estrategias de intervención:
    - confusion: Recursos explicativos alternativos (videos, documentos)
    - difficulty: Ejercicios de nivel inferior, simulaciones
    - critical: Plan de refuerzo completo con múltiples recursos
    
    Args:
        db: Sesión de base de datos
        student_id: ID del estudiante
        stagnation: Resultado de detect_stagnation
    
    Returns:
        Dict con message, resources, stagnation info
    """
    stagnation_type = stagnation.get("type")
    severity = stagnation.get("severity")
    
    # Mensajes personalizados según tipo de estancamiento
    messages = {
        "confusion": "Hemos detectado que podrías tener dudas. Te sugerimos estos recursos alternativos para reforzar tu comprensión.",
        "difficulty": "Parece que el material actual es desafiante. Aquí tienes recursos de apoyo a un nivel más accesible.",
        "critical": "Hemos identificado áreas que necesitan refuerzo urgente. Te proponemos un plan de recuperación personalizado."
    }
    
    message = messages.get(stagnation_type, "Te sugerimos explorar estos recursos complementarios.")
    
    # Generar recomendaciones usando el motor híbrido
    engine = HybridEngine()
    
    # Para estancamiento crítico, obtener el concepto de los tests fallidos
    concept_id = None
    if stagnation_type == "critical" and stagnation["details"].get("concepts"):
        from uuid import UUID as UUIDType
        concept_id = UUIDType(stagnation["details"]["concepts"][0])
    
    recommendations = await engine.generate_recommendations(
        db=db,
        student_id=student_id,
        concept_id=concept_id,
        top_n=5 if stagnation_type != "critical" else 8
    )
    
    # Formatear recursos para la respuesta
    resources = []
    for rec in recommendations:
        # Obtener detalles del objeto de aprendizaje
        lo_result = await db.execute(
            select(LearningObject).where(LearningObject.id == rec.learning_object_id)
        )
        lo = lo_result.scalar_one_or_none()
        
        if lo:
            resources.append({
                "learning_object_id": lo.id,
                "title": lo.title,
                "resource_type": lo.resource_type,
                "score": rec.score,
                "reason": rec.reason
            })
    
    return {
        "student_id": student_id,
        "stagnation_detected": True,
        "stagnation_type": stagnation_type,
        "severity": severity,
        "recommended_resources": resources,
        "message": message
    }
