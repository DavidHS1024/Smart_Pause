const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="font-display font-semibold mb-2">Smart Pause — Sistema Híbrido de Recomendación</p>
        <p className="text-sm text-secondary mb-1">Universidad Nacional del Callao — FIIS — Ingeniería de Sistemas</p>
        <p className="text-sm text-secondary mb-4">Gestión del Conocimiento — 2026</p>
        
        <div className="text-xs text-muted flex flex-col gap-1">
          <p>Equipo: Trujillano, Medina, Yáñez</p>
          <p>Docente: Huatay Enriquez</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
