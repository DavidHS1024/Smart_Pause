import { useRef } from 'react';
import StatCounter from '../components/ui/StatCounter';
import GlassCard from '../components/ui/GlassCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Dashboard = () => {
  const mainRef = useRef(null);
  useScrollAnimation(mainRef);
  return (
    <div ref={mainRef} className="container" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="text-center mb-12 gsap-fade-up">
        <h2 className="text-gradient">Métricas del Piloto (Simulación)</h2>
        <p className="text-secondary mt-2">Resultados simulados de la implementación del motor híbrido.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <GlassCard className="gsap-fade-up text-center border-t-4 border-platzi">
          <StatCounter end={1520} label="Estudiantes Impactados" />
        </GlassCard>
        <GlassCard className="gsap-fade-up delay-1 text-center border-t-4 border-ia">
          <StatCounter end={84} suffix="%" label="Precisión de Rec (CTR)" />
        </GlassCard>
        <GlassCard className="gsap-fade-up delay-2 text-center border-t-4 border-onto">
          <StatCounter end={18} suffix="%" label="Reducción Abandono" />
        </GlassCard>
        <GlassCard className="gsap-fade-up delay-3 text-center border-t-4 border-warning">
          <StatCounter end={120} label="Fichas Ontológicas" />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="gsap-fade-up delay-4">
          <h4 className="mb-6 border-b border-gray-800 pb-2">Top Conceptos que causan 'Smart Pause'</h4>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overfitting / Regularización</span>
                <span className="text-ia">450 eventos</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded"><div className="bg-ia h-2 rounded" style={{width: '80%'}}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Backpropagation (Matemáticas)</span>
                <span className="text-ia">380 eventos</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded"><div className="bg-ia h-2 rounded" style={{width: '65%'}}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Docker vs Kubernetes</span>
                <span className="text-ia">210 eventos</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded"><div className="bg-ia h-2 rounded" style={{width: '40%'}}></div></div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="gsap-fade-up delay-5">
          <h4 className="mb-6 border-b border-gray-800 pb-2">Distribución de Estilos (Ontología)</h4>
          <div className="flex items-end gap-4 h-48 mt-4">
            {/* Simple CSS Bar Chart */}
            <div className="flex-1 flex flex-col justify-end items-center gap-2">
              <div className="w-full bg-onto rounded-t" style={{height: '60%', opacity: 0.8}}></div>
              <span className="text-xs text-muted text-center">Técnico / Hard-Code</span>
            </div>
            <div className="flex-1 flex flex-col justify-end items-center gap-2">
              <div className="w-full bg-warning rounded-t" style={{height: '85%', opacity: 0.8}}></div>
              <span className="text-xs text-muted text-center">Negocio / Pragmático</span>
            </div>
            <div className="flex-1 flex flex-col justify-end items-center gap-2">
              <div className="w-full bg-platzi rounded-t" style={{height: '40%', opacity: 0.8}}></div>
              <span className="text-xs text-muted text-center">Visual / Conceptual</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;
