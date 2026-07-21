"""Modelos de Telemetría."""
import uuid
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from app.core.database import Base

class LearningEvent(Base):
    """Evento de aprendizaje registrado por la telemetría."""
    __tablename__ = 'learning_events'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey('students.id'), nullable=False)
    event_type = Column(String(100))  # pausa, reproduccion, retroceso, avance, abandono, completado
    learning_object_id = Column(UUID(as_uuid=True), ForeignKey('learning_objects.id'), nullable=True)
    timestamp = Column(DateTime, server_default=func.now())
    duration_seconds = Column(Integer)
    event_metadata = Column('metadata', JSONB)  # position, speed, context...

    student = relationship('Student', back_populates='learning_events')
    learning_object = relationship('LearningObject', back_populates='learning_events')


class TestResult(Base):
    """Resultado de una prueba o evaluación."""
    __tablename__ = 'test_results'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey('students.id'), nullable=False)
    concept_id = Column(UUID(as_uuid=True), ForeignKey('concepts.id'), nullable=False)
    score = Column(Float)  # 0.0-1.0
    max_score = Column(Float, default=1.0)
    completed_at = Column(DateTime, server_default=func.now())
    answers = Column(JSONB)
    time_spent_seconds = Column(Integer)

    student = relationship('Student', back_populates='test_results')
    concept = relationship('Concept', back_populates='test_results')
