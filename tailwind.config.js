
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        darkTeal: '#074f57',
        cerulean: '#077187',
        mutedTeal: '#74a57f',
        celadon: '#9ece9a',
        desertSand: '#e4c5af',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
