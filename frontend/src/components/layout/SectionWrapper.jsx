const SectionWrapper = ({ id, className = '', title, phaseNumber, children }) => {
  const phaseClass = phaseNumber ? `section--phase-${phaseNumber}` : '';
  
  return (
    <section id={id} className={`section ${phaseClass} ${className}`}>
      <div className="container">
        {title && (
          <div className="section__header gsap-fade-up">
            <div className="section__title">
              {phaseNumber && <span className="section__number">FASE {phaseNumber}</span>}
              <h2 className="text-gradient">{title}</h2>
            </div>
          </div>
        )}
        <div className="section__content gsap-fade-up delay-2">
          {children}
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper;
