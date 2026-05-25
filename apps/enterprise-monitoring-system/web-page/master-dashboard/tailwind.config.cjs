/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // enable class strategy
  theme: {
    extend: {
      colors: {
        primary: '#4B49AC',
        secondary: '#7978E9',
        success: '#7DA0FA',
      },
    },
  },
  plugins: [],
};
