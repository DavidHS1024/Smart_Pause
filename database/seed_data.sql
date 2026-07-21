-- ============================================================
-- SMART PAUSE — Datos Semilla (Seed Data)
-- Datos precargados para demostración del MVP
-- ============================================================

-- ============================================================
-- 1. PROFESORES
-- ============================================================

INSERT INTO professors (id, nombre, email, especialidad, pedagogia, competencias, habilidades_industria, bio) VALUES
(
    'a1b2c3d4-1111-4000-a000-000000000001',
    'Juan Carlos Osorio',
    'jc.osorio@platzi.com',
    'Machine Learning y Deep Learning',
    'hard_code',
    '["Machine Learning", "Deep Learning", "Algoritmos Predictivos", "Álgebra Lineal", "Modelos Supervisados", "Python", "AWS", "TensorFlow"]'::jsonb,
    'Diseño de canalizaciones de datos (data pipelines), optimización y despliegue de modelos de IA a gran escala en AWS.',
    'AI/ML Engineer & AWS Instructor. Enfoque avanzado basado en líneas de código puras en Python, formulación matemática y lógica de ingeniería.'
),
(
    'a1b2c3d4-2222-4000-a000-000000000002',
    'Frida Ruh',
    'frida.ruh@platzi.com',
    'Inteligencia Artificial para Negocios',
    'business_no_code',
    '["IA para Negocios", "Automatización", "Ciencia de Datos Aplicada", "Análisis de Mercado", "Diseño Conceptual", "Productividad con IA"]'::jsonb,
    'Implementación estratégica de IA en startups, optimización de flujos de trabajo comerciales y analítica de datos de mercado.',
    'Especialista en IA y Consultora. Enfoque pragmático (Business/No-Code): resolución de casos de uso corporativos, toma de decisiones y diseño conceptual sin dependencias de código.'
);

-- ============================================================
-- 2. ESTUDIANTES (Arquetipos)
-- ============================================================

INSERT INTO students (id, nombre, email, edad, rol_actual, contexto_aprendizaje, estilo_aprendizaje, perfil_cognitivo, pain_points, goals) VALUES
(
    'b1b2c3d4-1111-4000-b000-000000000001',
    'Sofía Martínez',
    'sofia.martinez@demo.com',
    28,
    'Analista de Operaciones Jr. en una Startup de Logística',
    'Estudia de manera asíncrona en Platzi (Escuela de IA y Data Science) durante las noches y fines de semana.',
    'pragmatico_no_code',
    '{"nivel_general": "intermedio", "fortalezas": ["análisis de negocio", "pensamiento estratégico"], "debilidades": ["álgebra lineal", "sintaxis Python avanzada"], "horas_estudio_semana": 8}'::jsonb,
    '["Parálisis por análisis ante la inmensa oferta de cursos (infoxicación)", "Se estanca al reprobar tests técnicos de conceptos abstractos como Overfitting", "Siente que los cursos avanzados asumen dominio del Hard Code"]'::jsonb,
    '["Guía predictiva que entienda su perfil y actúe como tutor", "Reducir Time-to-Competence", "Aplicar automatización de forma inmediata en su empleo"]'::jsonb
),
(
    'b1b2c3d4-2222-4000-b000-000000000002',
    'Carlos Mendoza',
    'carlos.mendoza@demo.com',
    24,
    'Desarrollador Backend Jr. en empresa de software',
    'Estudia a tiempo parcial buscando especializarse en Machine Learning.',
    'tecnico_hard_code',
    '{"nivel_general": "intermedio-avanzado", "fortalezas": ["Python", "SQL", "lógica de programación"], "debilidades": ["estadística avanzada", "despliegue en producción"], "horas_estudio_semana": 12}'::jsonb,
    '["Necesita profundizar en la matemática detrás de los algoritmos", "Quiere experiencia práctica con despliegue en AWS"]'::jsonb,
    '["Convertirse en ML Engineer", "Dominar el pipeline completo de ML en producción"]'::jsonb
),
(
    'b1b2c3d4-3333-4000-b000-000000000003',
    'Ana Lucía Torres',
    'ana.torres@demo.com',
    32,
    'Product Manager en empresa de tecnología financiera',
    'Estudia para entender IA a nivel estratégico y técnico para su rol de producto.',
    'mixto',
    '{"nivel_general": "intermedio", "fortalezas": ["gestión de producto", "comunicación", "análisis de datos básico"], "debilidades": ["código avanzado", "modelos matemáticos"], "horas_estudio_semana": 6}'::jsonb,
    '["Necesita entender tanto la parte técnica como la de negocio", "Poco tiempo disponible entre trabajo y estudio"]'::jsonb,
    '["Tomar decisiones informadas sobre productos con IA", "Comunicarse efectivamente con equipos de ML"]'::jsonb
);

-- ============================================================
-- 3. CONCEPTOS (Taxonomía Jerárquica)
-- ============================================================

-- Nivel 1: Escuela
INSERT INTO concepts (id, nombre, nivel_taxonomico, descripcion, parent_concept_id, disponibilidad) VALUES
('c0000000-0001-4000-c000-000000000001', 'Inteligencia Artificial y Data Science', 1, 'Escuela principal de IA y Ciencia de Datos en Platzi', NULL, 'alta');

-- Nivel 2: Especialidades
INSERT INTO concepts (id, nombre, nivel_taxonomico, descripcion, parent_concept_id, disponibilidad) VALUES
('c0000000-0002-4000-c000-000000000001', 'Machine Learning y Modelos Predictivos', 2, 'Especialidad en algoritmos de aprendizaje automático', 'c0000000-0001-4000-c000-000000000001', 'alta'),
('c0000000-0002-4000-c000-000000000002', 'IA Aplicada a Negocios y Productividad', 2, 'Aplicación estratégica de IA en entornos empresariales', 'c0000000-0001-4000-c000-000000000001', 'media'),
('c0000000-0002-4000-c000-000000000003', 'Arquitectura Avanzada e Infraestructura LLM', 2, 'Diseño de sistemas de IA a gran escala con modelos de lenguaje', 'c0000000-0001-4000-c000-000000000001', 'critica');

