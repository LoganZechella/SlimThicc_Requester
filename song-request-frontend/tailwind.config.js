/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#f3e5f5',
          200: '#e1bee7',
          300: '#ce93d8',
          400: '#ba68c8',
          500: '#ab47bc',
          600: '#9c27b0',
          700: '#8e24aa',
          800: '#7b1fa2',
          900: '#6a1b9a',
        },
        secondary: {
          100: '#e8eaf6',
          200: '#c5cae9',
          300: '#9fa8da',
          400: '#7986cb',
          500: '#5c6bc0',
          600: '#3f51b5',
          700: '#3949ab',
          800: '#303f9f',
          900: '#283593',
        },
        accent: {
          100: '#ffe0f0',
          200: '#ffb1d8',
          300: '#ff7eb6',
          400: '#ff4993',
          500: '#ff1a75',
          600: '#e6005e',
          700: '#b30047',
          800: '#80002f',
          900: '#4d001c',
        },
      },
      boxShadow: {
        'soft-sm': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        'soft-md': '10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff',
        'soft-lg': '15px 15px 30px #d1d9e6, -15px -15px 30px #ffffff',
        'soft-inner': 'inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #ffffff',
      },
      backdropBlur: {
        'xs': '2px',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['active', 'disabled'],
      ringWidth: ['focus', 'hover'],
      transform: ['hover', 'active'],
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'djrequester': {
          'primary': '#ab47bc',          // Purple
          'primary-focus': '#8e24aa',    // Darker purple
          'primary-content': '#ffffff',  // White text on primary
          'secondary': '#ff4993',        // Pink
          'secondary-focus': '#e6005e',  // Darker pink
          'secondary-content': '#ffffff',// White text on secondary
          'accent': '#5c6bc0',           // Blue-ish
          'accent-focus': '#3949ab',     // Darker blue-ish
          'accent-content': '#ffffff',   // White text on accent
          'neutral': '#3d4451',          // Dark gray
          'neutral-focus': '#2a2e37',    // Darker gray
          'neutral-content': '#ffffff',  // White text on neutral
          'base-100': '#f5f5f5',         // Nearly white
          'base-200': '#e9ecef',         // Light gray
          'base-300': '#d1d9e6',         // Medium light gray
          'base-content': '#1f2937',     // Dark text
          'info': '#2094f3',             // Info blue
          'success': '#009485',          // Success green
          'warning': '#ff9900',          // Warning orange
          'error': '#ff5724',            // Error red
        },
      },
    ],
  },
}

