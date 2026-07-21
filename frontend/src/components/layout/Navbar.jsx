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
        
        <div className="navbar__links">
          <NavLink to="/" className="navbar__link">Inicio</NavLink>
          <NavLink to="/demo" className="navbar__link">Demo</NavLink>
          <NavLink to="/ontology" className="navbar__link">Ontología</NavLink>
          <NavLink to="/dashboard" className="navbar__link">Dashboard</NavLink>
        </div>
      </div>
      <div className="navbar__progress" style={{ width: scrollProgress }}></div>
    </nav>
  );
};

export default Navbar;
