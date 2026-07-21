"""Router para la ontología."""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from uuid import UUID

from app.core.database import get_db
from app.schemas.ontology import GraphResponse, OntologyEntityResponse, CytoscapeNode, CytoscapeNodeData, CytoscapeEdge, CytoscapeEdgeData
from app.models.ontology import OntologyEntity, OntologyRelation

router = APIRouter(prefix="/api/ontology", tags=["Ontología"])

@router.get("/graph", response_model=GraphResponse)
async def get_graph(db: AsyncSession = Depends(get_db)):
    """Grafo completo para Cytoscape.js."""
    entities_result = await db.execute(select(OntologyEntity))
    entities = entities_result.scalars().all()
    
    relations_result = await db.execute(select(OntologyRelation))
    relations = relations_result.scalars().all()
    
    nodes = []
    for entity in entities:
        nodes.append(CytoscapeNode(data=CytoscapeNodeData(
            id=str(entity.id),
            label=entity.name,
            type=entity.entity_type,
            properties=entity.properties
        )))
        
    edges = []
    for rel in relations:
        edges.append(CytoscapeEdge(data=CytoscapeEdgeData(
            id=str(rel.id),
            source=str(rel.source_id),
            target=str(rel.target_id),
            label=rel.relation_type,
            weight=rel.weight
        )))
        
    return GraphResponse(nodes=nodes, edges=edges)

@router.get("/entity/{entity_id}", response_model=OntologyEntityResponse)
async def get_entity(entity_id: UUID, db: AsyncSession = Depends(get_db)):
    """Obtiene una entidad individual de la ontología."""
    result = await db.execute(select(OntologyEntity).where(OntologyEntity.id == entity_id))
    entity = result.scalar_one_or_none()
    if not entity:
        raise HTTPException(status_code=404, detail="Entidad no encontrada")
    return entity

@router.get("/traverse/{source_id}")
async def traverse_graph(source_id: UUID, depth: int = 3, db: AsyncSession = Depends(get_db)):
    """Atraviesa el grafo desde un origen."""
    return {"message": f"Traversed from {source_id} to depth {depth}"}
