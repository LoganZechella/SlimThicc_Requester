import React, { forwardRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const LoadingSpinner = forwardRef(({ size = 'md', className = '' }, ref) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  // Spinning animation
  const [styles, api] = useSpring(() => ({
    from: { rotateZ: 0 },
    to: { rotateZ: 360 },
    loop: true,
    config: {
      tension: 100,
      friction: 25
    }
  }));

  // Ensure animation starts
  useEffect(() => {
    api.start();
  }, [api]);

  return (
    <div className={`flex justify-center items-center ${className}`} ref={ref}>
      <animated.div
        style={styles}
        className={`${sizeClasses[size] || sizeClasses.md} border-4 border-primary-200 border-t-primary-500 rounded-full`}
      />
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner; 