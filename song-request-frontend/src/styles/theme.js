import { createGlobalStyle } from 'styled-components';

// Global styles for our app
export const GlobalStyles = createGlobalStyle`
  body {
    background: linear-gradient(135deg, #f5f5f5 0%, #e9ecef 100%);
    min-height: 100vh;
  }
`;

// Glass card effect
export const glassCardStyles = {
  background: "rgba(255, 255, 255, 0.25)",
  backdropFilter: "blur(10px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
};

// Neumorphic styles for buttons and inputs
export const neumorphicStyles = {
  button: {
    boxShadow: "5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff",
    background: "linear-gradient(145deg, #e6e6e6, #ffffff)",
    border: "none",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    hover: {
      boxShadow: "3px 3px 10px #d1d9e6, -3px -3px 10px #ffffff",
      transform: "translateY(1px)",
    },
    active: {
      boxShadow: "inset 3px 3px 10px #d1d9e6, inset -3px -3px 10px #ffffff",
    }
  },
  input: {
    background: "#f5f5f5",
    boxShadow: "inset 3px 3px 7px #d1d9e6, inset -3px -3px 7px #ffffff",
    border: "none",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    focus: {
      boxShadow: "inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff",
    }
  }
};

// Animation constants
export const animationConfig = {
  default: {
    tension: 170,
    friction: 26
  },
  slow: {
    tension: 140,
    friction: 30
  },
  wobbly: {
    tension: 180,
    friction: 12
  },
  stiff: {
    tension: 210,
    friction: 20
  }
};

// Color palette
export const colors = {
  primary: {
    main: '#ab47bc',
    light: '#ce93d8',
    dark: '#8e24aa',
  },
  secondary: {
    main: '#ff4993',
    light: '#ff7eb6',
    dark: '#e6005e',
  },
  neutral: {
    white: '#ffffff',
    light: '#f5f5f5',
    medium: '#e9ecef',
    dark: '#3d4451',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #ce93d8 0%, #ab47bc 100%)',
    secondary: 'linear-gradient(135deg, #ff7eb6 0%, #ff4993 100%)',
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
    card: 'linear-gradient(145deg, #f5f5f5, #e9ecef)',
  }
};

// Tailwind CSS utility class collections for quick use
export const utilityClasses = {
  glassCard: 'bg-white/25 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg',
  neumorphicCard: 'bg-gradient-to-br from-[#f5f5f5] to-[#e9ecef] shadow-soft-md rounded-xl',
  neumorphicButton: 'shadow-soft-md hover:shadow-soft-sm active:shadow-soft-inner transition-all duration-300 bg-gradient-to-br from-white to-[#f5f5f5] rounded-xl',
  primaryButton: 'bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300',
  secondaryButton: 'bg-secondary-400 hover:bg-secondary-500 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300',
  gradientText: 'text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 font-bold',
  inputField: 'shadow-soft-inner bg-[#f5f5f5] rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-300',
}; 