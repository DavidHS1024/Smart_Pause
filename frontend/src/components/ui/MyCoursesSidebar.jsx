import React from 'react';

const MyCoursesSidebar = () => {
  const courses = [
    { id: 1, title: 'Intro a Machine Learning', progress: 30, active: true },
    { id: 2, title: 'Bases de Datos con SQL', progress: 100, active: false },
    { id: 3, title: 'Python Intermedio', progress: 85, active: false },
    { id: 4, title: 'Estadística para Data Science', progress: 0, active: false },
  ];

  return (
    <div className="demo-flex demo-flex-col demo-h-full demo-bg-transparent">
      <h3 className="demo-text-white demo-font-bold demo-text-lg demo-mb-6 demo-flex demo-items-center demo-gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent-platzi)"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>
        Ruta de Aprendizaje
      </h3>
      
      <div className="demo-flex demo-flex-col demo-gap-4">
        {courses.map(course => (
          <div 
            key={course.id} 
            className={`demo-p-4 demo-rounded-xl demo-border demo-transition-all demo-cursor-pointer ${
              course.active 
                ? 'demo-bg-darker demo-border-platzi shadow-[0_0_15px_rgba(152,202,63,0.1)]' 
                : 'demo-bg-dark demo-border-gray-800 demo-hover-border-gray-600'
            }`}
          >
            <h4 className={`demo-text-sm demo-font-semibold demo-mb-3 ${course.active ? 'demo-text-white' : 'demo-text-gray-300'}`}>
              {course.title}
            </h4>
            <div className="demo-flex demo-items-center demo-gap-3">
              <div className="demo-flex-1 demo-bg-gray-800 h-1.5 demo-rounded-full demo-overflow-hidden">
                <div 
                  className={`demo-h-full demo-rounded-full ${course.progress === 100 ? 'demo-bg-platzi' : 'demo-bg-ia'}`} 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <span className="demo-text-xs demo-font-mono demo-text-gray-400">{course.progress}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="demo-mt-8 demo-p-4 demo-rounded-xl demo-border demo-border-dashed demo-border-gray-700 text-center hover:demo-bg-white-5 demo-cursor-pointer demo-transition-colors">
        <div className="demo-w-8 demo-h-8 demo-rounded-full demo-bg-gray-800 demo-flex demo-items-center demo-justify-center demo-mx-auto demo-mb-2 demo-text-gray-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
        </div>
        <span className="demo-text-sm demo-text-gray-400">Explorar más cursos</span>
      </div>
    </div>
  );
};

export default MyCoursesSidebar;
