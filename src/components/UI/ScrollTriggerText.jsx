import React, { useRef, useEffect, useState } from 'react';

// Modern Scroll-Triggered Text Animation Component
const ScrollTriggerText = ({ children, className = "", delay = 0, duration = 1000 }) => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Modern CSS Scroll Timeline approach
    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress
      const scrollProgress = Math.max(0, Math.min(1, 
        1 - (elementTop + elementHeight) / (viewportHeight + elementHeight)
      ));
      
      setProgress(scrollProgress);
    };

    // Use requestAnimationFrame for smooth updates
    let ticking = false;
    const updateScroll = () => {
      handleScroll();
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Intersection Observer as fallback for older browsers
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('in-view');
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    observer.observe(element);

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.unobserve(element);
    };
  }, []);

  // Calculate animation values based on scroll progress
  const opacity = Math.min(1, progress * 1.5);
  const translateY = 50 * (1 - progress);
  const scale = 0.9 + (0.1 * progress);

  return (
    <div 
      ref={ref}
      className={`scroll-trigger-text ${className}`}
      style={{
        opacity: opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        transition: 'none', // Disable CSS transitions for smooth scroll-based animation
      }}
    >
      {children}
    </div>
  );
};

export default ScrollTriggerText;
