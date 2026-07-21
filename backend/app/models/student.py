from sqlalchemy import Column, String, Integer, Boolean, DateTime, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.core.database import Base
import uuid

class Student(Base):
    __tablename__ = "students"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nombre = Column(String(200), nullable=False)
    email = Column(String(200), unique=True)
    edad = Column(Integer)
    rol_actual = Column(String(300))
    contexto_aprendizaje = Column(String)
    estilo_aprendizaje = Column(String(100), nullable=False) # 'pragmatico_no_code', 'tecnico_hard_code', 'mixto'
    perfil_cognitivo = Column(JSONB, default={})
    pain_points = Column(JSONB, default=[])
    goals = Column(JSONB, default=[])
    activo = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
