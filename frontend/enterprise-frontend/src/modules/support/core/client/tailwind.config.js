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
          50: '#eeedfc',
          100: '#dcdbf9',
          200: '#b9b7f3',
          300: '#9693ed',
          400: '#736fe7',
          500: '#4B49AC',
          600: '#3d3b8f',
          700: '#2f2d72',
          800: '#212055',
          900: '#131238',
        },
        dark: {
          50: '#1a1a24',
          100: '#12121a',
          200: '#0a0a0f',
          300: '#08080c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(75, 73, 172, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
