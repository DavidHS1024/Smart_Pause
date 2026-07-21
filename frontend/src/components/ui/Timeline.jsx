import Badge from './Badge';

const Timeline = ({ items }) => {
  return (
    <div className="timeline">
      {items.map((item, index) => (
        <div key={index} className="timeline__item">
          <div className="timeline__dot"></div>
          <div style={{ marginBottom: '8px' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>{item.title}</h4>
            {item.badge && <Badge variant={item.badgeVariant || 'ia'}>{item.badge}</Badge>}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{item.description}</p>
          {item.metric && (
            <div style={{ marginTop: '8px', color: 'var(--accent-platzi)', fontWeight: '600' }}>
              {item.metric}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
