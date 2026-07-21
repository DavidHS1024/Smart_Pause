"""Modelo de Objeto de Aprendizaje."""
import uuid
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from app.core.database import Base

class LearningObject(Base):
    """Representa un objeto de aprendizaje en el sistema."""
    __tablename__ = 'learning_objects'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(300), nullable=False)
    resource_type = Column(String(50))  # video, documento, ejercicio, simulacion, quiz
    url = Column(String(500))
    difficulty_level = Column(Integer)  # 1-5
    estimated_duration = Column(Integer)  # en minutos
    object_metadata = Column('metadata', JSONB)
    course_id = Column(UUID(as_uuid=True), ForeignKey('courses.id'))
    concept_id = Column(UUID(as_uuid=True), ForeignKey('concepts.id'), nullable=True)
    created_at = Column(DateTime, server_default=func.now())

    course = relationship('Course', back_populates='learning_objects')
    concept = relationship('Concept', back_populates='learning_objects')
    learning_events = relationship('LearningEvent', back_populates='learning_object')
    recommendations = relationship('Recommendation', back_populates='learning_object')
