import React from 'react';

const SeciPipelineBar = ({ status, activeStep }) => {
  // status can be 'idle', 'processing', 'complete'
  
  const steps = [
    { id: 1, label: 'Telemetría', desc: 'Detección de confusión', color: 'bg-red-500' },
    { id: 2, label: 'IA Colaborativa', desc: 'Inferencia de perfil', color: 'bg-blue-400' },
    { id: 3, label: 'Grafo Ontológico', desc: 'Búsqueda de material', color: 'bg-onto' },
    { id: 4, label: 'Intervención', desc: 'Ficha generada', color: 'bg-platzi' },
  ];

  return (
    <div className="bg-[#0a1628] border border-gray-800 rounded-xl p-4 mt-4 flex flex-col md:flex-row items-center gap-4 relative overflow-hidden">
      
      {/* Background Pulse if processing */}
      {status === 'processing' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
      )}

      <div className="flex-shrink-0 flex flex-col justify-center items-center px-4 border-r border-gray-700/50 z-10">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-1">Motor SECI</span>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status === 'idle' ? 'bg-gray-600' : status === 'processing' ? 'bg-yellow-400 animate-pulse' : 'bg-platzi'}`}></div>
          <span className={`text-sm font-bold ${status === 'idle' ? 'text-gray-400' : status === 'processing' ? 'text-yellow-400' : 'text-platzi'}`}>
            {status === 'idle' ? 'STANDBY' : status === 'processing' ? 'ANALIZANDO' : 'COMPLETADO'}
          </span>
        </div>
      </div>

      <div className="flex-1 w-full grid grid-cols-4 gap-2 z-10">
        {steps.map((step) => {
          const isPast = activeStep > step.id;
          const isCurrent = activeStep === step.id;
          const isFuture = activeStep < step.id;
          
          return (
            <div key={step.id} className={`flex flex-col p-2 rounded-lg transition-all duration-300 ${isCurrent ? 'bg-white/10' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`h-1 flex-1 rounded-full overflow-hidden bg-gray-800`}>
                  <div className={`h-full transition-all duration-1000 ease-in-out ${step.color} ${isPast || isCurrent ? 'w-full' : 'w-0'}`}></div>
                </div>
              </div>
              <span className={`text-xs font-bold ${isPast || isCurrent ? 'text-white' : 'text-gray-500'}`}>{step.label}</span>
              <span className={`text-[10px] ${isCurrent ? 'text-gray-300' : 'text-gray-600'}`}>{step.desc}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeciPipelineBar;
