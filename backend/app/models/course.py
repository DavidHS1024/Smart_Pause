from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.core.database import Base
import uuid

class Course(Base):
    __tablename__ = "courses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    titulo = Column(String(400), nullable=False)
    professor_id = Column(UUID(as_uuid=True), ForeignKey("professors.id", ondelete="SET NULL"))
    nivel = Column(String(50), nullable=False) # 'basico', 'intermedio', 'avanzado'
    escuela = Column(String(200), default="IA y Data Science")
    especialidad = Column(String(200))
    descripcion = Column(String)
    duracion_total_min = Column(Integer, default=0)
    activo = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relación bidireccional (opcional, si se necesita)
    # profesor = relationship("Professor", backref="courses")
