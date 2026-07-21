const FlowStep = ({ number, icon, title, description, isActive, isLast }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className={`glass-card ${isActive ? 'active' : ''}`} style={{ 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px',
        borderLeft: isActive ? '4px solid var(--accent-ia)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: isActive ? '0 0 20px rgba(0,180,255,0.2)' : 'none'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          background: isActive ? 'var(--accent-ia)' : 'var(--bg-surface)',
          color: isActive ? '#000' : 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          flexShrink: 0
        }}>
          {icon || number}
        </div>
        <div>
          <h4 style={{ marginBottom: '4px', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
            {title}
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{description}</p>
        </div>
      </div>
      
      {!isLast && (
        <div style={{ 
          height: '30px', 
          borderLeft: '2px dashed var(--bg-surface)', 
          margin: '4px 0' 
        }}></div>
      )}
    </div>
  );
};

export default FlowStep;
