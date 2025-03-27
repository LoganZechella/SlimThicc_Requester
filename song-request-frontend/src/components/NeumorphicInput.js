import React, { forwardRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const NeumorphicInput = forwardRef(({ 
  className = '', 
  label, 
  error,
  ...props 
}, ref) => {
  const [focused, setFocused] = React.useState(false);
  
  // Animation for focus state
  const [styles, api] = useSpring(() => ({
    boxShadow: 'inset 3px 3px 7px #d1d9e6, inset -3px -3px 7px #ffffff',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    config: {
      tension: 300,
      friction: 40
    }
  }));

  // Update animation when focus state changes
  useEffect(() => {
    api.start({
      boxShadow: focused
        ? 'inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff'
        : 'inset 3px 3px 7px #d1d9e6, inset -3px -3px 7px #ffffff',
      borderColor: focused
        ? 'rgba(171, 71, 188, 0.5)' // primary-500 with transparency
        : 'rgba(255, 255, 255, 0.2)'
    });
  }, [focused, api]);

  return (
    <div className="w-full mb-4">
      {label && (
        <label 
          htmlFor={props.id} 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <animated.input
          ref={ref}
          style={styles}
          className={`
            w-full bg-white/70
            rounded-xl px-4 py-3
            focus:outline-none
            border border-white/20
            transition-all duration-300
            ${error ? 'ring-2 ring-red-500' : ''}
            ${className}
          `}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {focused && (
          <div className="absolute inset-0 rounded-xl pointer-events-none ring-2 ring-primary-300/50"></div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 animate-pulse">{error}</p>
      )}
    </div>
  );
});

NeumorphicInput.displayName = 'NeumorphicInput';

export default NeumorphicInput; 