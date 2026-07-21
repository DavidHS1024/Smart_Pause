"""Router para cursos."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from uuid import UUID

from app.api.dependencies import get_db
from app.schemas.course import CourseResponse, CourseDetail
from app.models.course import Course

router = APIRouter(prefix="/api/courses", tags=["Cursos"])

@router.get("/", response_model=List[CourseResponse])
async def list_courses(db: AsyncSession = Depends(get_db)):
    """Lista todos los cursos."""
    result = await db.execute(select(Course))
    return result.scalars().all()

@router.get("/{course_id}", response_model=CourseDetail)
async def get_course(course_id: UUID, db: AsyncSession = Depends(get_db)):
    """Obtiene un curso con sus objetos de aprendizaje."""
    result = await db.execute(select(Course).where(Course.id == course_id))
    course = result.scalar_one_or_none()
    if not course:
        raise HTTPException(status_code=404, detail="Curso no encontrado")
    
    return course
