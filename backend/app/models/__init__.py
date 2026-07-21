from app.core.database import Base
from app.models.professor import Professor
from app.models.student import Student
from app.models.course import Course
from app.models.concept import Concept
from app.models.learning_object import LearningObject
from app.models.ontology import OntologyEntity, OntologyRelation
from app.models.knowledge_card import KnowledgeCard
from app.models.telemetry import LearningEvent, TestResult
from app.models.recommendation import Recommendation

# Exportar todos los modelos para Alembic y fácil importación
__all__ = [
    "Base",
    "Professor",
    "Student",
    "Course",
    "Concept",
    "LearningObject",
    "OntologyEntity",
    "OntologyRelation",
    "KnowledgeCard",
    "LearningEvent",
    "TestResult",
    "Recommendation"
]
