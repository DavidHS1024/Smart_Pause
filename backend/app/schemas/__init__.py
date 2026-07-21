"""Esquemas Pydantic para la API."""

from .student import StudentBase, StudentCreate, StudentResponse, StudentDetail
from .professor import ProfessorBase, ProfessorResponse
from .course import LearningObjectResponse, CourseBase, CourseResponse, CourseDetail
from .ontology import OntologyEntityResponse, OntologyRelationResponse, CytoscapeNodeData, CytoscapeNode, CytoscapeEdgeData, CytoscapeEdge, GraphResponse
from .recommendation import RecommendationResponse, SmartPauseEvent, SmartPauseRequest, InterventionResource, SmartPauseResponse, FeedbackRequest
