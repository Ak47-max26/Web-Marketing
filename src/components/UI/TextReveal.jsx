import React, { useRef } from 'react';
import useOnScreen from '../../hooks/useOnScreen';

// Staggered Text Reveal Component
const TextReveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref, "-20px");
  
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div 
        className={`transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) ${
          onScreen ? "translate-y-0 opacity-100" : "translate-y-[110%] opacity-0"
        }`}
        style={{ 
          transitionDelay: `${delay}ms`,
          paddingBottom: '0.6em', // More space for descenders
          marginBottom: '-0.6em'  // Maintain spacing
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TextReveal;
