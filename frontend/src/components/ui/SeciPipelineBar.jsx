import React from 'react';

const SeciPipelineBar = ({ status, activeStep }) => {
  // status can be 'idle', 'processing', 'complete'
  
  const steps = [
    { id: 1, label: 'Telemetría', desc: 'Detección de estancamiento temporal > 15s sin avance.', color: 'demo-bg-red' },
    { id: 2, label: 'IA Colaborativa', desc: 'Inferencia de perfil: Sofía necesita enfoque de negocio.', color: 'demo-bg-blue' },
    { id: 3, label: 'Grafo Ontológico', desc: 'Búsqueda de analogías en la ontología del curso.', color: 'demo-bg-onto' },
    { id: 4, label: 'Intervención', desc: 'Generación de la Tarjeta de Conocimiento (Knowledge Card).', color: 'demo-bg-platzi' },
  ];

  return (
    <div className="demo-bg-dark demo-border demo-border-gray-800 demo-rounded-xl demo-p-4 demo-mt-4 demo-flex demo-flex-col md:flex-row demo-items-center demo-gap-4 demo-relative demo-overflow-hidden">
      
      {/* Background Pulse if processing */}
      {status === 'processing' && (
        <div className="demo-absolute demo-inset-0 demo-bg-gradient-shimmer animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
      )}

      <div className="demo-flex-shrink-0 demo-flex demo-flex-col demo-justify-center demo-items-center demo-px-4 demo-border-r demo-border-gray-700/50 demo-z-10">
        <span className="demo-text-xs demo-font-mono demo-text-gray-500 demo-uppercase demo-tracking-widest demo-mb-1">Motor SECI</span>
        <div className="demo-flex demo-items-center demo-gap-2">
          <div className={`demo-w-2 demo-h-2 demo-rounded-full ${status === 'idle' ? 'demo-bg-gray-600' : status === 'processing' ? 'demo-bg-yellow animate-pulse' : 'demo-bg-platzi'}`}></div>
          <span className={`demo-text-sm demo-font-bold ${status === 'idle' ? 'demo-text-gray-400' : status === 'processing' ? 'demo-text-yellow' : 'demo-text-platzi'}`}>
            {status === 'idle' ? 'STANDBY' : status === 'processing' ? 'ANALIZANDO' : 'COMPLETADO'}
          </span>
        </div>
      </div>

      <div className="demo-flex-1 demo-w-full demo-grid demo-grid-cols-4 demo-gap-2 demo-z-10">
        {steps.map((step) => {
          const isPast = activeStep > step.id;
          const isCurrent = activeStep === step.id;
          const isFuture = activeStep < step.id;
          
          return (
            <div key={step.id} className={`demo-flex demo-flex-col demo-p-2 demo-rounded-lg demo-transition-all demo-duration-300 ${isCurrent ? 'demo-bg-white-10' : ''}`}>
              <div className="demo-flex demo-items-center demo-gap-2 demo-mb-2">
                <div className={`h-1 demo-flex-1 demo-rounded-full demo-overflow-hidden demo-bg-gray-800`}>
                  <div className={`demo-h-full demo-transition-all demo-duration-1000 demo-ease-in-out ${step.color} ${isPast || isCurrent ? 'demo-w-full' : 'w-0'}`}></div>
                </div>
              </div>
              <span className={`demo-text-xs demo-font-bold ${isPast || isCurrent ? 'demo-text-white' : 'demo-text-gray-500'}`}>{step.label}</span>
              <span className={`text-[10px] ${isCurrent ? 'demo-text-gray-300' : 'demo-text-gray-600'} demo-leading-relaxed demo-mt-1`}>{step.desc}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeciPipelineBar;
