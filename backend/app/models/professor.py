from sqlalchemy import Column, String, Boolean, DateTime, func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.core.database import Base
import uuid

class Professor(Base):
    __tablename__ = "professors"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    nombre = Column(String(200), nullable=False)
    email = Column(String(200), unique=True)
    especialidad = Column(String(300))
    pedagogia = Column(String(100), nullable=False) # 'hard_code', 'business_no_code', 'mixto'
    competencias = Column(JSONB, default=[])
    habilidades_industria = Column(String)
    bio = Column(String)
    activo = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
