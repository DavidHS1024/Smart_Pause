"""Esquemas para estudiantes."""
from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime
from typing import Optional, List

class StudentBase(BaseModel):
    """Modelo base para un estudiante."""
    name: str
    email: str
    learning_style: Optional[str] = None

class StudentCreate(StudentBase):
    """Esquema para crear un estudiante."""
    pass

class StudentResponse(StudentBase):
    """Esquema de respuesta para un estudiante."""
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    enrollment_date: datetime

class StudentDetail(StudentResponse):
    """Detalle de un estudiante con estadísticas."""
    total_events: Optional[int] = 0
    avg_score: Optional[float] = 0.0
    total_recommendations: Optional[int] = 0
