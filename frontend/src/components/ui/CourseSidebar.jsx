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
    <div className="demo-flex demo-flex-col demo-h-full demo-bg-dark demo-rounded-xl demo-border demo-border-gray-800 demo-overflow-hidden">
      <div className="demo-p-4 demo-border-b demo-border-gray-800 demo-bg-darker">
        <h3 className="demo-text-white demo-font-semibold demo-text-sm">Contenido del Curso</h3>
        <p className="demo-text-xs text-secondary demo-mt-1">Módulo 1: Fundamentos Matemáticos</p>
      </div>
      
      <div className="demo-flex-1 demo-overflow-y-auto demo-p-2" style={{ maxHeight: '600px' }}>
        {classes.map((cls) => (
          <div 
            key={cls.id} 
            className={`demo-p-3 demo-mb-2 demo-rounded-lg demo-flex items-start demo-gap-3 demo-transition-colors ${
              cls.status === 'current' 
                ? 'bg-[rgba(152,202,63,0.1)] demo-border border-[rgba(152,202,63,0.3)]' 
                : 'demo-hover-bg-darker'
            }`}
          >
            <div className="demo-mt-1">
              {cls.status === 'completed' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent-platzi)"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
              )}
              {cls.status === 'current' && (
                <div className="demo-w-4 demo-h-4 demo-rounded-full border-2 demo-border-platzi demo-flex demo-items-center demo-justify-center">
                  <div className="w-1.5 h-1.5 demo-rounded-full demo-bg-platzi"></div>
                </div>
              )}
              {cls.status === 'locked' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--text-muted)"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
              )}
            </div>
            
            <div className="demo-flex-1">
              <h4 className={`demo-text-sm ${cls.status === 'current' ? 'demo-text-platzi demo-font-semibold' : cls.status === 'locked' ? 'text-muted' : 'demo-text-white'}`}>
                {cls.id}. {cls.title}
              </h4>
              <p className="demo-text-xs text-secondary demo-mt-1">{cls.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
