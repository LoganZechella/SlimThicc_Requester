import React, { forwardRef, useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const NeumorphicButton = forwardRef(({ 
  children, 
  className = '', 
  variant = 'primary', // 'primary', 'secondary', or 'neutral'
  disabled = false,
  ...props 
}, ref) => {
  // Animation for hover state
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  
  // Determine button color classes based on variant
  let colorClasses = '';
  if (variant === 'primary') {
    colorClasses = 'bg-gradient-to-r from-primary-500 to-primary-600 text-white';
  } else if (variant === 'secondary') {
    colorClasses = 'bg-gradient-to-r from-secondary-400 to-secondary-500 text-white';
  } else {
    colorClasses = 'bg-gradient-to-br from-white to-[#f5f5f5] text-gray-800';
  }

  // Animation for button states
  const [styles, api] = useSpring(() => ({
    transform: 'scale(1)',
    boxShadow: '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
    config: {
      tension: 300,
      friction: 20
    }
  }));

  // Update animation when state changes
  useEffect(() => {
    if (pressed) {
      api.start({
        transform: 'scale(0.98)',
        boxShadow: 'inset 3px 3px 10px #d1d9e6, inset -3px -3px 10px #ffffff'
      });
    } else if (hovered) {
      api.start({
        transform: 'scale(1.02)',
        boxShadow: '6px 6px 18px #d1d9e6, -6px -6px 18px #ffffff'
      });
    } else {
      api.start({
        transform: 'scale(1)',
        boxShadow: '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff'
      });
    }
  }, [hovered, pressed, api]);

  // Additional classes for neumorphic effect
  const neumorphicClasses = 
    variant !== 'primary' && variant !== 'secondary' 
      ? 'shadow-soft-md hover:shadow-soft-sm active:shadow-soft-inner' 
      : 'shadow-lg hover:shadow-xl';

  return (
    <animated.button 
      ref={ref}
      style={variant === 'neutral' ? styles : {}}
      className={`
        ${colorClasses}
        ${neumorphicClasses}
        relative
        overflow-hidden
        w-full
        font-medium py-3 px-6 rounded-xl
        transition-all duration-300
        border border-white/20
        before:content-['']
        before:absolute
        before:top-0
        before:left-[-100%]
        before:w-[100%]
        before:h-full
        before:bg-gradient-to-r
        before:from-white/0
        before:via-white/30
        before:to-white/0
        before:skew-x-[25deg]
        before:transition-all
        before:duration-700
        hover:before:left-[100%]
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </animated.button>
  );
});

NeumorphicButton.displayName = 'NeumorphicButton';

export default NeumorphicButton; 