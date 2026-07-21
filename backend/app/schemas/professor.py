"""Esquemas para profesores."""
from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime

class ProfessorBase(BaseModel):
    """Modelo base para un profesor."""
    name: str
    email: str
    department: str

class ProfessorResponse(ProfessorBase):
    """Esquema de respuesta para un profesor."""
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    created_at: datetime
