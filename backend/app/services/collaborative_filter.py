"""Servicio de filtrado colaborativo basado en similitud de coseno."""
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from uuid import UUID
from typing import List, Dict, Tuple, Optional
from app.models.telemetry import TestResult
from app.models.learning_object import LearningObject


async def build_user_item_matrix(
    db: AsyncSession
) -> Tuple[np.ndarray, List[UUID], List[UUID]]:
    """Construir la matriz usuario-ítem a partir de resultados de tests.
    
    Returns:
        matrix: Matriz numpy de puntuaciones (estudiantes x conceptos)
        student_ids: Lista de IDs de estudiantes (filas)
        concept_ids: Lista de IDs de conceptos (columnas)
    """
    result = await db.execute(
        select(TestResult.student_id, TestResult.concept_id, TestResult.score)
    )
    rows = result.fetchall()
    
    if not rows:
        return np.array([]), [], []
    
    # Obtener IDs únicos
    student_ids = list(set(row[0] for row in rows))
    concept_ids = list(set(row[1] for row in rows))
    
    student_idx = {sid: i for i, sid in enumerate(student_ids)}
    concept_idx = {cid: i for i, cid in enumerate(concept_ids)}
    
    # Construir matriz
    matrix = np.zeros((len(student_ids), len(concept_ids)))
    for student_id, concept_id, score in rows:
        matrix[student_idx[student_id]][concept_idx[concept_id]] = score
    
    return matrix, student_ids, concept_ids


async def get_similar_students(
    matrix: np.ndarray,
    student_idx: int,
    top_k: int = 5
) -> List[Tuple[int, float]]:
    """Encontrar los estudiantes más similares usando similitud de coseno.
    
    Args:
        matrix: Matriz usuario-ítem
        student_idx: Índice del estudiante objetivo
        top_k: Número de vecinos más similares
    
    Returns:
        Lista de tuplas (índice_estudiante, similitud)
    """
    if matrix.size == 0 or matrix.shape[0] < 2:
        return []
    
    # Calcular similitud de coseno con todos los demás estudiantes
    student_vector = matrix[student_idx].reshape(1, -1)
    similarities = cosine_similarity(student_vector, matrix)[0]
    
    # Excluir al propio estudiante y ordenar
    similar_indices = np.argsort(similarities)[::-1]
    results = []
    for idx in similar_indices:
        if idx != student_idx and similarities[idx] > 0:
            results.append((int(idx), float(similarities[idx])))
            if len(results) >= top_k:
                break
    
    return results


async def get_cf_recommendations(
    db: AsyncSession,
    student_id: UUID,
    top_n: int = 10
) -> List[Dict]:
    """Generar recomendaciones por filtrado colaborativo.
    
    Proceso:
    1. Construir matriz usuario-ítem
    2. Encontrar estudiantes similares
    3. Recomendar conceptos que los similares dominan pero el estudiante no
    4. Mapear conceptos a objetos de aprendizaje
    
    Returns:
        Lista de dicts con learning_object_id, score, reason
    """
    matrix, student_ids, concept_ids = await build_user_item_matrix(db)
    
    if matrix.size == 0 or student_id not in student_ids:
        return []
    
    student_idx = student_ids.index(student_id)
    similar_students = await get_similar_students(matrix, student_idx)
    
    if not similar_students:
        return []
    
    # Calcular puntuaciones predichas basadas en vecinos similares
    student_scores = matrix[student_idx]
    predicted_scores = np.zeros(len(concept_ids))
    total_similarity = 0
    
    for sim_idx, similarity in similar_students:
        predicted_scores += similarity * matrix[sim_idx]
        total_similarity += similarity
    
    if total_similarity > 0:
        predicted_scores /= total_similarity
    
    # Encontrar conceptos con alta predicción pero bajo dominio actual
    recommendations = []
    for i, (predicted, actual) in enumerate(zip(predicted_scores, student_scores)):
        if predicted > 0.3 and actual < 0.5:  # Concepto prometedor poco dominado
            concept_id = concept_ids[i]
            # Buscar objetos de aprendizaje para este concepto
            lo_result = await db.execute(
                select(LearningObject).where(
                    LearningObject.concept_id == concept_id
                )
            )
            learning_objects = lo_result.scalars().all()
            
            for lo in learning_objects:
                recommendations.append({
                    "learning_object_id": lo.id,
                    "score": float(predicted),
                    "reason": f"Estudiantes similares se beneficiaron de este recurso (similitud: {predicted:.2f})"
                })
    
    # Ordenar por puntuación y limitar
    recommendations.sort(key=lambda x: x["score"], reverse=True)
    return recommendations[:top_n]
