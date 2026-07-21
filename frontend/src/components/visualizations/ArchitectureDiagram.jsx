import GlassCard from '../ui/GlassCard';

const ArchitectureDiagram = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Layer 1: Frontend */}
      <GlassCard className="gsap-fade-up text-center" style={{ border: '1px solid var(--accent-platzi)' }}>
        <h4 className="text-platzi mb-2">Capa de Presentación (Frontend)</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <span className="badge badge--platzi">React</span>
          <span className="badge badge--platzi">Cytoscape.js</span>
          <span className="badge badge--platzi">Video Player (Demo)</span>
        </div>
        <p className="text-sm text-secondary mt-2">Captura eventos (pausas, retrocesos, tests) y renderiza el motor híbrido.</p>
      </GlassCard>

      {/* Flechas */}
      <div className="text-center text-muted gsap-fade-up delay-1" style={{ fontSize: '1.5rem' }}>↓↑</div>

      {/* Layer 2: API & Logica */}
      <GlassCard className="gsap-fade-up delay-2 text-center" style={{ border: '1px solid var(--accent-ia)' }}>
        <h4 className="text-ia mb-2">Capa de Lógica (Backend FastAPI)</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span className="badge badge--ia">Smart Pause Trigger</span>
          <span className="badge badge--ia">Collaborative Filtering (Scikit)</span>
          <span className="badge badge--ia">Ontology Traversal Engine</span>
        </div>
        <p className="text-sm text-secondary mt-2">
          Calcula H(u,i) = α·CF(u,i) + (1-α)·Onto(u,i).
        </p>
      </GlassCard>

      {/* Flechas */}
      <div className="text-center text-muted gsap-fade-up delay-3" style={{ fontSize: '1.5rem' }}>↓↑</div>

      {/* Layer 3: Datos */}
      <GlassCard className="gsap-fade-up delay-4 text-center" style={{ border: '1px solid var(--accent-onto)' }}>
        <h4 className="text-onto mb-2">Capa de Persistencia (PostgreSQL)</h4>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span className="badge badge--onto">Relacional (Eventos, Usuarios)</span>
          <span className="badge badge--onto">Grafo (Recursive CTEs)</span>
          <span className="badge badge--onto">JSONB (Metadata Tácita)</span>
        </div>
        <p className="text-sm text-secondary mt-2">Almacena la telemetría y el grafo de conocimiento unificado.</p>
      </GlassCard>
      
    </div>
  );
};

export default ArchitectureDiagram;
