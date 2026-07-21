export const PROJECT_INFO = {
  title: "Sistema Híbrido de Recomendación (IA - Ontologías)",
  subtitle: "Gestión del Conocimiento Docente y Personalización Pedagógica",
  description: "Un enfoque innovador que combina filtrado colaborativo con razonamiento basado en grafos de conocimiento para adaptar la educación asíncrona a cada estudiante.",
  team: ["Trujillano Arenas, Edward Alberto", "Medina Flores, Leslie Alexa", "Yáñez Gómez, César Moisés"],
  teacher: "Huatay Enriquez, Reenaty Amanda",
  university: "Universidad Nacional del Callao",
  faculty: "Facultad de Ingeniería Industrial y de Sistemas",
  school: "Escuela Profesional de Ingeniería de Sistemas",
  year: "2026"
};

export const PLATZI_INFO = {
  name: "Platzi",
  description: "Plataforma líder en educación online en tecnología en Latinoamérica.",
  model: "Modelo asíncrono, basado en rutas de aprendizaje y escuelas profesionales.",
  colors: { primary: "#00C897", secondary: "#1B2A47" }
};

export const PROBLEMATICA = [
  {
    id: "fuga_conocimiento",
    title: "Fuga del Conocimiento Tácito",
    description: "Los docentes experimentados poseen heurísticas, analogías efectivas y formas únicas de explicar conceptos difíciles (conocimiento tácito) que no se capturan en los videos pregrabados ni en los sílabos formales. Cuando un estudiante no entiende la 'explicación oficial', este conocimiento experto está ausente.",
    icon: "🧠"
  },
  {
    id: "infoxicacion",
    title: "Infoxicación y 'Cold Start'",
    description: "Ante miles de cursos, los nuevos estudiantes (problema de 'cold start' en motores de recomendación clásicos) sufren parálisis por análisis. Se suscriben con un objetivo vago y abandonan al no encontrar rápidamente el camino óptimo para su perfil.",
    icon: "🧭"
  },
  {
    id: "puente_semantico",
    title: "Falta de Puente Semántico",
    description: "Los sistemas actuales recomiendan 'Cursos Populares' o 'Porque viste X'. No entienden la semántica subyacente. No saben que un estudiante falló un test sobre 'Overfitting' porque carece de la base matemática ('Álgebra Lineal') o porque su estilo es más pragmático y necesita una analogía de negocios.",
    icon: "🌉"
  }
];

export const SMART_OBJECTIVES = [
  {
    title: "Reducción de Abandono",
    metric: "15%",
    description: "Reducir la tasa de abandono en cursos técnicos complejos mediante el despliegue de intervenciones preventivas ('Smart Pauses').",
    timeframe: "Q3 2026"
  },
  {
    title: "Captura de Conocimiento",
    metric: "50+",
    description: "Digitalizar al menos 50 'Fichas de Conocimiento Tácito' de docentes expertos en la ontología fundacional.",
    timeframe: "Primeros 2 meses"
  },
  {
    title: "Precisión de Recomendación",
    metric: "80%",
    description: "Alcanzar un 80% de aceptación (click-through rate) en las recomendaciones híbridas disparadas durante los momentos de estancamiento.",
    timeframe: "Fin del piloto"
  }
];

export const PROFESSORS = [
  {
    name: "Juan Carlos Osorio",
    role: "AI/ML Engineer & AWS Instructor",
    style: "Técnico / Hard Code",
    bio: "Enfoque avanzado basado en líneas de código puras en Python, formulación matemática y lógica de ingeniería.",
    competencies: ["Machine Learning", "Deep Learning", "AWS", "TensorFlow", "Algoritmos Predictivos"]
  },
  {
    name: "Frida Ruh",
    role: "Especialista en IA y Consultora",
    style: "Business / No-Code",
    bio: "Enfoque pragmático: resolución de casos de uso corporativos, toma de decisiones y diseño conceptual sin dependencias de código.",
    competencies: ["IA para Negocios", "Automatización", "Ciencia de Datos Aplicada", "Productividad"]
  }
];

