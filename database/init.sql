-- ============================================================
-- SMART PAUSE — Schema de Base de Datos
-- Sistema Híbrido de Recomendación (IA + Ontologías)
-- ============================================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================
-- 1. ACTORES
-- ============================================================

CREATE TABLE professors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE,
    especialidad VARCHAR(300),
    pedagogia VARCHAR(100) NOT NULL CHECK (pedagogia IN ('hard_code', 'business_no_code', 'mixto')),
    competencias JSONB DEFAULT '[]'::jsonb,
    habilidades_industria TEXT,
    bio TEXT,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(200) NOT NULL,
    email VARCHAR(200) UNIQUE,
    edad INTEGER,
    rol_actual VARCHAR(300),
    contexto_aprendizaje TEXT,
    estilo_aprendizaje VARCHAR(100) NOT NULL CHECK (estilo_aprendizaje IN ('pragmatico_no_code', 'tecnico_hard_code', 'mixto')),
    perfil_cognitivo JSONB DEFAULT '{}'::jsonb,
    pain_points JSONB DEFAULT '[]'::jsonb,
    goals JSONB DEFAULT '[]'::jsonb,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 2. CONTENIDO EDUCATIVO
-- ============================================================

CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(400) NOT NULL,
    professor_id UUID REFERENCES professors(id) ON DELETE SET NULL,
    nivel VARCHAR(50) NOT NULL CHECK (nivel IN ('basico', 'intermedio', 'avanzado')),
    escuela VARCHAR(200) DEFAULT 'IA y Data Science',
    especialidad VARCHAR(200),
    descripcion TEXT,
    duracion_total_min INTEGER DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE concepts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(300) NOT NULL,
    nivel_taxonomico INTEGER NOT NULL CHECK (nivel_taxonomico BETWEEN 1 AND 4),
    -- 1=Escuela, 2=Especialidad, 3=Framework, 4=Concepto Atómico
    descripcion TEXT,
    parent_concept_id UUID REFERENCES concepts(id) ON DELETE SET NULL,
    disponibilidad VARCHAR(50) DEFAULT 'alta' CHECK (disponibilidad IN ('alta', 'media', 'critica')),
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE learning_objects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    concept_id UUID REFERENCES concepts(id) ON DELETE SET NULL,
    titulo VARCHAR(400) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('video', 'lectura', 'ejercicio', 'test', 'proyecto')),
    duracion_min FLOAT DEFAULT 0,
    orden INTEGER DEFAULT 0,
    contenido_url VARCHAR(500),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 3. ONTOLOGÍA (Grafo en PostgreSQL)
-- ============================================================

CREATE TABLE ontology_entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN (
        'Student', 'Professor', 'Concept', 'Course',
        'LearningObject', 'Method', 'Style', 'KnowledgeCard'
    )),
    name VARCHAR(400) NOT NULL,
    ref_id UUID,  -- Referencia opcional a la tabla origen (students.id, professors.id, etc.)
    properties JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_ontology_entities_type ON ontology_entities(entity_type);
CREATE INDEX idx_ontology_entities_name ON ontology_entities USING gin(name gin_trgm_ops);
CREATE INDEX idx_ontology_entities_ref ON ontology_entities(ref_id);

CREATE TABLE ontology_relations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID NOT NULL REFERENCES ontology_entities(id) ON DELETE CASCADE,
    target_id UUID NOT NULL REFERENCES ontology_entities(id) ON DELETE CASCADE,
    rel_type VARCHAR(100) NOT NULL CHECK (rel_type IN (
        'TIENE_ESTILO',
        'PRESENTA_BRECHA',
        'USA_METODOLOGIA',
        'EXPLICA_RESUELVE',
        'CONTIENE',
        'PREREQUISITO',
        'PERTENECE_A',
        'ENSEÑA',
        'CREADO_POR',
        'ALTERNATIVA_A',
        'NIVEL_DE',
        'EVALUA'
    )),
    weight FLOAT DEFAULT 1.0,
    properties JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT no_self_relation CHECK (source_id != target_id)
);

CREATE INDEX idx_ontology_relations_source ON ontology_relations(source_id);
CREATE INDEX idx_ontology_relations_target ON ontology_relations(target_id);
CREATE INDEX idx_ontology_relations_type ON ontology_relations(rel_type);

-- ============================================================
-- 4. FICHAS DE CONOCIMIENTO TÁCITO
-- ============================================================

CREATE TABLE knowledge_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    professor_id UUID NOT NULL REFERENCES professors(id) ON DELETE CASCADE,
    concept_id UUID NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('error_comun', 'analogia_didactica')),
    titulo VARCHAR(400) NOT NULL,
    contenido JSONB NOT NULL,
    -- Para error_comun: {sintoma, falta_tecnica, solucion_pragmatica}
    -- Para analogia: {analogia, contexto, audiencia_objetivo}
    recurso_soporte VARCHAR(500),
    efectividad_score FLOAT DEFAULT 0.0,
    usos_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- 5. TELEMETRÍA Y EVENTOS DE APRENDIZAJE
