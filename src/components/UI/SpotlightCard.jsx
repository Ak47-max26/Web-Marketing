import React from 'react';

// Spotlight Card Component
const SpotlightCard = ({ children, className = "", colSpan = "", BackgroundIcon = null }) => {
  return (
    <div className={`group/card relative bg-zinc-50/50 rounded-[2rem] border border-zinc-200 overflow-hidden ${className} ${colSpan}`}>
      {/* Spotlight Layers */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(249, 115, 22, 0.15), transparent 40%)`,
          zIndex: 0
        }}
      />
       <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(249, 115, 22, 0.4), transparent 40%)`,
          zIndex: 1
        }}
      />
      
      {/* Inner White Mask */}
      <div className="absolute inset-[1px] bg-white rounded-[calc(2rem-1px)] z-10 h-[calc(100%-2px)] w-[calc(100%-2px)]" />

      {/* Background Reveal Icon */}
      {BackgroundIcon && (
        <div className="absolute -right-12 -bottom-12 opacity-0 group-hover/card:opacity-[0.06] transition-all duration-700 ease-out scale-75 group-hover/card:scale-110 pointer-events-none z-10 text-black rotate-[15deg]">
           <BackgroundIcon strokeWidth={0.8} size={300} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
