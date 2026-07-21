import React, { useEffect, useState } from 'react';
import GlassCard from './GlassCard';

const SeciFlowOverlay = ({ isActive }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (isActive) {
      // Sequence the steps
      setActiveStep(1);
      const t1 = setTimeout(() => setActiveStep(2), 1500);
      const t2 = setTimeout(() => setActiveStep(3), 3000);
      const t3 = setTimeout(() => setActiveStep(4), 4500);
      
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    } else {
      setActiveStep(0);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="demo-absolute demo-top-0 demo-right-0 demo-w-full demo-h-full demo-bg-dark demo-rounded-xl demo-border demo-border-platzi demo-overflow-hidden animate-fade-in-left demo-z-20 demo-flex demo-flex-col shadow-[0_0_30px_rgba(152,202,63,0.2)]">
      <div className="demo-p-4 demo-bg-platzi/10 demo-border-b demo-border-platzi/30 demo-flex demo-items-center demo-gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent-platzi)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        <h3 className="demo-text-platzi demo-font-bold demo-text-sm">Monitor del Motor Híbrido SECI</h3>
      </div>
      
      <div className="demo-flex-1 demo-p-6 demo-flex demo-flex-col demo-justify-center demo-gap-6">
        
        {/* Step 1: Telemetry */}
        <div className={`demo-transition-all demo-duration-500 ${activeStep >= 1 ? 'demo-opacity-100 translate-x-0' : 'demo-opacity-0 translate-x-8'}`}>
          <div className="demo-flex demo-items-center demo-gap-3 demo-mb-2">
            <div className={`demo-w-6 demo-h-6 demo-rounded-full demo-flex demo-items-center demo-justify-center demo-text-xs demo-font-bold ${activeStep >= 1 ? 'demo-bg-ia demo-text-dark' : 'demo-bg-gray-800 demo-text-gray-500'}`}>1</div>
            <h4 className={`demo-font-semibold ${activeStep >= 1 ? 'text-ia' : 'demo-text-gray-500'}`}>Detección (Telemetría)</h4>
          </div>
          <p className="demo-text-xs text-secondary demo-ml-9">
            {activeStep === 1 ? <span className="animate-pulse">Analizando caída de atención al 30% del video...</span> : 'Patrón de confusión detectado: Concepto "Overfitting".'}
          </p>
        </div>

        {/* Step 2: Collaborative Filtering */}
        <div className={`demo-transition-all demo-duration-500 ${activeStep >= 2 ? 'demo-opacity-100 translate-x-0' : 'demo-opacity-0 translate-x-8'}`}>
          <div className="demo-flex demo-items-center demo-gap-3 demo-mb-2">
            <div className={`demo-w-6 demo-h-6 demo-rounded-full demo-flex demo-items-center demo-justify-center demo-text-xs demo-font-bold ${activeStep >= 2 ? 'demo-bg-blue demo-text-dark' : 'demo-bg-gray-800 demo-text-gray-500'}`}>2</div>
            <h4 className={`demo-font-semibold ${activeStep >= 2 ? 'text-blue-400' : 'demo-text-gray-500'}`}>Filtrado Colaborativo</h4>
          </div>
          <p className="demo-text-xs text-secondary demo-ml-9">
            {activeStep === 2 ? <span className="animate-pulse">Buscando perfiles similares (Sofía - 28 años - Analista)...</span> : 'Estilo de aprendizaje identificado: Pragmático / No-Code.'}
          </p>
        </div>

        {/* Step 3: Ontology Traversal (SECI) */}
        <div className={`demo-transition-all demo-duration-500 ${activeStep >= 3 ? 'demo-opacity-100 translate-x-0' : 'demo-opacity-0 translate-x-8'}`}>
          <div className="demo-flex demo-items-center demo-gap-3 demo-mb-2">
            <div className={`demo-w-6 demo-h-6 demo-rounded-full demo-flex demo-items-center demo-justify-center demo-text-xs demo-font-bold ${activeStep >= 3 ? 'demo-bg-onto demo-text-dark' : 'demo-bg-gray-800 demo-text-gray-500'}`}>3</div>
            <h4 className={`demo-font-semibold ${activeStep >= 3 ? 'text-onto' : 'demo-text-gray-500'}`}>Exteriorización (SECI)</h4>
          </div>
          <p className="demo-text-xs text-secondary demo-ml-9">
            {activeStep === 3 ? <span className="animate-pulse">Recorriendo Grafo Ontológico...</span> : 'Nodo conectado: Conocimiento Tácito de Experto (Analogía de Negocio).'}
          </p>
        </div>

        {/* Step 4: Hybrid Recommendation */}
        <div className={`demo-transition-all demo-duration-500 ${activeStep >= 4 ? 'demo-opacity-100 translate-x-0' : 'demo-opacity-0 translate-x-8'}`}>
          <div className="demo-flex demo-items-center demo-gap-3 demo-mb-2">
            <div className={`demo-w-6 demo-h-6 demo-rounded-full demo-flex demo-items-center demo-justify-center demo-text-xs demo-font-bold ${activeStep >= 4 ? 'demo-bg-platzi demo-text-dark' : 'demo-bg-gray-800 demo-text-gray-500'}`}>4</div>
            <h4 className={`demo-font-semibold ${activeStep >= 4 ? 'demo-text-platzi' : 'demo-text-gray-500'}`}>Interiorización (Intervención)</h4>
          </div>
          <p className="demo-text-xs text-secondary demo-ml-9">
            {activeStep === 4 ? <span className="animate-pulse">Generando Ficha de Conocimiento...</span> : 'Ficha inyectada en el reproductor. ¡Intervención lista!'}
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default SeciFlowOverlay;
