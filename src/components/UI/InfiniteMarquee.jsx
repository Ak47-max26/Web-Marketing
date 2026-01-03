import React from 'react';

// Infinite Marquee Component
const InfiniteMarquee = ({ children }) => {
  return (
    <div className="relative flex overflow-hidden w-full mask-linear-gradient">
      <div className="animate-marquee flex whitespace-nowrap items-center will-change-transform">
        {children}
      </div>
      <div className="absolute top-0 animate-marquee2 flex whitespace-nowrap items-center will-change-transform">
        {children}
      </div>
    </div>
  );
};

export default InfiniteMarquee;
