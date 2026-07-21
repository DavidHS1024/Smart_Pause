import React from 'react';

const CourseSidebar = () => {
  const classes = [
    { id: 1, title: 'Bienvenida al curso', duration: '02:15', status: 'completed' },
    { id: 2, title: '¿Qué es Machine Learning?', duration: '08:30', status: 'completed' },
    { id: 3, title: 'Tipos de aprendizaje automático', duration: '12:45', status: 'completed' },
    { id: 4, title: 'Funciones de Costo y Overfitting', duration: '10:00', status: 'current' },
    { id: 5, title: 'Regularización L1 y L2', duration: '15:20', status: 'locked' },
    { id: 6, title: 'Descenso del gradiente', duration: '14:10', status: 'locked' },
    { id: 7, title: 'Laboratorio Práctico', duration: '25:00', status: 'locked' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0a1628] rounded-xl border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800 bg-[#0f213a]">
        <h3 className="text-white font-semibold text-sm">Contenido del Curso</h3>
        <p className="text-xs text-secondary mt-1">Módulo 1: Fundamentos Matemáticos</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: '600px' }}>
        {classes.map((cls) => (
          <div 
            key={cls.id} 
            className={`p-3 mb-2 rounded-lg flex items-start gap-3 transition-colors ${
              cls.status === 'current' 
                ? 'bg-[rgba(152,202,63,0.1)] border border-[rgba(152,202,63,0.3)]' 
                : 'hover:bg-[#1a2b45]'
            }`}
          >
            <div className="mt-1">
              {cls.status === 'completed' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent-platzi)"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
              )}
              {cls.status === 'current' && (
                <div className="w-4 h-4 rounded-full border-2 border-platzi flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-platzi"></div>
                </div>
              )}
              {cls.status === 'locked' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-muted)"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
              )}
            </div>
            
            <div className="flex-1">
              <h4 className={`text-sm ${cls.status === 'current' ? 'text-platzi font-semibold' : cls.status === 'locked' ? 'text-muted' : 'text-white'}`}>
                {cls.id}. {cls.title}
              </h4>
              <p className="text-xs text-secondary mt-1">{cls.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
