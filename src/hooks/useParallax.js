import { useRef, useEffect } from 'react';

// Scroll Parallax Hook
const useParallax = (speed = 0.1) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrollY = window.scrollY;
      const offset = ref.current.offsetTop;
      const windowHeight = window.innerHeight;
      
      // Only animate if in view
      if (scrollY + windowHeight > offset && scrollY < offset + ref.current.offsetHeight + windowHeight) {
         const dist = (scrollY - offset) * speed;
         ref.current.style.transform = `translate3d(0, ${dist}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
};

export default useParallax;
