const Badge = ({ children, variant = 'platzi' }) => {
  return (
    <span className={`badge badge--${variant}`}>
      {children}
    </span>
  );
};

export default Badge;