-- Nivel 3: Frameworks/Herramientas
INSERT INTO concepts (id, nombre, nivel_taxonomico, descripcion, parent_concept_id, disponibilidad) VALUES
('c0000000-0003-4000-c000-000000000001', 'Scikit-Learn', 3, 'Biblioteca de Python para Machine Learning clásico', 'c0000000-0002-4000-c000-000000000001', 'alta'),
('c0000000-0003-4000-c000-000000000002', 'TensorFlow', 3, 'Framework de Google para Deep Learning', 'c0000000-0002-4000-c000-000000000001', 'alta'),
('c0000000-0003-4000-c000-000000000003', 'Pandas y NumPy', 3, 'Herramientas de manipulación y análisis de datos', 'c0000000-0002-4000-c000-000000000001', 'alta');

-- Nivel 4: Conceptos Atómicos
INSERT INTO concepts (id, nombre, nivel_taxonomico, descripcion, parent_concept_id, disponibilidad) VALUES
('c0000000-0004-4000-c000-000000000001', 'Overfitting (Sobreajuste)', 4, 'Cuando un modelo se ajusta demasiado a los datos de entrenamiento y no generaliza bien.', 'c0000000-0003-4000-c000-000000000001', 'alta'),
('c0000000-0004-4000-c000-000000000002', 'Cross-Validation', 4, 'Técnica de validación que divide los datos en múltiples subconjuntos para evaluar la generalización.', 'c0000000-0003-4000-c000-000000000001', 'alta'),
('c0000000-0004-4000-c000-000000000003', 'Redes Neuronales Convolucionales (CNN)', 4, 'Arquitectura de red neuronal especializada en procesamiento de imágenes.', 'c0000000-0003-4000-c000-000000000002', 'alta'),
('c0000000-0004-4000-c000-000000000004', 'Data Leakage', 4, 'Inclusión accidental de información del conjunto de prueba en el entrenamiento.', 'c0000000-0003-4000-c000-000000000001', 'alta'),
('c0000000-0004-4000-c000-000000000005', 'Regresión Lineal', 4, 'Modelo estadístico que predice una variable continua usando relaciones lineales.', 'c0000000-0003-4000-c000-000000000001', 'alta'),
('c0000000-0004-4000-c000-000000000006', 'Árboles de Decisión', 4, 'Algoritmo de clasificación/regresión que divide datos en ramas según condiciones.', 'c0000000-0003-4000-c000-000000000001', 'alta'),
('c0000000-0004-4000-c000-000000000007', 'Gradient Descent', 4, 'Algoritmo de optimización que minimiza la función de pérdida iterativamente.', 'c0000000-0003-4000-c000-000000000002', 'alta'),
('c0000000-0004-4000-c000-000000000008', 'Transfer Learning', 4, 'Técnica que reutiliza modelos pre-entrenados para nuevas tareas.', 'c0000000-0003-4000-c000-000000000002', 'alta'),
('c0000000-0004-4000-c000-000000000009', 'Feature Engineering', 4, 'Proceso de crear variables predictoras a partir de datos brutos.', 'c0000000-0003-4000-c000-000000000003', 'alta'),
('c0000000-0004-4000-c000-000000000010', 'Automatización con IA', 4, 'Uso de herramientas de IA para automatizar procesos empresariales.', 'c0000000-0002-4000-c000-000000000002', 'media');

-- ============================================================
-- 4. CURSOS
-- ============================================================

INSERT INTO courses (id, titulo, professor_id, nivel, escuela, especialidad, descripcion, duracion_total_min) VALUES
(
    'd0000000-0001-4000-d000-000000000001',
    'Fundamentos de Machine Learning',
    'a1b2c3d4-1111-4000-a000-000000000001',
    'intermedio',
    'IA y Data Science',
    'Machine Learning y Modelos Predictivos',
    'Curso fundamental de ML con Python. Cubre desde regresión hasta técnicas avanzadas de validación.',
    480
),
(
    'd0000000-0002-4000-d000-000000000002',
    'IA para Productividad y Negocios',
    'a1b2c3d4-2222-4000-a000-000000000002',
    'basico',
    'IA y Data Science',
    'IA Aplicada a Negocios y Productividad',
    'Curso práctico sobre cómo implementar IA en procesos de negocio sin necesidad de programar.',
    360
),
(
    'd0000000-0003-4000-d000-000000000003',
    'Deep Learning con TensorFlow',
    'a1b2c3d4-1111-4000-a000-000000000001',
    'avanzado',
    'IA y Data Science',
    'Machine Learning y Modelos Predictivos',
    'Arquitecturas avanzadas de redes neuronales: CNN, RNN, Transformers.',
    600
),
(
    'd0000000-0004-4000-d000-000000000004',
    'Data Science Aplicada a Startups',
    'a1b2c3d4-2222-4000-a000-000000000002',
    'intermedio',
    'IA y Data Science',
    'IA Aplicada a Negocios y Productividad',
    'Cómo una startup puede aprovechar datos y modelos básicos de IA para crecer.',
    300
);

-- ============================================================
-- 5. OBJETOS DE APRENDIZAJE (Learning Objects)
-- ============================================================

