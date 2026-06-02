/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        cursor: 'cursor 1s steps(2, start) infinite'
      },
      keyframes: {
        cursor: {
          '0%, 45%': { opacity: '1' },
          '46%, 100%': { opacity: '0' }
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(124,58,237,0.20), 0 18px 55px rgba(124,58,237,0.18)'
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(168,85,247,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.10) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
