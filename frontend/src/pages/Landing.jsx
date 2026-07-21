import { useRef } from 'react';
import SectionWrapper from '../components/layout/SectionWrapper';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ParticlesHero from '../components/visualizations/ParticlesHero';
import EmpathyMap from '../components/visualizations/EmpathyMap';
import SeciSpiral from '../components/visualizations/SeciSpiral';
import ArchitectureDiagram from '../components/visualizations/ArchitectureDiagram';
import GlassCard from '../components/ui/GlassCard';
import StatCounter from '../components/ui/StatCounter';
import { PROJECT_INFO, PROBLEMATICA, SMART_OBJECTIVES, REFERENCES } from '../data/content';

const Landing = () => {
  const mainRef = useRef(null);
  useScrollAnimation(mainRef);

  return (
    <div ref={mainRef}>
      <section className="hero-section text-center">
        <ParticlesHero />
        <div className="container gsap-fade-up">
          <div className="badge badge--ia mb-6">Proyecto de Investigación FIIS - UNAC</div>
          <h1 className="mb-6">
            Sistema Híbrido de Recomendación <br/>
            <span className="text-gradient">IA + Ontologías</span>
          </h1>
          <p className="text-secondary mb-10 max-w-2xl mx-auto text-lg">
            {PROJECT_INFO.description}
          </p>
          <div className="flex justify-center gap-4">
            <a href="/demo" className="btn btn--primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 3l14 9-14 9V3z"/></svg>
              Ver Demo Interactiva
            </a>
            <a href="#problema" className="btn btn--secondary">Explorar Arquitectura</a>
          </div>
        </div>
      </section>

      {/* FASE 1: Análisis */}
      <SectionWrapper id="problema" title="Análisis del Conocimiento" phaseNumber="1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PROBLEMATICA.map((prob, i) => (
            <GlassCard key={i} className={`gsap-fade-up delay-${i+1}`} hover>
              <div className="text-4xl mb-4">{prob.icon}</div>
              <h3 className="mb-2 text-xl">{prob.title}</h3>
              <p className="text-sm text-secondary">{prob.description}</p>
            </GlassCard>
          ))}
        </div>
        
        <div className="mt-16">
          <h3 className="text-center mb-8 gsap-fade-up">Arquetipo de Usuario & Mapa de Empatía</h3>
          <EmpathyMap />
        </div>
      </SectionWrapper>

      {/* FASE 2: SECI */}
      <SectionWrapper id="seci" title="Ingeniería Ontológica (Modelo SECI)" phaseNumber="2">
        <div className="text-center mb-10 gsap-fade-up">
          <p className="text-secondary max-w-2xl mx-auto">
            Transformamos el conocimiento tácito de los docentes en conocimiento explícito estructurado mediante el modelo SECI de Nonaka y Takeuchi, modelado en un grafo ontológico.
          </p>
        </div>
        <SeciSpiral />
        <div className="text-center mt-10 gsap-fade-up">
          <a href="/ontology" className="btn btn--secondary border-onto text-onto hover:bg-onto-light">
            Explorar Grafo Completo
          </a>
        </div>
      </SectionWrapper>

      {/* FASE 3: Arquitectura */}
      <SectionWrapper id="arquitectura" title="Arquitectura del Motor Híbrido" phaseNumber="3">
        <div className="mb-16">
          <ArchitectureDiagram />
        </div>
      </SectionWrapper>

      {/* FASE 4: Resultados */}
      <SectionWrapper id="objetivos" title="Objetivos y Métricas">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {SMART_OBJECTIVES.map((obj, i) => (
            <GlassCard key={i} className={`gsap-fade-up delay-${i+1}`}>
              <StatCounter end={parseInt(obj.metric)} suffix={obj.metric.replace(/[0-9]/g, '')} label={obj.title} />
              <p className="text-sm text-secondary mt-4">{obj.description}</p>
              <div className="mt-4 text-xs font-mono text-muted">TARGET: {obj.timeframe}</div>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      {/* FASE 5: Referencias */}
      <SectionWrapper id="referencias" title="Estado del Arte">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REFERENCES.map((ref, i) => (
            <div key={i} className={`glass-card gsap-fade-up delay-${(i%3)+1}`} style={{ padding: 'var(--space-4)' }}>
              <h4 className="text-ia">{ref.title}</h4>
              <p className="text-xs text-muted mb-2">{ref.author} ({ref.year})</p>
              <p className="text-sm text-secondary">{ref.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Landing;
