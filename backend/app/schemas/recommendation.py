"""Esquemas para recomendaciones e interacciones."""
from pydantic import BaseModel, ConfigDict, Field
from uuid import UUID
from datetime import datetime
from typing import Optional, List, Dict, Any

class RecommendationResponse(BaseModel):
    """Esquema de respuesta para una recomendación."""
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    student_id: UUID
    learning_object_id: UUID
    score: float
    cf_score: Optional[float] = None
    ontology_score: Optional[float] = None
    reason: Optional[str] = None
    status: str
    created_at: datetime
    feedback_rating: Optional[int] = None

class SmartPauseEvent(BaseModel):
    """Evento de Smart Pause."""
    event_type: str
    timestamp: datetime
    duration_seconds: Optional[int] = None
    metadata: Optional[Dict[str, Any]] = None

class SmartPauseRequest(BaseModel):
    """Solicitud para evaluación de Smart Pause."""
    student_id: UUID
    events: List[SmartPauseEvent]

class InterventionResource(BaseModel):
    """Recurso de intervención."""
    learning_object_id: UUID
    title: str
    resource_type: str
    score: float
    reason: str

class SmartPauseResponse(BaseModel):
    """Respuesta de intervención de Smart Pause."""
    student_id: UUID
    stagnation_detected: bool
    stagnation_type: Optional[str] = None
    severity: Optional[str] = None
    recommended_resources: List[InterventionResource]
    message: str

class FeedbackRequest(BaseModel):
    """Solicitud de feedback de recomendación."""
    recommendation_id: UUID
    rating: int = Field(ge=1, le=5)
    accepted: bool
