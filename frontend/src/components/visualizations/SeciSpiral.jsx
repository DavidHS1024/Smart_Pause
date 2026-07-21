import { SECI_PHASES } from '../../data/content';
import GlassCard from '../ui/GlassCard';

const SeciSpiral = () => {
  return (
    <div style={{ position: 'relative', width: '100%', padding: 'var(--space-8)' }}>
      {/* Fondo decorativo que simula espiral */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        border: '2px dashed var(--bg-surface)',
        zIndex: 0
      }} className="animate-spin-slow"></div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', position: 'relative', zIndex: 1 }}>
        {SECI_PHASES.map((phase, index) => {
          const colors = ['var(--accent-platzi)', 'var(--accent-ia)', 'var(--accent-onto)', 'var(--accent-warning)'];
          return (
            <GlassCard key={index} className={`gsap-fade-up delay-${index + 1}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ 
                  width: '32px', height: '32px', borderRadius: '50%', 
                  background: colors[index], display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', color: '#000', fontWeight: 'bold' 
                }}>
                  {index + 1}
                </div>
                <h4 style={{ color: colors[index] }}>{phase.phase.split(' ')[0]}</h4>
              </div>
              <p className="text-xs text-muted mb-2 font-mono uppercase">{phase.phase.match(/\((.*?)\)/)[1]}</p>
              <p className="text-sm text-secondary">{phase.description}</p>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

export default SeciSpiral;
