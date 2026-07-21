import React from 'react';

const MyCoursesSidebar = () => {
  const courses = [
    { id: 1, title: 'Intro a Machine Learning', progress: 30, active: true },
    { id: 2, title: 'Bases de Datos con SQL', progress: 100, active: false },
    { id: 3, title: 'Python Intermedio', progress: 85, active: false },
    { id: 4, title: 'Estadística para Data Science', progress: 0, active: false },
  ];

  return (
    <div className="flex flex-col h-full bg-transparent">
      <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent-platzi)"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z"/></svg>
        Ruta de Aprendizaje
      </h3>
      
      <div className="flex flex-col gap-4">
        {courses.map(course => (
          <div 
            key={course.id} 
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              course.active 
                ? 'bg-[#0f213a] border-platzi shadow-[0_0_15px_rgba(152,202,63,0.1)]' 
                : 'bg-[#0a1628] border-gray-800 hover:border-gray-600'
            }`}
          >
            <h4 className={`text-sm font-semibold mb-3 ${course.active ? 'text-white' : 'text-gray-300'}`}>
              {course.title}
            </h4>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${course.progress === 100 ? 'bg-platzi' : 'bg-ia'}`} 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <span className="text-xs font-mono text-gray-400">{course.progress}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-xl border border-dashed border-gray-700 text-center hover:bg-white/5 cursor-pointer transition-colors">
        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-2 text-gray-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
        </div>
        <span className="text-sm text-gray-400">Explorar más cursos</span>
      </div>
    </div>
  );
};

export default MyCoursesSidebar;