-- Curso: Fundamentos de ML (Juan Carlos Osorio)
INSERT INTO learning_objects (id, course_id, concept_id, titulo, tipo, duracion_min, orden, metadata) VALUES
('e0000000-0001-4000-e000-000000000001', 'd0000000-0001-4000-d000-000000000001', 'c0000000-0004-4000-c000-000000000005', 'Introducción a la Regresión Lineal', 'video', 8, 1, '{"enfoque": "hard_code", "lenguaje": "Python"}'::jsonb),
('e0000000-0002-4000-e000-000000000002', 'd0000000-0001-4000-d000-000000000001', 'c0000000-0004-4000-c000-000000000001', 'Entendiendo el Overfitting — Código Python', 'video', 10, 2, '{"enfoque": "hard_code", "lenguaje": "Python"}'::jsonb),
('e0000000-0003-4000-e000-000000000003', 'd0000000-0001-4000-d000-000000000001', 'c0000000-0004-4000-c000-000000000002', 'Cross-Validation con Scikit-Learn', 'video', 7, 3, '{"enfoque": "hard_code", "lenguaje": "Python"}'::jsonb),
('e0000000-0004-4000-e000-000000000004', 'd0000000-0001-4000-d000-000000000001', 'c0000000-0004-4000-c000-000000000001', 'Test: Overfitting y Generalización', 'test', 15, 4, '{"preguntas": 10, "aprobacion": 60}'::jsonb),
('e0000000-0005-4000-e000-000000000005', 'd0000000-0001-4000-d000-000000000001', 'c0000000-0004-4000-c000-000000000004', 'Data Leakage en la Práctica', 'video', 9, 5, '{"enfoque": "hard_code", "lenguaje": "Python"}'::jsonb),
('e0000000-0006-4000-e000-000000000006', 'd0000000-0001-4000-d000-000000000001', 'c0000000-0004-4000-c000-000000000006', 'Árboles de Decisión desde Cero', 'video', 12, 6, '{"enfoque": "hard_code", "lenguaje": "Python"}'::jsonb),
('e0000000-0007-4000-e000-000000000007', 'd0000000-0001-4000-d000-000000000001', 'c0000000-0004-4000-c000-000000000009', 'Feature Engineering Avanzado', 'ejercicio', 20, 7, '{"enfoque": "hard_code"}'::jsonb);

-- Curso: IA para Productividad (Frida Ruh)
INSERT INTO learning_objects (id, course_id, concept_id, titulo, tipo, duracion_min, orden, metadata) VALUES
('e0000000-0101-4000-e000-000000000001', 'd0000000-0002-4000-d000-000000000002', 'c0000000-0004-4000-c000-000000000010', 'IA en tu día a día profesional', 'video', 6, 1, '{"enfoque": "business_no_code"}'::jsonb),
('e0000000-0102-4000-e000-000000000002', 'd0000000-0002-4000-d000-000000000002', 'c0000000-0004-4000-c000-000000000001', 'Overfitting Explicado para Ejecutivos — Analogía de Negocios', 'video', 5, 2, '{"enfoque": "business_no_code", "es_analogia": true}'::jsonb),
('e0000000-0103-4000-e000-000000000003', 'd0000000-0002-4000-d000-000000000002', 'c0000000-0004-4000-c000-000000000004', 'Data Leakage: Cuando los datos mienten — Caso de Negocio', 'video', 7, 3, '{"enfoque": "business_no_code", "es_analogia": true}'::jsonb),
('e0000000-0104-4000-e000-000000000004', 'd0000000-0002-4000-d000-000000000002', 'c0000000-0004-4000-c000-000000000010', 'Automatiza tu empresa con IA sin código', 'video', 8, 4, '{"enfoque": "business_no_code"}'::jsonb),
('e0000000-0105-4000-e000-000000000005', 'd0000000-0002-4000-d000-000000000002', 'c0000000-0004-4000-c000-000000000001', 'Test: IA y Negocios — Conceptos Clave', 'test', 10, 5, '{"preguntas": 8, "aprobacion": 60}'::jsonb);

-- Curso: Deep Learning con TensorFlow
INSERT INTO learning_objects (id, course_id, concept_id, titulo, tipo, duracion_min, orden, metadata) VALUES
('e0000000-0201-4000-e000-000000000001', 'd0000000-0003-4000-d000-000000000003', 'c0000000-0004-4000-c000-000000000003', 'Arquitectura de Redes Convolucionales', 'video', 15, 1, '{"enfoque": "hard_code", "lenguaje": "Python"}'::jsonb),
('e0000000-0202-4000-e000-000000000002', 'd0000000-0003-4000-d000-000000000003', 'c0000000-0004-4000-c000-000000000007', 'Gradient Descent y Backpropagation', 'video', 12, 2, '{"enfoque": "hard_code", "lenguaje": "Python"}'::jsonb),
('e0000000-0203-4000-e000-000000000003', 'd0000000-0003-4000-d000-000000000003', 'c0000000-0004-4000-c000-000000000008', 'Transfer Learning con Modelos Preentrenados', 'video', 10, 3, '{"enfoque": "hard_code"}'::jsonb);

-- ============================================================
-- 6. FICHAS DE CONOCIMIENTO TÁCITO
-- ============================================================

