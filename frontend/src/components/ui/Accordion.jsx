import { useState } from 'react';

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`accordion__item ${openIndex === index ? 'open' : ''}`}
        >
          <div 
            className="accordion__header"
            onClick={() => toggle(index)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {item.icon && <span>{item.icon}</span>}
              <span>{item.title}</span>
            </div>
            <span style={{ transform: openIndex === index ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
              ▼
            </span>
          </div>
          <div className="accordion__content">
            <div style={{ padding: '8px 0', color: 'var(--text-secondary)' }}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
