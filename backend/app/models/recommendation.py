"""Modelo de Recomendación."""
import uuid
from sqlalchemy import Column, String, Integer, Float, Text, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.database import Base

class Recommendation(Base):
    """Recomendación de objeto de aprendizaje para un estudiante."""
    __tablename__ = 'recommendations'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey('students.id'), nullable=False)
    learning_object_id = Column(UUID(as_uuid=True), ForeignKey('learning_objects.id'), nullable=False)
    score = Column(Float)
    cf_score = Column(Float)  # collaborative filtering score
    ontology_score = Column(Float)
    reason = Column(Text)
    status = Column(String(50), default='pendiente')  # pendiente, aceptada, rechazada, completada
    created_at = Column(DateTime, server_default=func.now())
    feedback_at = Column(DateTime, nullable=True)
    feedback_rating = Column(Integer, nullable=True)  # 1-5

    student = relationship('Student', back_populates='recommendations')
    learning_object = relationship('LearningObject', back_populates='recommendations')