INSERT INTO knowledge_cards (id, professor_id, concept_id, tipo, titulo, contenido, recurso_soporte, efectividad_score) VALUES
(
    'f0000000-0001-4000-f000-000000000001',
    'a1b2c3d4-1111-4000-a000-000000000001',
    'c0000000-0004-4000-c000-000000000001',
    'analogia_didactica',
    'El alumno que memoriza exámenes',
    '{"analogia": "El overfitting es como un alumno que memoriza las respuestas exactas de un examen de práctica, pero es incapaz de resolver un problema nuevo en el examen real. Tiene un rendimiento perfecto en la práctica (training set) pero fracasa en la vida real (test set).", "contexto": "Explicar overfitting a estudiantes que no dominan la matemática del bias-variance tradeoff", "audiencia_objetivo": "Todos los niveles"}'::jsonb,
    'Clase_302_Video',
    0.85
),
(
    'f0000000-0002-4000-f000-000000000002',
    'a1b2c3d4-2222-4000-a000-000000000002',
    'c0000000-0004-4000-c000-000000000001',
    'analogia_didactica',
    'Overfitting como estrategia de negocio fallida',
    '{"analogia": "Imagina que tu empresa analiza solo a sus 10 clientes actuales para diseñar un producto. El producto es perfecto para esos 10, pero cuando lo lanzas al mercado masivo, nadie más lo quiere. Eso es overfitting: optimizar tanto para tu muestra actual que pierdes la capacidad de servir al mercado real.", "contexto": "Explicar overfitting desde la perspectiva de decisiones de negocio y estrategia de mercado", "audiencia_objetivo": "Perfiles business/no-code"}'::jsonb,
    'Curso_IA_Productividad_Video_02',
    0.92
),
(
    'f0000000-0003-4000-f000-000000000003',
    'a1b2c3d4-1111-4000-a000-000000000001',
    'c0000000-0004-4000-c000-000000000004',
    'error_comun',
    'Data Leakage en Pipelines de Producción',
    '{"sintoma": "El modelo da 99% de precisión en entrenamiento pero falla en producción.", "falta_tecnica": "Inclusión accidental de la variable objetivo dentro del set de entrenamiento, o aplicación de transformaciones (como StandardScaler) antes del split train/test.", "solucion_pragmatica": "Siempre hacer el split ANTES de cualquier transformación. Usar Pipeline de Scikit-Learn para encapsular preprocessing + modelo."}'::jsonb,
    'GitHub_Repo_ML_Fundamentos/Clase_302_Video',
    0.88
),
(
    'f0000000-0004-4000-f000-000000000004',
    'a1b2c3d4-2222-4000-a000-000000000002',
    'c0000000-0004-4000-c000-000000000004',
    'analogia_didactica',
    'Data Leakage como espiar el examen antes',
    '{"analogia": "Data Leakage es como si un empleado pudiera ver las preguntas del examen de certificación antes de tomarlo. Su nota será perfecta en la prueba, pero no refleja su conocimiento real. En datos, ocurre cuando información del futuro se filtra al entrenamiento.", "contexto": "Caso práctico para entender por qué los modelos fallan en producción", "audiencia_objetivo": "Perfiles business/no-code"}'::jsonb,
    'Curso_IA_Productividad_Video_03',
    0.90
),
(
    'f0000000-0005-4000-f000-000000000005',
    'a1b2c3d4-1111-4000-a000-000000000001',
    'c0000000-0004-4000-c000-000000000002',
    'error_comun',
    'Usar validation set como test set',
    '{"sintoma": "El estudiante reporta buen accuracy en validación pero mal rendimiento en datos nuevos.", "falta_tecnica": "Confundir validation set con test set, y usar la validación para tunear hiperparámetros hasta obtener resultados artificialmente buenos.", "solucion_pragmatica": "Mantener 3 conjuntos separados: train, validation, test. El test set NUNCA se toca hasta la evaluación final."}'::jsonb,
    'GitHub_Repo_ML_Fundamentos/Cross_Validation',
    0.80
),
(
    'f0000000-0006-4000-f000-000000000006',
    'a1b2c3d4-1111-4000-a000-000000000001',
    'c0000000-0004-4000-c000-000000000007',
    'analogia_didactica',
    'Gradient Descent como descender una montaña con niebla',
    '{"analogia": "Imagina que estás en la cima de una montaña con niebla espesa y necesitas llegar al valle. No puedes ver el camino completo, así que das pequeños pasos siempre hacia donde el terreno baja más. Eso es gradient descent: pequeños pasos en la dirección que más reduce el error, hasta llegar al mínimo.", "contexto": "Explicar la intuición de gradient descent sin fórmulas matemáticas", "audiencia_objetivo": "Todos los niveles"}'::jsonb,
    'Deep_Learning_TF_Video_02',
    0.87
);

-- ============================================================
-- 7. ONTOLOGÍA — Entidades
-- ============================================================

-- Entidades: Profesores
INSERT INTO ontology_entities (id, entity_type, name, ref_id, properties) VALUES
('00000000-e001-4000-0000-000000000001', 'Professor', 'Juan Carlos Osorio', 'a1b2c3d4-1111-4000-a000-000000000001', '{"pedagogia": "hard_code", "especialidad": "ML/DL"}'::jsonb),
('00000000-e002-4000-0000-000000000002', 'Professor', 'Frida Ruh', 'a1b2c3d4-2222-4000-a000-000000000002', '{"pedagogia": "business_no_code", "especialidad": "IA Negocios"}'::jsonb);

-- Entidades: Estudiantes
INSERT INTO ontology_entities (id, entity_type, name, ref_id, properties) VALUES
('00000000-e003-4000-0000-000000000003', 'Student', 'Sofía Martínez', 'b1b2c3d4-1111-4000-b000-000000000001', '{"estilo": "pragmatico_no_code"}'::jsonb),
('00000000-e004-4000-0000-000000000004', 'Student', 'Carlos Mendoza', 'b1b2c3d4-2222-4000-b000-000000000002', '{"estilo": "tecnico_hard_code"}'::jsonb),
('00000000-e005-4000-0000-000000000005', 'Student', 'Ana Lucía Torres', 'b1b2c3d4-3333-4000-b000-000000000003', '{"estilo": "mixto"}'::jsonb);

