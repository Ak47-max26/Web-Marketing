import React from 'react';

// Floating Widget Component
const FloatingWidget = ({ icon: Icon, label, className, delay }) => (
  <div 
    className={`absolute p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] border border-white/30 flex items-center gap-3 z-30 group hover:bg-white/90 transition-all duration-500 ease-out ${className}`}
    style={{ 
      animationDelay: `${delay}s`,
      animation: `float 8s ease-in-out infinite`,
      transform: 'translate3d(0, 0, 0)',
    }}
  >
    <div className="p-2 bg-orange-50 rounded-xl text-orange-600 border border-orange-100/50 group-hover:bg-orange-100 group-hover:border-orange-200 transition-all duration-500 ease-out">
      <Icon size={18} />
    </div>
    <span className="text-xs font-bold text-zinc-600 pr-2 tracking-wide group-hover:text-zinc-700 transition-colors duration-300">{label}</span>
  </div>
);

export default FloatingWidget;