-- ============================================================

CREATE TABLE learning_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    learning_object_id UUID REFERENCES learning_objects(id) ON DELETE SET NULL,
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN (
        'PLAY', 'PAUSE', 'RESUME', 'COMPLETE',
        'SPEED_CHANGE', 'SEEK', 'REWIND',
        'TEST_START', 'TEST_SUBMIT',
        'SMART_PAUSE_SHOWN', 'SMART_PAUSE_ACCEPTED', 'SMART_PAUSE_REJECTED'
    )),
    metadata JSONB DEFAULT '{}'::jsonb,
    -- Ejemplos de metadata:
    -- PAUSE: {position_seconds, pause_count_session}
    -- SPEED_CHANGE: {old_speed, new_speed}
    -- TEST_SUBMIT: {score, max_score, time_spent_seconds}
    session_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_learning_events_student ON learning_events(student_id);
CREATE INDEX idx_learning_events_type ON learning_events(event_type);
CREATE INDEX idx_learning_events_created ON learning_events(created_at DESC);

CREATE TABLE test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    concept_id UUID NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
    learning_object_id UUID REFERENCES learning_objects(id) ON DELETE SET NULL,
    score FLOAT NOT NULL CHECK (score BETWEEN 0 AND 100),
    max_score FLOAT DEFAULT 100,
    passed BOOLEAN GENERATED ALWAYS AS (score >= 60) STORED,
    attempt_number INTEGER DEFAULT 1,
    time_spent_seconds INTEGER,
    answers JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_test_results_student ON test_results(student_id);
CREATE INDEX idx_test_results_concept ON test_results(concept_id);

-- ============================================================
-- 6. RECOMENDACIONES
-- ============================================================

CREATE TABLE recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    recommended_object_id UUID REFERENCES learning_objects(id) ON DELETE SET NULL,
    recommended_card_id UUID REFERENCES knowledge_cards(id) ON DELETE SET NULL,
    trigger_type VARCHAR(50) NOT NULL CHECK (trigger_type IN (
        'smart_pause', 'proactive', 'on_demand', 'post_test'
    )),
    reason JSONB NOT NULL DEFAULT '{}'::jsonb,
    -- {explanation: "...", matched_gap: "...", matched_style: "..."}
    score_cf FLOAT DEFAULT 0.0,        -- Score del filtrado colaborativo
    score_ontology FLOAT DEFAULT 0.0,  -- Score del traversal ontológico
    score_final FLOAT DEFAULT 0.0,     -- Score combinado (α*CF + (1-α)*Onto)
    was_accepted BOOLEAN,
    feedback_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_recommendations_student ON recommendations(student_id);
CREATE INDEX idx_recommendations_created ON recommendations(created_at DESC);

-- ============================================================
-- 7. VISTAS ÚTILES
-- ============================================================

-- Vista: Brechas de conocimiento por estudiante
CREATE VIEW student_knowledge_gaps AS
SELECT
    s.id AS student_id,
    s.nombre AS student_name,
    c.id AS concept_id,
    c.nombre AS concept_name,
    COALESCE(
        (SELECT AVG(tr.score) FROM test_results tr
         WHERE tr.student_id = s.id AND tr.concept_id = c.id),
        0
    ) AS avg_score,
    COALESCE(
        (SELECT COUNT(*) FROM test_results tr
         WHERE tr.student_id = s.id AND tr.concept_id = c.id AND tr.passed = FALSE),
        0
    ) AS fail_count,
    CASE
        WHEN COALESCE((SELECT AVG(tr.score) FROM test_results tr
             WHERE tr.student_id = s.id AND tr.concept_id = c.id), 0) < 40 THEN 'critica'
        WHEN COALESCE((SELECT AVG(tr.score) FROM test_results tr
             WHERE tr.student_id = s.id AND tr.concept_id = c.id), 0) < 70 THEN 'moderada'
        ELSE 'leve'
    END AS gap_severity
FROM students s
CROSS JOIN concepts c
WHERE c.nivel_taxonomico = 4;

-- Vista: Estadísticas del sistema
CREATE VIEW system_stats AS
SELECT
    (SELECT COUNT(*) FROM students WHERE activo = TRUE) AS total_students,
    (SELECT COUNT(*) FROM professors WHERE activo = TRUE) AS total_professors,
    (SELECT COUNT(*) FROM courses WHERE activo = TRUE) AS total_courses,
    (SELECT COUNT(*) FROM learning_objects) AS total_learning_objects,
    (SELECT COUNT(*) FROM concepts) AS total_concepts,
    (SELECT COUNT(*) FROM ontology_entities) AS total_ontology_entities,
    (SELECT COUNT(*) FROM ontology_relations) AS total_ontology_relations,
    (SELECT COUNT(*) FROM knowledge_cards) AS total_knowledge_cards,
    (SELECT COUNT(*) FROM recommendations) AS total_recommendations,
    (SELECT COUNT(*) FROM recommendations WHERE was_accepted = TRUE) AS accepted_recommendations,
    (SELECT COUNT(*) FROM learning_events) AS total_events;
