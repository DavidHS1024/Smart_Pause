"""Router para estudiantes."""
from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Dict, Any
from uuid import UUID

from app.api.dependencies import get_db
from app.schemas.student import StudentResponse, StudentDetail
from app.models.student import Student
from app.models.learning import KnowledgeCard, Concept, Event

router = APIRouter(prefix="/api/students", tags=["Estudiantes"])

@router.get("/", response_model=List[StudentResponse])
async def list_students(db: AsyncSession = Depends(get_db)):
    """Lista todos los estudiantes."""
    result = await db.execute(select(Student))
    return result.scalars().all()

@router.get("/{student_id}", response_model=StudentDetail)
async def get_student(student_id: UUID, db: AsyncSession = Depends(get_db)):
    """Obtiene el detalle de un estudiante con estadísticas."""
    result = await db.execute(select(Student).where(Student.id == student_id))
    student = result.scalar_one_or_none()
    if not student:
        raise HTTPException(status_code=404, detail="Estudiante no encontrado")
    
    return {
        "id": student.id,
        "name": student.name,
        "email": student.email,
        "learning_style": student.learning_style,
        "enrollment_date": student.enrollment_date,
        "total_events": 0,
        "avg_score": 0.0,
        "total_recommendations": 0
    }

@router.post("/{student_id}/event")
async def register_event(
    student_id: UUID,
    event_type: str = Body(...),
    learning_object_id: UUID = Body(...),
    duration_seconds: int = Body(None),
    metadata: Dict[str, Any] = Body(None),
    db: AsyncSession = Depends(get_db)
):
    """Registra un evento de aprendizaje."""
    new_event = Event(
        student_id=student_id,
        event_type=event_type,
        learning_object_id=learning_object_id,
        duration_seconds=duration_seconds,
        metadata_=metadata
    )
    db.add(new_event)
    await db.commit()
    await db.refresh(new_event)
    return new_event

@router.get("/{student_id}/gaps")
async def analyze_gaps(student_id: UUID, db: AsyncSession = Depends(get_db)):
    """Analiza las brechas de conocimiento del estudiante."""
    stmt = (
        select(KnowledgeCard, Concept)
        .join(Concept, KnowledgeCard.concept_id == Concept.id)
        .where(KnowledgeCard.student_id == student_id)
        .where(KnowledgeCard.mastery_level < 0.5)
    )
    result = await db.execute(stmt)
    gaps = []
    for card, concept in result.all():
        gaps.append({
            "concept_name": concept.name,
            "mastery_level": card.mastery_level,
            "attempts": card.attempts
        })
    return gaps
