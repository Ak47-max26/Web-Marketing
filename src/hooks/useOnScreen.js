import { useState, useEffect } from 'react';

// Smooth Scroll Reveal Hook
const useOnScreen = (ref, rootMargin = "0px", threshold = 0.1) => {
  const [isIntersecting, setIntersecting] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIntersecting(true);
      },
      { rootMargin, threshold }
    );
    
    if (ref.current) observer.observe(ref.current);
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, rootMargin, threshold]);
  
  return isIntersecting;
};

export default useOnScreen;