-- Entidades: Conceptos Atómicos
INSERT INTO ontology_entities (id, entity_type, name, ref_id, properties) VALUES
('00000000-e010-4000-0000-000000000010', 'Concept', 'Overfitting', 'c0000000-0004-4000-c000-000000000001', '{"nivel": 4, "dificultad": "alta"}'::jsonb),
('00000000-e011-4000-0000-000000000011', 'Concept', 'Cross-Validation', 'c0000000-0004-4000-c000-000000000002', '{"nivel": 4, "dificultad": "media"}'::jsonb),
('00000000-e012-4000-0000-000000000012', 'Concept', 'CNN', 'c0000000-0004-4000-c000-000000000003', '{"nivel": 4, "dificultad": "alta"}'::jsonb),
('00000000-e013-4000-0000-000000000013', 'Concept', 'Data Leakage', 'c0000000-0004-4000-c000-000000000004', '{"nivel": 4, "dificultad": "media"}'::jsonb),
('00000000-e014-4000-0000-000000000014', 'Concept', 'Regresión Lineal', 'c0000000-0004-4000-c000-000000000005', '{"nivel": 4, "dificultad": "baja"}'::jsonb),
('00000000-e015-4000-0000-000000000015', 'Concept', 'Árboles de Decisión', 'c0000000-0004-4000-c000-000000000006', '{"nivel": 4, "dificultad": "media"}'::jsonb),
('00000000-e016-4000-0000-000000000016', 'Concept', 'Gradient Descent', 'c0000000-0004-4000-c000-000000000007', '{"nivel": 4, "dificultad": "alta"}'::jsonb),
('00000000-e017-4000-0000-000000000017', 'Concept', 'Transfer Learning', 'c0000000-0004-4000-c000-000000000008', '{"nivel": 4, "dificultad": "media"}'::jsonb),
('00000000-e018-4000-0000-000000000018', 'Concept', 'Feature Engineering', 'c0000000-0004-4000-c000-000000000009', '{"nivel": 4, "dificultad": "media"}'::jsonb),
('00000000-e019-4000-0000-000000000019', 'Concept', 'Automatización con IA', 'c0000000-0004-4000-c000-000000000010', '{"nivel": 4, "dificultad": "baja"}'::jsonb);

-- Entidades: Cursos
INSERT INTO ontology_entities (id, entity_type, name, ref_id, properties) VALUES
('00000000-e020-4000-0000-000000000020', 'Course', 'Fundamentos de Machine Learning', 'd0000000-0001-4000-d000-000000000001', '{"nivel": "intermedio", "enfoque": "hard_code"}'::jsonb),
('00000000-e021-4000-0000-000000000021', 'Course', 'IA para Productividad y Negocios', 'd0000000-0002-4000-d000-000000000002', '{"nivel": "basico", "enfoque": "business_no_code"}'::jsonb),
('00000000-e022-4000-0000-000000000022', 'Course', 'Deep Learning con TensorFlow', 'd0000000-0003-4000-d000-000000000003', '{"nivel": "avanzado", "enfoque": "hard_code"}'::jsonb),
('00000000-e023-4000-0000-000000000023', 'Course', 'Data Science Aplicada a Startups', 'd0000000-0004-4000-d000-000000000004', '{"nivel": "intermedio", "enfoque": "business_no_code"}'::jsonb);

-- Entidades: Estilos de Aprendizaje
INSERT INTO ontology_entities (id, entity_type, name, ref_id, properties) VALUES
('00000000-e030-4000-0000-000000000030', 'Style', 'Pragmático / No-Code', NULL, '{"descripcion": "Necesita entender el impacto estratégico y resolución de casos de uso antes del código"}'::jsonb),
('00000000-e031-4000-0000-000000000031', 'Style', 'Técnico / Hard Code', NULL, '{"descripcion": "Prefiere código puro, formulación matemática y lógica de ingeniería"}'::jsonb),
('00000000-e032-4000-0000-000000000032', 'Style', 'Mixto', NULL, '{"descripcion": "Balance entre comprensión estratégica y habilidades técnicas"}'::jsonb);

-- Entidades: Metodologías de Enseñanza
INSERT INTO ontology_entities (id, entity_type, name, ref_id, properties) VALUES
('00000000-e040-4000-0000-000000000040', 'Method', 'Analogía de Negocios', NULL, '{"tipo": "analogia", "audiencia": "business_no_code"}'::jsonb),
('00000000-e041-4000-0000-000000000041', 'Method', 'Código Puro (Hard Code)', NULL, '{"tipo": "implementacion", "audiencia": "tecnico_hard_code"}'::jsonb),
('00000000-e042-4000-0000-000000000042', 'Method', 'Analogía Universal', NULL, '{"tipo": "analogia", "audiencia": "todos"}'::jsonb);

-- Entidades: Fichas de Conocimiento
INSERT INTO ontology_entities (id, entity_type, name, ref_id, properties) VALUES
('00000000-e050-4000-0000-000000000050', 'KnowledgeCard', 'Analogía: El alumno que memoriza exámenes', 'f0000000-0001-4000-f000-000000000001', '{"tipo": "analogia_didactica", "profesor": "Juan Carlos Osorio"}'::jsonb),
('00000000-e051-4000-0000-000000000051', 'KnowledgeCard', 'Analogía: Overfitting como estrategia fallida', 'f0000000-0002-4000-f000-000000000002', '{"tipo": "analogia_didactica", "profesor": "Frida Ruh"}'::jsonb),
('00000000-e052-4000-0000-000000000052', 'KnowledgeCard', 'Error Común: Data Leakage en Producción', 'f0000000-0003-4000-f000-000000000003', '{"tipo": "error_comun", "profesor": "Juan Carlos Osorio"}'::jsonb),
('00000000-e053-4000-0000-000000000053', 'KnowledgeCard', 'Analogía: Data Leakage como espiar examen', 'f0000000-0004-4000-f000-000000000004', '{"tipo": "analogia_didactica", "profesor": "Frida Ruh"}'::jsonb);

