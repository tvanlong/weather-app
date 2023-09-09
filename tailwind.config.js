/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textShadow: {
        '3xl': '2px 2px rgba(0, 0, 0, 0.5)',
        '4xl': '4px 4px rgba(0, 0, 0, 0.6)'
      }
    }
  },
  plugins: [require('tailwindcss-textshadow')]
}
