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
          primary: '#8B7CF6', // Soft Lavender
          'primary-light': '#7CC6FE', // Pastel Blue
          'blue-light': '#7CC6FE',
          'purple-light': '#8B7CF6',
          coral: '#FFBFA3', // Soft Peach
        },
        brand: '#8B7CF6',
      },
      boxShadow: {
        premium: '0 30px 100px rgba(0, 0, 0, 0.1)',
        pastry: '0 8px 32px rgba(139, 124, 246, 0.12)',
      },
      backgroundImage: {
        'pastry-gradient': 'linear-gradient(135deg, #8B7CF6 0%, #7CC6FE 50%, #8EE3B5 100%)',
        'pastry-soft': 'linear-gradient(180deg, #F8FAFC 0%, #E2E8F0 100%)',
      },
    },
  },
  plugins: [],
}
