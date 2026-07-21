import { EMPATHY_MAP } from '../../data/content';
import GlassCard from '../ui/GlassCard';

const EmpathyMap = () => {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      gridTemplateRows: 'auto auto auto',
      gap: 'var(--space-4)',
      width: '100%'
    }}>
      {/* Think and Feel (Top Left) */}
      <GlassCard className="gsap-fade-up" style={{ borderTop: '4px solid var(--accent-onto)' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--accent-onto)' }}>
          <span style={{ fontSize: '1.5rem' }}>🧠</span> Piensa y Siente
        </h4>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          {EMPATHY_MAP.think_feel.map((item, i) => <li key={i} className="mb-2">{item}</li>)}
        </ul>
      </GlassCard>

      {/* Hear (Top Right) */}
      <GlassCard className="gsap-fade-up delay-1" style={{ borderTop: '4px solid var(--accent-platzi)' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--accent-platzi)' }}>
          <span style={{ fontSize: '1.5rem' }}>👂</span> Escucha
        </h4>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          {EMPATHY_MAP.hear.map((item, i) => <li key={i} className="mb-2">{item}</li>)}
        </ul>
      </GlassCard>

      {/* See (Bottom Left) */}
      <GlassCard className="gsap-fade-up delay-2" style={{ borderTop: '4px solid var(--accent-ia)' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--accent-ia)' }}>
          <span style={{ fontSize: '1.5rem' }}>👀</span> Ve
        </h4>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          {EMPATHY_MAP.see.map((item, i) => <li key={i} className="mb-2">{item}</li>)}
        </ul>
      </GlassCard>

      {/* Say and Do (Bottom Right) */}
      <GlassCard className="gsap-fade-up delay-3" style={{ borderTop: '4px solid var(--accent-warning)' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--accent-warning)' }}>
          <span style={{ fontSize: '1.5rem' }}>🗣️</span> Dice y Hace
        </h4>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          {EMPATHY_MAP.say_do.map((item, i) => <li key={i} className="mb-2">{item}</li>)}
        </ul>
      </GlassCard>

      {/* Center Persona (Absolute overlay or integrated in grid) - here we integrate below */}
      <div style={{ gridColumn: '1 / span 2', display: 'flex', gap: 'var(--space-4)' }}>
        <GlassCard className="gsap-fade-up delay-4" style={{ flex: 1, borderTop: '4px solid var(--accent-danger)' }}>
          <h4 className="mb-4 text-danger">Pains (Esfuerzos)</h4>
          <p className="text-sm text-secondary">Parálisis por análisis, bloqueos en conceptos abstractos técnicos.</p>
        </GlassCard>
        <GlassCard className="gsap-fade-up delay-5" style={{ flex: 1, borderTop: '4px solid var(--accent-platzi)' }}>
          <h4 className="mb-4 text-platzi">Gains (Resultados)</h4>
          <p className="text-sm text-secondary">Aprender sin frustración, guías personalizadas a su rol pragmático.</p>
        </GlassCard>
      </div>
    </div>
  );
};

export default EmpathyMap;