-- ============================================================
-- 8. ONTOLOGÍA — Relaciones (El Grafo Semántico)
-- ============================================================

-- Estudiantes → Estilos de aprendizaje
INSERT INTO ontology_relations (source_id, target_id, rel_type, weight, properties) VALUES
('00000000-e003-4000-0000-000000000003', '00000000-e030-4000-0000-000000000030', 'TIENE_ESTILO', 1.0, '{"confianza": "alta"}'::jsonb),
('00000000-e004-4000-0000-000000000004', '00000000-e031-4000-0000-000000000031', 'TIENE_ESTILO', 1.0, '{"confianza": "alta"}'::jsonb),
('00000000-e005-4000-0000-000000000005', '00000000-e032-4000-0000-000000000032', 'TIENE_ESTILO', 1.0, '{"confianza": "alta"}'::jsonb);

-- Sofía → Brechas de conocimiento
INSERT INTO ontology_relations (source_id, target_id, rel_type, weight, properties) VALUES
('00000000-e003-4000-0000-000000000003', '00000000-e010-4000-0000-000000000010', 'PRESENTA_BRECHA', 0.9, '{"severidad": "critica", "test_fallidos": 2}'::jsonb),
('00000000-e003-4000-0000-000000000003', '00000000-e013-4000-0000-000000000013', 'PRESENTA_BRECHA', 0.7, '{"severidad": "moderada", "test_fallidos": 1}'::jsonb),
('00000000-e003-4000-0000-000000000003', '00000000-e016-4000-0000-000000000016', 'PRESENTA_BRECHA', 0.8, '{"severidad": "critica", "test_fallidos": 0}'::jsonb);

-- Carlos → Brechas
INSERT INTO ontology_relations (source_id, target_id, rel_type, weight, properties) VALUES
('00000000-e004-4000-0000-000000000004', '00000000-e017-4000-0000-000000000017', 'PRESENTA_BRECHA', 0.5, '{"severidad": "leve"}'::jsonb);

-- Profesores → Metodologías de enseñanza
INSERT INTO ontology_relations (source_id, target_id, rel_type, weight, properties) VALUES
('00000000-e001-4000-0000-000000000001', '00000000-e041-4000-0000-000000000041', 'USA_METODOLOGIA', 1.0, '{}'::jsonb),
('00000000-e001-4000-0000-000000000001', '00000000-e042-4000-0000-000000000042', 'USA_METODOLOGIA', 0.7, '{}'::jsonb),
('00000000-e002-4000-0000-000000000002', '00000000-e040-4000-0000-000000000040', 'USA_METODOLOGIA', 1.0, '{}'::jsonb);

-- Metodologías → EXPLICA/RESUELVE → Conceptos
INSERT INTO ontology_relations (source_id, target_id, rel_type, weight, properties) VALUES
('00000000-e040-4000-0000-000000000040', '00000000-e010-4000-0000-000000000010', 'EXPLICA_RESUELVE', 0.95, '{"enfoque": "negocio", "recurso": "Analogía de estrategia fallida"}'::jsonb),
('00000000-e041-4000-0000-000000000041', '00000000-e010-4000-0000-000000000010', 'EXPLICA_RESUELVE', 0.90, '{"enfoque": "codigo", "recurso": "Implementación en Scikit-Learn"}'::jsonb),
('00000000-e042-4000-0000-000000000042', '00000000-e010-4000-0000-000000000010', 'EXPLICA_RESUELVE', 0.85, '{"enfoque": "universal", "recurso": "Analogía del alumno que memoriza"}'::jsonb),
('00000000-e040-4000-0000-000000000040', '00000000-e013-4000-0000-000000000013', 'EXPLICA_RESUELVE', 0.90, '{"enfoque": "negocio"}'::jsonb),
('00000000-e041-4000-0000-000000000041', '00000000-e013-4000-0000-000000000013', 'EXPLICA_RESUELVE', 0.88, '{"enfoque": "codigo"}'::jsonb),
('00000000-e041-4000-0000-000000000041', '00000000-e016-4000-0000-000000000016', 'EXPLICA_RESUELVE', 0.92, '{"enfoque": "codigo"}'::jsonb);

-- Profesores → ENSEÑA → Cursos
INSERT INTO ontology_relations (source_id, target_id, rel_type, weight, properties) VALUES
('00000000-e001-4000-0000-000000000001', '00000000-e020-4000-0000-000000000020', 'ENSEÑA', 1.0, '{}'::jsonb),
('00000000-e001-4000-0000-000000000001', '00000000-e022-4000-0000-000000000022', 'ENSEÑA', 1.0, '{}'::jsonb),
('00000000-e002-4000-0000-000000000002', '00000000-e021-4000-0000-000000000021', 'ENSEÑA', 1.0, '{}'::jsonb),
('00000000-e002-4000-0000-000000000002', '00000000-e023-4000-0000-000000000023', 'ENSEÑA', 1.0, '{}'::jsonb);

