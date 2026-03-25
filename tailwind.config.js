/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(56,189,248,0.2), 0 8px 30px rgba(14,165,233,0.12)'
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(148,163,184,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.09) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
