export const ontologyNodes = [
  // Profesores
  { data: { id: 'prof_jc', label: 'Juan Carlos Osorio', type: 'Professor', group: 'actores' } },
  { data: { id: 'prof_frida', label: 'Frida Ruh', type: 'Professor', group: 'actores' } },
  
  // Estudiantes
  { data: { id: 'stu_sofia', label: 'Sofía Martínez', type: 'Student', group: 'actores' } },
  { data: { id: 'stu_carlos', label: 'Carlos Mendoza', type: 'Student', group: 'actores' } },
  
  // Conceptos
  { data: { id: 'c_overfitting', label: 'Overfitting', type: 'Concept', group: 'conceptos', level: 'avanzado' } },
  { data: { id: 'c_leakage', label: 'Data Leakage', type: 'Concept', group: 'conceptos', level: 'avanzado' } },
  { data: { id: 'c_regression', label: 'Regresión Lineal', type: 'Concept', group: 'conceptos', level: 'basico' } },
  
  // Fichas de Conocimiento (Knowledge Cards)
  { data: { id: 'kc_overfitting_biz', label: 'Analogía: Estrategia de Negocio', type: 'KnowledgeCard', group: 'recursos', style: 'business' } },
  { data: { id: 'kc_overfitting_math', label: 'Error: Memoria vs Generalización', type: 'KnowledgeCard', group: 'recursos', style: 'technical' } },
  
  // Estilos
  { data: { id: 'style_nocode', label: 'Pragmático (No-Code)', type: 'Style', group: 'taxonomia' } },
  { data: { id: 'style_hardcode', label: 'Técnico (Hard-Code)', type: 'Style', group: 'taxonomia' } }
];

export const ontologyEdges = [
  // Prerrequisitos
  { data: { id: 'e1', source: 'c_regression', target: 'c_overfitting', label: 'PREREQUISITO', weight: 0.8 } },
  
  // Relaciones de Estudiantes
  { data: { id: 'e2', source: 'stu_sofia', target: 'style_nocode', label: 'TIENE_ESTILO', weight: 1.0 } },
  { data: { id: 'e3', source: 'stu_carlos', target: 'style_hardcode', label: 'TIENE_ESTILO', weight: 1.0 } },
  
  // Brechas detectadas
  { data: { id: 'e4', source: 'stu_sofia', target: 'c_overfitting', label: 'PRESENTA_BRECHA', weight: 0.9, type: 'critical' } },
  
  // Autoría
  { data: { id: 'e5', source: 'kc_overfitting_biz', target: 'prof_frida', label: 'CREADO_POR', weight: 1.0 } },
  { data: { id: 'e6', source: 'kc_overfitting_math', target: 'prof_jc', label: 'CREADO_POR', weight: 1.0 } },
  
  // Resolución
  { data: { id: 'e7', source: 'kc_overfitting_biz', target: 'c_overfitting', label: 'EXPLICA_RESUELVE', weight: 0.95 } },
  { data: { id: 'e8', source: 'kc_overfitting_math', target: 'c_overfitting', label: 'EXPLICA_RESUELVE', weight: 0.90 } },
  
  // Alineación de estilo
  { data: { id: 'e9', source: 'kc_overfitting_biz', target: 'style_nocode', label: 'ALINEADO_CON', weight: 0.9 } },
  { data: { id: 'e10', source: 'kc_overfitting_math', target: 'style_hardcode', label: 'ALINEADO_CON', weight: 0.9 } },
];
