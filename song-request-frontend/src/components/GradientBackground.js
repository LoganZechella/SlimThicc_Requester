import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

const GradientBackground = ({ children }) => {
  const containerRef = useRef(null);
  
  // Position for gradient effect
  const [{ xy }, api] = useSpring(() => ({ 
    xy: [0, 0],
    config: { mass: 10, tension: 40, friction: 60 } 
  }));

  const gradientTransform = xy.to((x, y) => {
    // Convert mouse position to percentages
    const posX = (x / window.innerWidth) * 100;
    const posY = (y / window.innerHeight) * 100;
    return `translate(-${posX / 2}%, -${posY / 2}%)`;
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      api.start({ xy: [e.clientX, e.clientY] });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [api]);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-primary-100 via-white to-secondary-100" ref={containerRef}>
      {/* Decorative blurred circles */}
      <animated.div 
        className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[120px] bg-primary-300/40"
        style={{ transform: gradientTransform }}
      />
      <animated.div 
        className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[120px] bg-secondary-300/40"
        style={{ transform: gradientTransform }}
      />
      <animated.div 
        className="absolute top-[30%] left-[5%] w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] rounded-full blur-[100px] bg-accent-300/20"
        style={{ transform: gradientTransform }}
      />
      <animated.div 
        className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] max-w-[250px] max-h-[250px] rounded-full blur-[90px] bg-primary-200/30"
        style={{ transform: gradientTransform }}
      />
      
      {/* Content container */}
      <div className="min-h-screen w-full relative z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground; 