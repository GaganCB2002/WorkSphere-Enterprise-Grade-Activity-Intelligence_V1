/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        pastry: {
          primary: '#4B49AC',
          'primary-light': '#98BDFF',
          'blue-light': '#7DA0FA',
          'purple-light': '#7978E9',
          coral: '#F3797E',
        },
        brand: '#4B49AC',
      },
      boxShadow: {
        premium: '0 30px 100px rgba(0, 0, 0, 0.5)',
        pastry: '0 8px 32px rgba(75, 73, 172, 0.15)',
      },
      backgroundImage: {
        'pastry-gradient': 'linear-gradient(135deg, #4B49AC 0%, #98BDFF 50%, #7DA0FA 100%)',
        'pastry-soft': 'linear-gradient(180deg, #f8f6ff 0%, #eef3ff 100%)',
      },
    },
  },
  plugins: [],
}
