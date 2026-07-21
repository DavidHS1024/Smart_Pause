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
    <div className="absolute top-0 right-0 w-full h-full bg-[#0a1628] rounded-xl border border-platzi overflow-hidden animate-fade-in-left z-20 flex flex-col shadow-[0_0_30px_rgba(152,202,63,0.2)]">
      <div className="p-4 bg-platzi/10 border-b border-platzi/30 flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent-platzi)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        <h3 className="text-platzi font-bold text-sm">Monitor del Motor Híbrido SECI</h3>
      </div>
      
      <div className="flex-1 p-6 flex flex-col justify-center gap-6">
        
        {/* Step 1: Telemetry */}
        <div className={`transition-all duration-500 ${activeStep >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep >= 1 ? 'bg-ia text-[#0a1628]' : 'bg-gray-800 text-gray-500'}`}>1</div>
            <h4 className={`font-semibold ${activeStep >= 1 ? 'text-ia' : 'text-gray-500'}`}>Detección (Telemetría)</h4>
          </div>
          <p className="text-xs text-secondary ml-9">
            {activeStep === 1 ? <span className="animate-pulse">Analizando caída de atención al 30% del video...</span> : 'Patrón de confusión detectado: Concepto "Overfitting".'}
          </p>
        </div>

        {/* Step 2: Collaborative Filtering */}
        <div className={`transition-all duration-500 ${activeStep >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep >= 2 ? 'bg-blue-400 text-[#0a1628]' : 'bg-gray-800 text-gray-500'}`}>2</div>
            <h4 className={`font-semibold ${activeStep >= 2 ? 'text-blue-400' : 'text-gray-500'}`}>Filtrado Colaborativo</h4>
          </div>
          <p className="text-xs text-secondary ml-9">
            {activeStep === 2 ? <span className="animate-pulse">Buscando perfiles similares (Sofía - 28 años - Analista)...</span> : 'Estilo de aprendizaje identificado: Pragmático / No-Code.'}
          </p>
        </div>

        {/* Step 3: Ontology Traversal (SECI) */}
        <div className={`transition-all duration-500 ${activeStep >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep >= 3 ? 'bg-onto text-[#0a1628]' : 'bg-gray-800 text-gray-500'}`}>3</div>
            <h4 className={`font-semibold ${activeStep >= 3 ? 'text-onto' : 'text-gray-500'}`}>Exteriorización (SECI)</h4>
          </div>
          <p className="text-xs text-secondary ml-9">
            {activeStep === 3 ? <span className="animate-pulse">Recorriendo Grafo Ontológico...</span> : 'Nodo conectado: Conocimiento Tácito de Experto (Analogía de Negocio).'}
          </p>
        </div>

        {/* Step 4: Hybrid Recommendation */}
        <div className={`transition-all duration-500 ${activeStep >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep >= 4 ? 'bg-platzi text-[#0a1628]' : 'bg-gray-800 text-gray-500'}`}>4</div>
            <h4 className={`font-semibold ${activeStep >= 4 ? 'text-platzi' : 'text-gray-500'}`}>Interiorización (Intervención)</h4>
          </div>
          <p className="text-xs text-secondary ml-9">
            {activeStep === 4 ? <span className="animate-pulse">Generando Ficha de Conocimiento...</span> : 'Ficha inyectada en el reproductor. ¡Intervención lista!'}
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default SeciFlowOverlay;
