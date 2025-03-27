import React, { forwardRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const GlassCard = forwardRef(({ children, className = '', ...props }, ref) => {
  // Animation for card on mount
  const [styles, api] = useSpring(() => ({
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: {
      tension: 170,
      friction: 26
    }
  }));

  useEffect(() => {
    api.start();
  }, [api]);

  return (
    <animated.div 
      ref={ref}
      style={styles} 
      className={`
        bg-white/30 
        backdrop-blur-md 
        border border-white/30 
        rounded-2xl 
        shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
        p-6 
        overflow-hidden
        relative
        w-full
        ${className}
      `}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
    </animated.div>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard; 