import OntologyGraph from '../components/visualizations/OntologyGraph';

const OntologyExplorer = () => {
  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="text-center mb-8 gsap-fade-up">
        <h2 className="text-gradient">Explorador de Ontología</h2>
        <p className="text-secondary mt-2">Navega interactivamente por el grafo de conocimiento generado a partir del Modelo SECI.</p>
      </div>
      
      <div className="gsap-fade-up delay-1 mb-8">
        <OntologyGraph />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gsap-fade-up delay-2">
        <div className="glass-card">
          <h4 className="text-ia mb-4">¿Cómo funciona?</h4>
          <p className="text-sm text-secondary">
            Este grafo (basado en Cytoscape.js) mapea la relación entre estudiantes, profesores, conceptos técnicos y fichas de conocimiento tácito. 
            El backend utiliza consultas SQL Recursivas (CTEs) para encontrar caminos óptimos entre un estudiante estancado y la ficha de conocimiento que mejor se adapta a su estilo de aprendizaje.
          </p>
        </div>
        <div className="glass-card">
          <h4 className="text-onto mb-4">Taxonomía</h4>
          <ul className="text-sm text-secondary list-disc pl-5">
            <li><strong>Estudiantes:</strong> Nodos que acumulan telemetría y estilos (ej. No-Code).</li>
            <li><strong>Profesores:</strong> Creadores del conocimiento tácito original.</li>
            <li><strong>Conceptos:</strong> Temas del sílabo oficial de Platzi.</li>
            <li><strong>Fichas:</strong> Analogías, heurísticas y ejemplos prácticos digitalizados.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OntologyExplorer;