-- Cursos → CONTIENE → Conceptos
INSERT INTO ontology_relations (source_id, target_id, rel_type, weight, properties) VALUES
('00000000-e020-4000-0000-000000000020', '00000000-e010-4000-0000-000000000010', 'CONTIENE', 1.0, '{}'::jsonb),
('00000000-e020-4000-0000-000000000020', '00000000-e011-4000-0000-000000000011', 'CONTIENE', 1.0, '{}'::jsonb),
('00000000-e020-4000-0000-000000000020', '00000000-e013-4000-0000-000000000013', 'CONTIENE', 1.0, '{}'::jsonb),
('00000000-e020-4000-0000-000000000020', '00000000-e014-4000-0000-000000000014', 'CONTIENE', 1.0, '{}'::jsonb),
('00000000-e020-4000-0000-000000000020', '00000000-e015-4000-0000-000000000015', 'CONTIENE', 1.0, '{}'::jsonb),
('00000000-e020-4000-0000-000000000020', '00000000-e018-4000-0000-000000000018', 'CONTIENE', 1.0, '{}'::jsonb),
('00000000-e021-4000-0000-000000000021', '00000000-e010-4000-0000-000000000010', 'CONTIENE', 1.0, '{}'::jsonb),
('00000000-e021-4000-0000-000000000021', '00000000-e013-4000-0000-000000000013', 'CONTIENE', 1.0, '{}'::jsonb),
('00000000-e021-4000-0000-000000000021', '00000000-e019-4000-0000-000000000019', 'CONTIENE', 1.0, '{}'::jsonb),
('00000000-e022-4000-0000-000000000022', '00000000-e012-4000-0000-000000000012', 'CONTIENE', 1.0, '{}'::jsonb),
('00000000-e022-4000-0000-000000000022', '00000000-e016-4000-0000-000000000016', 'CONTIENE', 1.0, '{}'::jsonb),
('00000000-e022-4000-0000-000000000022', '00000000-e017-4000-0000-000000000017', 'CONTIENE', 1.0, '{}'::jsonb);

-- Conceptos → PREREQUISITO → Conceptos
INSERT INTO ontology_relations (source_id, target_id, rel_type, weight, properties) VALUES
('00000000-e014-4000-0000-000000000014', '00000000-e010-4000-0000-000000000010', 'PREREQUISITO', 0.8, '{"tipo": "recomendado"}'::jsonb),
('00000000-e010-4000-0000-000000000010', '00000000-e011-4000-0000-000000000011', 'PREREQUISITO', 0.9, '{"tipo": "necesario"}'::jsonb),
('00000000-e014-4000-0000-000000000014', '00000000-e016-4000-0000-000000000016', 'PREREQUISITO', 0.7, '{"tipo": "recomendado"}'::jsonb),
('00000000-e016-4000-0000-000000000016', '00000000-e012-4000-0000-000000000012', 'PREREQUISITO', 0.9, '{"tipo": "necesario"}'::jsonb),
('00000000-e010-4000-0000-000000000010', '00000000-e017-4000-0000-000000000017', 'PREREQUISITO', 0.6, '{"tipo": "recomendado"}'::jsonb);

-- Knowledge Cards → EXPLICA_RESUELVE / ALTERNATIVA_A
INSERT INTO ontology_relations (source_id, target_id, rel_type, weight, properties) VALUES
('00000000-e050-4000-0000-000000000050', '00000000-e010-4000-0000-000000000010', 'EXPLICA_RESUELVE', 0.85, '{"tipo_recurso": "analogia_universal"}'::jsonb),
('00000000-e051-4000-0000-000000000051', '00000000-e010-4000-0000-000000000010', 'EXPLICA_RESUELVE', 0.92, '{"tipo_recurso": "analogia_negocio"}'::jsonb),
('00000000-e052-4000-0000-000000000052', '00000000-e013-4000-0000-000000000013', 'EXPLICA_RESUELVE', 0.88, '{"tipo_recurso": "error_comun"}'::jsonb),
('00000000-e053-4000-0000-000000000053', '00000000-e013-4000-0000-000000000013', 'EXPLICA_RESUELVE', 0.90, '{"tipo_recurso": "analogia_negocio"}'::jsonb);

-- Fichas como alternativa entre ellas (distinto enfoque para mismo concepto)
INSERT INTO ontology_relations (source_id, target_id, rel_type, weight, properties) VALUES
('00000000-e050-4000-0000-000000000050', '00000000-e051-4000-0000-000000000051', 'ALTERNATIVA_A', 0.8, '{"razon": "Mismo concepto, diferente enfoque pedagógico"}'::jsonb),
('00000000-e052-4000-0000-000000000052', '00000000-e053-4000-0000-000000000053', 'ALTERNATIVA_A', 0.8, '{"razon": "Mismo concepto, diferente enfoque pedagógico"}'::jsonb);

-- Fichas → CREADO_POR → Profesores
INSERT INTO ontology_relations (source_id, target_id, rel_type, weight, properties) VALUES
('00000000-e050-4000-0000-000000000050', '00000000-e001-4000-0000-000000000001', 'CREADO_POR', 1.0, '{}'::jsonb),
('00000000-e051-4000-0000-000000000051', '00000000-e002-4000-0000-000000000002', 'CREADO_POR', 1.0, '{}'::jsonb),
('00000000-e052-4000-0000-000000000052', '00000000-e001-4000-0000-000000000001', 'CREADO_POR', 1.0, '{}'::jsonb),
('00000000-e053-4000-0000-000000000053', '00000000-e002-4000-0000-000000000002', 'CREADO_POR', 1.0, '{}'::jsonb);

-- ============================================================
-- 9. TELEMETRÍA — Eventos de Sofía (Simulación)
-- ============================================================

