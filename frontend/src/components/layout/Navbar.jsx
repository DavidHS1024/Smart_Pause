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
        
        <div className="navbar__links demo-flex-1 demo-flex demo-justify-center">
          <NavLink to="/" className="navbar__link">Inicio</NavLink>
          <NavLink to="/demo" className="navbar__link">Demo</NavLink>
          <NavLink to="/ontology" className="navbar__link">Ontología</NavLink>
          <NavLink to="/dashboard" className="navbar__link">Dashboard</NavLink>
        </div>

        {/* User Profile (Sofia) */}
        <div className="demo-flex demo-items-center demo-gap-3 demo-ml-auto demo-cursor-pointer hover:demo-bg-white-5 demo-p-2 demo-rounded-lg demo-transition-colors">
          <div className="text-right demo-hidden demo-md-block">
            <div className="demo-text-sm demo-font-semibold demo-text-white">Sofía Martínez</div>
            <div className="demo-text-xs demo-text-platzi">12,450 puntos</div>
          </div>
          <div className="demo-w-10 demo-h-10 demo-rounded-full demo-bg-gradient-platzi demo-flex demo-items-center demo-justify-center demo-text-dark demo-font-bold demo-shadow-lg shadow-platzi/20">
            SM
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="demo-text-gray-400">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
      <div className="navbar__progress" style={{ width: scrollProgress }}></div>
    </nav>
  );
};

export default Navbar;
