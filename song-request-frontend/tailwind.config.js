/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#ab47bc',
          600: '#9c27b0'
        },
        secondary: {
          400: '#ff4993',
          500: '#e6005e'
        }
      }
    },
  },
  plugins: [],
}

