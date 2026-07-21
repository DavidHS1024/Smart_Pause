const GlassCard = ({ children, className = '', hover = false }) => {
  return (
    <div className={`glass-card ${hover ? 'hover:glow' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
