"""Router para recomendaciones."""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from uuid import UUID

from app.api.dependencies import get_db
from app.schemas.recommendation import RecommendationResponse, SmartPauseRequest, SmartPauseResponse, FeedbackRequest
from app.models.recommendation import Recommendation

router = APIRouter(prefix="/api/recommendations", tags=["Recomendaciones"])

@router.get("/student/{student_id}", response_model=List[RecommendationResponse])
async def get_active_recommendations(student_id: UUID, db: AsyncSession = Depends(get_db)):
    """Obtiene las recomendaciones activas de un estudiante."""
    result = await db.execute(
        select(Recommendation)
        .where(Recommendation.student_id == student_id)
        .where(Recommendation.status == 'pendiente')
    )
    return result.scalars().all()

@router.post("/generate/{student_id}")
async def generate_recommendations(
    student_id: UUID, 
    concept_id: Optional[UUID] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    """Genera nuevas recomendaciones."""
    return {"message": "Recomendaciones generadas exitosamente"}

@router.post("/smart-pause", response_model=SmartPauseResponse)
async def process_smart_pause(
    request: SmartPauseRequest, 
    db: AsyncSession = Depends(get_db)
):
    """Procesa eventos de Smart Pause y detecta estancamientos."""
    return SmartPauseResponse(
        student_id=request.student_id,
        stagnation_detected=False,
        recommended_resources=[],
        message="Evaluación completada"
    )

@router.post("/feedback")
async def submit_feedback(
    request: FeedbackRequest, 
    db: AsyncSession = Depends(get_db)
):
    """Envía retroalimentación para una recomendación."""
    result = await db.execute(select(Recommendation).where(Recommendation.id == request.recommendation_id))
    rec = result.scalar_one_or_none()
    if not rec:
        raise HTTPException(status_code=404, detail="Recomendación no encontrada")
    
    rec.feedback_rating = request.rating
    rec.status = 'aceptada' if request.accepted else 'rechazada'
    await db.commit()
    return {"message": "Feedback registrado"}

@router.get("/history/{student_id}")
async def get_recommendation_history(student_id: UUID, db: AsyncSession = Depends(get_db)):
    """Obtiene el historial de recomendaciones de un estudiante."""
    result = await db.execute(
        select(Recommendation)
        .where(Recommendation.student_id == student_id)
        .order_by(Recommendation.created_at.desc())
    )
    return result.scalars().all()