-- Sofía viendo el video de Overfitting (Hard Code) — con dificultades
INSERT INTO learning_events (student_id, learning_object_id, event_type, metadata, session_id, created_at) VALUES
('b1b2c3d4-1111-4000-b000-000000000001', 'e0000000-0002-4000-e000-000000000002', 'PLAY', '{"position_seconds": 0}'::jsonb, 'session_sofia_001', NOW() - INTERVAL '7 days'),
('b1b2c3d4-1111-4000-b000-000000000001', 'e0000000-0002-4000-e000-000000000002', 'PAUSE', '{"position_seconds": 45, "pause_count_session": 1}'::jsonb, 'session_sofia_001', NOW() - INTERVAL '7 days' + INTERVAL '50 seconds'),
('b1b2c3d4-1111-4000-b000-000000000001', 'e0000000-0002-4000-e000-000000000002', 'RESUME', '{"position_seconds": 45}'::jsonb, 'session_sofia_001', NOW() - INTERVAL '7 days' + INTERVAL '70 seconds'),
('b1b2c3d4-1111-4000-b000-000000000001', 'e0000000-0002-4000-e000-000000000002', 'SPEED_CHANGE', '{"old_speed": 1.0, "new_speed": 0.75}'::jsonb, 'session_sofia_001', NOW() - INTERVAL '7 days' + INTERVAL '90 seconds'),
('b1b2c3d4-1111-4000-b000-000000000001', 'e0000000-0002-4000-e000-000000000002', 'PAUSE', '{"position_seconds": 120, "pause_count_session": 2}'::jsonb, 'session_sofia_001', NOW() - INTERVAL '7 days' + INTERVAL '180 seconds'),
('b1b2c3d4-1111-4000-b000-000000000001', 'e0000000-0002-4000-e000-000000000002', 'RESUME', '{"position_seconds": 120}'::jsonb, 'session_sofia_001', NOW() - INTERVAL '7 days' + INTERVAL '240 seconds'),
('b1b2c3d4-1111-4000-b000-000000000001', 'e0000000-0002-4000-e000-000000000002', 'REWIND', '{"from_seconds": 200, "to_seconds": 120}'::jsonb, 'session_sofia_001', NOW() - INTERVAL '7 days' + INTERVAL '300 seconds'),
('b1b2c3d4-1111-4000-b000-000000000001', 'e0000000-0002-4000-e000-000000000002', 'PAUSE', '{"position_seconds": 180, "pause_count_session": 3}'::jsonb, 'session_sofia_001', NOW() - INTERVAL '7 days' + INTERVAL '400 seconds'),
('b1b2c3d4-1111-4000-b000-000000000001', 'e0000000-0002-4000-e000-000000000002', 'COMPLETE', '{"total_time_seconds": 900, "total_pauses": 3}'::jsonb, 'session_sofia_001', NOW() - INTERVAL '7 days' + INTERVAL '900 seconds');

-- Sofía reprueba el test de Overfitting (intento 1)
INSERT INTO test_results (student_id, concept_id, learning_object_id, score, attempt_number, time_spent_seconds, answers, created_at) VALUES
('b1b2c3d4-1111-4000-b000-000000000001', 'c0000000-0004-4000-c000-000000000001', 'e0000000-0004-4000-e000-000000000004', 35, 1, 420, '[{"q":1,"correct":false},{"q":2,"correct":true},{"q":3,"correct":false},{"q":4,"correct":false},{"q":5,"correct":true},{"q":6,"correct":false},{"q":7,"correct":false},{"q":8,"correct":true},{"q":9,"correct":false},{"q":10,"correct":false}]'::jsonb, NOW() - INTERVAL '6 days');

-- Sofía reprueba el test de Overfitting (intento 2) — Trigger para Smart Pause
INSERT INTO test_results (student_id, concept_id, learning_object_id, score, attempt_number, time_spent_seconds, answers, created_at) VALUES
('b1b2c3d4-1111-4000-b000-000000000001', 'c0000000-0004-4000-c000-000000000001', 'e0000000-0004-4000-e000-000000000004', 45, 2, 380, '[{"q":1,"correct":true},{"q":2,"correct":true},{"q":3,"correct":false},{"q":4,"correct":true},{"q":5,"correct":true},{"q":6,"correct":false},{"q":7,"correct":false},{"q":8,"correct":false},{"q":9,"correct":false},{"q":10,"correct":true}]'::jsonb, NOW() - INTERVAL '5 days');

-- Carlos completando exitosamente
INSERT INTO test_results (student_id, concept_id, learning_object_id, score, attempt_number, time_spent_seconds, answers, created_at) VALUES
('b1b2c3d4-2222-4000-b000-000000000002', 'c0000000-0004-4000-c000-000000000001', 'e0000000-0004-4000-e000-000000000004', 85, 1, 300, '[]'::jsonb, NOW() - INTERVAL '3 days'),
('b1b2c3d4-2222-4000-b000-000000000002', 'c0000000-0004-4000-c000-000000000002', NULL, 90, 1, 250, '[]'::jsonb, NOW() - INTERVAL '2 days');

-- Ana con resultados mixtos
INSERT INTO test_results (student_id, concept_id, learning_object_id, score, attempt_number, time_spent_seconds, answers, created_at) VALUES
('b1b2c3d4-3333-4000-b000-000000000003', 'c0000000-0004-4000-c000-000000000001', 'e0000000-0004-4000-e000-000000000004', 55, 1, 450, '[]'::jsonb, NOW() - INTERVAL '4 days'),
('b1b2c3d4-3333-4000-b000-000000000003', 'c0000000-0004-4000-c000-000000000001', 'e0000000-0004-4000-e000-000000000004', 72, 2, 350, '[]'::jsonb, NOW() - INTERVAL '3 days');

-- ============================================================
-- 10. RECOMENDACIONES HISTÓRICAS (Ejemplo)
-- ============================================================

INSERT INTO recommendations (student_id, recommended_object_id, recommended_card_id, trigger_type, reason, score_cf, score_ontology, score_final, was_accepted, created_at) VALUES
(
    'b1b2c3d4-1111-4000-b000-000000000001',
    'e0000000-0102-4000-e000-000000000002',
    'f0000000-0002-4000-f000-000000000002',
    'smart_pause',
    '{"explanation": "Sofía ha reprobado 2 veces el test de Overfitting. Su perfil es pragmático/no-code. Se recomienda la analogía de negocios de Frida Ruh.", "matched_gap": "Overfitting", "matched_style": "pragmatico_no_code", "triggered_by": "2 test failures + 3 pauses in video"}'::jsonb,
    0.45,
    0.92,
    0.73,
    TRUE,
    NOW() - INTERVAL '5 days'
);
