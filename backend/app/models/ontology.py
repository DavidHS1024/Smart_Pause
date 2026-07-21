"""Modelos de Ontología."""
import uuid
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from app.core.database import Base

class OntologyEntity(Base):
    """Entidad dentro de la ontología de conocimiento."""
    __tablename__ = 'ontology_entities'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(300), nullable=False)
    entity_type = Column(String(100))  # concepto, habilidad, competencia, tema
    properties = Column(JSONB)
    concept_id = Column(UUID(as_uuid=True), ForeignKey('concepts.id'), nullable=True)
    created_at = Column(DateTime, server_default=func.now())

    concept = relationship('Concept', back_populates='ontology_entities')
    outgoing_relations = relationship('OntologyRelation', foreign_keys='OntologyRelation.source_id', back_populates='source')
    incoming_relations = relationship('OntologyRelation', foreign_keys='OntologyRelation.target_id', back_populates='target')


class OntologyRelation(Base):
    """Relación entre entidades en la ontología."""
    __tablename__ = 'ontology_relations'

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source_id = Column(UUID(as_uuid=True), ForeignKey('ontology_entities.id'), nullable=False)
    target_id = Column(UUID(as_uuid=True), ForeignKey('ontology_entities.id'), nullable=False)
    relation_type = Column(String(100))  # prerequisito_de, parte_de, relacionado_con, requiere
    weight = Column(Float, default=1.0)
    properties = Column(JSONB)
    created_at = Column(DateTime, server_default=func.now())

    source = relationship('OntologyEntity', foreign_keys=[source_id], back_populates='outgoing_relations')
    target = relationship('OntologyEntity', foreign_keys=[target_id], back_populates='incoming_relations')
