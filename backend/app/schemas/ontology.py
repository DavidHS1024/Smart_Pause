"""Esquemas para la ontología."""
from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime
from typing import Optional, List, Dict, Any

class OntologyEntityResponse(BaseModel):
    """Esquema de respuesta para una entidad de la ontología."""
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    name: str
    entity_type: str
    properties: Optional[Dict[str, Any]] = None
    concept_id: Optional[UUID] = None
    created_at: datetime

class OntologyRelationResponse(BaseModel):
    """Esquema de respuesta para una relación de la ontología."""
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    source_id: UUID
    target_id: UUID
    relation_type: str
    weight: float
    properties: Optional[Dict[str, Any]] = None
    created_at: datetime

class CytoscapeNodeData(BaseModel):
    """Datos de nodo para Cytoscape."""
    id: str
    label: str
    type: str
    properties: Optional[Dict[str, Any]] = None

class CytoscapeNode(BaseModel):
    """Nodo de Cytoscape."""
    data: CytoscapeNodeData

class CytoscapeEdgeData(BaseModel):
    """Datos de enlace para Cytoscape."""
    id: str
    source: str
    target: str
    label: str
    weight: float

class CytoscapeEdge(BaseModel):
    """Enlace de Cytoscape."""
    data: CytoscapeEdgeData

class GraphResponse(BaseModel):
    """Respuesta de grafo completo."""
    nodes: List[CytoscapeNode]
    edges: List[CytoscapeEdge]
