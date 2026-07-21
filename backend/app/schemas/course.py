"""Esquemas para cursos y objetos de aprendizaje."""
from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime
from typing import Optional, List, Dict, Any

class LearningObjectResponse(BaseModel):
    """Esquema de respuesta para un objeto de aprendizaje."""
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    title: str
    resource_type: str
    url: str
    difficulty_level: float
    estimated_duration: int
    metadata: Optional[Dict[str, Any]] = None
    concept_id: Optional[UUID] = None
    created_at: datetime

class CourseBase(BaseModel):
    """Modelo base para un curso."""
    name: str
    description: Optional[str] = None

class CourseResponse(CourseBase):
    """Esquema de respuesta para un curso."""
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    professor_id: Optional[UUID] = None
    created_at: datetime

class CourseDetail(CourseResponse):
    """Detalles de un curso con sus objetos de aprendizaje."""
    learning_objects: List[LearningObjectResponse] = []
