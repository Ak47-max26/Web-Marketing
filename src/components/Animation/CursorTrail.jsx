import React, { useRef, useEffect } from 'react';

// Fluid Cursor Trail Component
const CursorTrail = () => {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new point
      points.current.push({ ...mouse.current, age: 0 });

      // Remove old points
      if (points.current.length > 40) { // Trail length
        points.current.shift();
      }

      ctx.beginPath();
      if (points.current.length > 1) {
        ctx.moveTo(points.current[0].x, points.current[0].y);
        
        // Draw quadratic bezier curves for smoothness
        for (let i = 1; i < points.current.length - 1; i++) {
           const xc = (points.current[i].x + points.current[i + 1].x) / 2;
           const yc = (points.current[i].y + points.current[i + 1].y) / 2;
           ctx.quadraticCurveTo(points.current[i].x, points.current[i].y, xc, yc);
           points.current[i].age++; // Age points
        }
        // Connect last point
        if(points.current.length > 2) {
            ctx.lineTo(points.current[points.current.length - 1].x, points.current[points.current.length - 1].y);
        }
      }

      // Style the trail
      const gradient = ctx.createLinearGradient(
        points.current[0]?.x || 0, 
        points.current[0]?.y || 0, 
        points.current[points.current.length-1]?.x || 0, 
        points.current[points.current.length-1]?.y || 0
      );
      gradient.addColorStop(0, "rgba(249, 115, 22, 0)");
      gradient.addColorStop(1, "rgba(249, 115, 22, 0.4)"); // Orange trail
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[100] pointer-events-none mix-blend-multiply" 
    />
  );
};

export default CursorTrail;
