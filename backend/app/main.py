"""
Punto de entrada principal para la aplicación FastAPI de Smart Pause.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from app.core.config import settings

# Importar todos los enrutadores (asumiendo que existirán)
from app.api.students import router as students_router
from app.api.professors import router as professors_router
from app.api.courses import router as courses_router
from app.api.ontology import router as ontology_router
from app.api.recommendations import router as recommendations_router
from app.api.analytics import router as analytics_router

app = FastAPI(
    title=settings.APP_NAME,
    description="API para el sistema de recomendación híbrido de Smart Pause.",
    version="1.0.0"
)

# Configurar middleware de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir enrutadores
app.include_router(students_router, prefix="/api/students", tags=["students"])
app.include_router(professors_router, prefix="/api/professors", tags=["professors"])
app.include_router(courses_router, prefix="/api/courses", tags=["courses"])
app.include_router(ontology_router, prefix="/api/ontology", tags=["ontology"])
app.include_router(recommendations_router, prefix="/api/recommendations", tags=["recommendations"])
app.include_router(analytics_router, prefix="/api/analytics", tags=["analytics"])

@app.get("/")
async def root():
    """
    Ruta raíz que retorna información básica de la aplicación.
    """
    return {
        "app": settings.APP_NAME,
        "version": "1.0.0",
        "status": "active"
    }

@app.get("/api/health")
async def health():
    """
    Endpoint de salud para verificar el estado de la API y la conexión a la base de datos.
    """
    return {
        "status": "healthy",
        "database": "connected",
        "timestamp": datetime.now().isoformat()
    }
