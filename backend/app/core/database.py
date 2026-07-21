from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from typing import AsyncGenerator
from app.core.config import settings

# Engine
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,  # Poner en True para debuguear SQL
    future=True
)

# Sesiones asíncronas
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Base para los modelos
Base = declarative_base()

# Dependencia para inyectar la sesión en los endpoints FastAPI
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session
