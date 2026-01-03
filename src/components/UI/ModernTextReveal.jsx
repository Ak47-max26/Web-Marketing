import React, { useRef, useEffect } from 'react';

// Modern Text Reveal Component with Intersection Observer + CSS Animations
const ModernTextReveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // CSS animations are triggered by the animation-delay style
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`modern-text-reveal ${className}`}
      style={{
        animationDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default ModernTextReveal;
