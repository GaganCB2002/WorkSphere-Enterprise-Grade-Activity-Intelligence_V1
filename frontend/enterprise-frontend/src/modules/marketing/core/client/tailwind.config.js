/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0eeff',
          100: '#e0ddfd',
          200: '#c1bbfb',
          300: '#a299f9',
          400: '#8377f7',
          500: '#4B49AC',
          600: '#3d3b8f',
          700: '#2f2d72',
          800: '#212055',
          900: '#131238',
        },
        dark: {
          bg: '#1a1930',
          card: '#242344',
          border: '#363456',
          text: '#f0eef8',
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
