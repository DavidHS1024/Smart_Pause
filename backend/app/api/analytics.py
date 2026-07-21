"""Router para analíticas."""
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.database import get_db

router = APIRouter(prefix="/api/analytics", tags=["Analíticas"])

@router.get("/stats")
async def get_global_stats(db: AsyncSession = Depends(get_db)):
    """Estadísticas globales."""
    return {
        "total_students": 0,
        "total_courses": 0,
        "total_learning_objects": 0,
        "total_events": 0,
        "total_recommendations": 0,
        "avg_recommendation_score": 0.0
    }

@router.get("/student-performance")
async def get_student_performance(db: AsyncSession = Depends(get_db)):
    """Rendimiento de los estudiantes."""
    return []
