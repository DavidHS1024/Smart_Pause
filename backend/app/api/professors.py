"""Router para profesores."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from uuid import UUID

from app.api.dependencies import get_db
from app.schemas.professor import ProfessorResponse
from app.models.professor import Professor

router = APIRouter(prefix="/api/professors", tags=["Profesores"])

@router.get("/", response_model=List[ProfessorResponse])
async def list_professors(db: AsyncSession = Depends(get_db)):
    """Lista todos los profesores."""
    result = await db.execute(select(Professor))
    return result.scalars().all()

@router.get("/{professor_id}")
async def get_professor(professor_id: UUID, db: AsyncSession = Depends(get_db)):
    """Obtiene los detalles de un profesor, incluyendo sus cursos."""
    result = await db.execute(select(Professor).where(Professor.id == professor_id))
    professor = result.scalar_one_or_none()
    if not professor:
        raise HTTPException(status_code=404, detail="Profesor no encontrado")
    
    return professor