export const ARQUETIPO_SOFIA = {
  name: "Sofía Martínez",
  role: "Analista de Operaciones Jr.",
  age: 28,
  style: "Pragmática / Orientada a Negocio (No-Code)",
  context: "Estudia de noche y fines de semana. Quiere aplicar IA para automatizar procesos logísticos en su startup.",
  painPoints: [
    "Parálisis por análisis ante la inmensa oferta de cursos.",
    "Se estanca al reprobar tests técnicos de conceptos abstractos (ej. Overfitting).",
    "Siente que los cursos avanzados asumen un dominio de programación que aún no tiene."
  ],
  goals: [
    "Reducir su Time-to-Competence.",
    "Encontrar un 'tutor digital' que entienda su perfil no-técnico.",
    "Aplicar lo aprendido inmediatamente en su trabajo."
  ]
};

export const EMPATHY_MAP = {
  think_feel: [
    "Frustración por no entender la matemática detrás de los algoritmos.",
    "Ansiedad por el tiempo invertido sin ver resultados prácticos.",
    "Deseo de dominar herramientas de IA para ascender profesionalmente."
  ],
  hear: [
    "Compañeros diciendo que IA es puro código y matemáticas complejas.",
    "El mercado laboral exige perfiles que sepan integrar IA."
  ],
  see: [
    "Cientos de cursos disponibles sin un orden claro para su perfil.",
    "Tutoriales de YouTube desconectados y sin profundidad."
  ],
  say_do: [
    "Pausa frecuentemente los videos técnicos.",
    "Repite las pruebas de evaluación múltiples veces por ensayo y error.",
    "Busca atajos o 'recetas' para aplicar modelos rápidos."
  ]
};

export const SECI_PHASES = [
  {
    phase: "Socialización (Tácito a Tácito)",
    description: "Identificación de expertos en Platzi (ej. Juan Carlos Osorio, Frida Ruh). Entrevistas cognitivas y observación de sus clases en vivo para entender cómo resuelven dudas complejas."
  },
  {
    phase: "Exteriorización (Tácito a Explícito)",
    description: "Las analogías y heurísticas de los expertos se documentan en 'Fichas de Conocimiento' estructuradas (formato JSON) y se mapean como nodos en la Ontología (Grafo)."
  },
  {
    phase: "Combinación (Explícito a Explícito)",
    description: "El Motor Híbrido conecta estas fichas con el catálogo de cursos existente, los perfiles de estudiantes y el grafo de prerrequisitos de Platzi."
  },
  {
    phase: "Interiorización (Explícito a Tácito)",
    description: "A través del 'Smart Pause', Sofía recibe la analogía perfecta en el momento en que se estanca. Al comprenderla, interioriza el concepto y genera su propio nuevo conocimiento tácito."
  }
];

export const REFERENCES = [
  {
    author: "Cruz Manrique et al.",
    year: "2025",
    title: "Sistema Inteligente basado en ontologías y LLM",
    description: "Aporta la base para la integración de LLMs con grafos de conocimiento."
  },
  {
    author: "Imacaña de Jesús",
    year: "2024",
    title: "Aplicación de recomendación con IA generativa",
    description: "Establece precedentes recientes en motores de recomendación educativos."
  },
  {
    author: "Rodrigues et al.",
    year: "2018",
    title: "Redes bayesianas e ontologias",
    description: "Inspiración para el razonamiento probabilístico sobre estructuras semánticas."
  },
  {
    author: "Cartuche Flores",
    year: "2019",
    title: "Ontología para recomendación de recursos educativos",
    description: "Base teórica para la creación de vocabularios RDF/OWL en educación."
  },
  {
    author: "Vera Rea y Ulloa Amaya",
    year: "2018",
    title: "Sistema recomendador basado en perfiles",
    description: "Referencia fundamental para el perfilado dinámico de estudiantes."
  }
];
