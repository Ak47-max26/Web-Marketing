import React, { useRef, useState } from 'react';

// 3D Tilt Card with Background Reveal
const TiltCard = ({ children, className = "", BackgroundIcon = null }) => {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 50; 
    const y = -(e.clientY - top - height / 2) / 50;
    setRotate({ x: y, y: x });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{ 
        transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      className={`group transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform relative overflow-hidden ${className}`}
    >
      {/* Background Reveal Icon */}
      {BackgroundIcon && (
        <div className="absolute -right-10 -bottom-10 opacity-0 group-hover:opacity-[0.07] transition-all duration-700 ease-out scale-50 group-hover:scale-110 pointer-events-none z-0 text-black rotate-12">
           <BackgroundIcon strokeWidth={0.5} size={320} />
        </div>
      )}
      
      {/* Content Wrapper to ensure z-index above background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
