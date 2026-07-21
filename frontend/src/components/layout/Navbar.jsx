import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = 
useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight * 100}%`;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar__container">
        <NavLink to="/" className="navbar__logo">
          Smart <span className="text-gradient">Pause</span>
        </NavLink>
        
        <div className="navbar__links flex-1 flex justify-center">
          <NavLink to="/" className="navbar__link">Inicio</NavLink>
          <NavLink to="/demo" className="navbar__link">Demo</NavLink>
          <NavLink to="/ontology" className="navbar__link">Ontología</NavLink>
          <NavLink to="/dashboard" className="navbar__link">Dashboard</NavLink>
        </div>

        {/* User Profile (Sofia) */}
        <div className="flex items-center gap-3 ml-auto cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
          <div className="text-right hidden md:block">
            <div className="text-sm font-semibold text-white">Sofía Martínez</div>
            <div className="text-xs text-platzi">12,450 puntos</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-platzi to-ia flex items-center justify-center text-[#0a1628] font-bold shadow-lg shadow-platzi/20">
            SM
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
      <div className="navbar__progress" style={{ width: scrollProgress }}></div>
    </nav>
  );
};

export default Navbar;
