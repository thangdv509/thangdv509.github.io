import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState([]);
  const trailLength = 15;

  useEffect(() => {
    let animationFrameId;
    let lastTime = 0;

    const handleMouseMove = (e) => {
      const currentTime = Date.now();
      
      // Throttle để tối ưu performance
      if (currentTime - lastTime < 16) {
        return;
      }
      lastTime = currentTime;

      setPosition({ x: e.clientX, y: e.clientY });

      // Tạo trail particles
      setTrails((prev) => {
        const newTrails = [
          {
            x: e.clientX,
            y: e.clientY,
            id: Date.now(),
            opacity: 1,
          },
          ...prev,
        ];
        return newTrails.slice(0, trailLength);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup trails
    const cleanupInterval = setInterval(() => {
      setTrails((prev) =>
        prev.map((trail) => ({
          ...trail,
          opacity: Math.max(0, trail.opacity - 0.05),
        })).filter((trail) => trail.opacity > 0)
      );
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
      {trails.map((trail, index) => {
        const hue = (index * 360 / trailLength + Date.now() / 50) % 360;
        const size = 12 - (index * 0.4);
        return (
          <div
            key={trail.id}
            className="cursor-trail"
            style={{
              left: `${trail.x}px`,
              top: `${trail.y}px`,
              opacity: trail.opacity * (1 - index / trailLength) * 0.8,
              background: `radial-gradient(circle, hsl(${hue}, 100%, 70%) 0%, hsl(${(hue + 30) % 360}, 100%, 60%) 100%)`,
              width: `${size}px`,
              height: `${size}px`,
              boxShadow: `0 0 ${8 + index * 2}px hsl(${hue}, 100%, 60%), 0 0 ${15 + index * 3}px hsl(${hue}, 100%, 50%)`,
            }}
          />
        );
      })}
    </>
  );
}

export default CustomCursor;
