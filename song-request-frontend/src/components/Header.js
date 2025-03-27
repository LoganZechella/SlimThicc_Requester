import React, { forwardRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const Header = forwardRef(({ title = "Request a song from DJ Slim Thicc" }, ref) => {
  const [titleStyles, titleApi] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: {
      tension: 170,
      friction: 26
    },
    delay: 100
  }));

  const [decorationStyles, decorationApi] = useSpring(() => ({
    from: { width: '0%' },
    to: { width: '60%' },
    config: {
      tension: 170,
      friction: 26
    },
    delay: 600
  }));

  const [glowStyles, glowApi] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 0.7 },
    config: {
      tension: 170,
      friction: 26
    },
    delay: 800
  }));

  useEffect(() => {
    titleApi.start();
    decorationApi.start();
    glowApi.start();
  }, [titleApi, decorationApi, glowApi]);

  return (
    <div className="text-center mb-10 relative" ref={ref}>
      <animated.div 
        style={glowStyles} 
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl pointer-events-none"
      />
      
      <animated.h1 
        style={titleStyles} 
        className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-400"
      >
        {title}
      </animated.h1>
      
      <div className="flex justify-center mt-4 relative">
        <animated.div 
          style={decorationStyles} 
          className="h-1.5 bg-gradient-to-r from-primary-300 to-secondary-300 rounded-full" 
        />
        
        <animated.div
          style={decorationStyles}
          className="absolute top-0 h-1.5 w-full blur-md bg-gradient-to-r from-primary-300 to-secondary-300 rounded-full opacity-70"
        />
      </div>
    </div>
  );
});

Header.displayName = 'Header';

export default Header; 