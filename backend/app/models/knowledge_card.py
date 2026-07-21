"""Modelo de Tarjeta de Conocimiento."""
import uuid
from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from app.core.database import Base

class KnowledgeCard(Base):
    """Tarjeta de conocimiento del estudiante para un concepto."""
    __tablename__ = 'knowledge_cards'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey('students.id'), nullable=False)
    concept_id = Column(UUID(as_uuid=True), ForeignKey('concepts.id'), nullable=False)
    mastery_level = Column(Float, default=0.0)  # 0.0-1.0
    attempts = Column(Integer, default=0)
    last_interaction = Column(DateTime)
    strengths = Column(JSONB)
    weaknesses = Column(JSONB)
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    student = relationship('Student', back_populates='knowledge_cards')
    concept = relationship('Concept', back_populates='knowledge_cards')
