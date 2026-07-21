"""Modelo de Concepto."""
import uuid
from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from app.core.database import Base

class Concept(Base):
    """Representa un concepto dentro de un curso."""
    __tablename__ = 'concepts'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(300), nullable=False)
    description = Column(Text)
    course_id = Column(UUID(as_uuid=True), ForeignKey('courses.id'))
    difficulty_level = Column(Integer)  # 1-5
    prerequisites = Column(JSONB)  # lista de IDs de conceptos
    created_at = Column(DateTime, server_default=func.now())

    course = relationship('Course', back_populates='concepts')
    ontology_entities = relationship('OntologyEntity', back_populates='concept')
    knowledge_cards = relationship('KnowledgeCard', back_populates='concept')
    test_results = relationship('TestResult', back_populates='concept')
    learning_objects = relationship('LearningObject', back_populates='concept')
