/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,jsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
      },
      colors: {
        // Modern Enterprise Theme
        pastry: {
          primary: '#0052CC', // Trusted Blue
          'primary-light': '#0065FF', // Bright Blue
          'blue-light': '#E6F0FF',    // Light Blue bg
          'purple-light': '#6554C0',  // Muted Purple
          coral: '#008DA6', // Deep Cyan
        },
        brand: '#0052CC', // Primary Brand Blue
        primary: '#0052CC',
        secondary: '#42526E', // Slate Gray text
        tertiary: '#008DA6', 
        'luxury-blue': '#F4F5F7', // Very Light Gray background
        
        // Semantic minimalist colors
        lavender: '#6554C0',
        'pastel-blue': '#0065FF',
        mint: '#36B37E', // Success Green
        peach: '#FFAB00', // Warning Yellow
        pink: '#FF5630', // Danger Red
        yellow: '#FFC400',
        
        // System / UI mappings using CSS variables for dark-mode toggleability
        background: '#FFFFFF',
        surface: '#FFFFFF',
        outline: '#DFE1E6',
        'outline-variant': '#EBECF0',
        'text-primary': '#172B4D', // Dark Blue/Black
        'text-secondary': '#5E6C84', // Gray
      },
      boxShadow: {
        premium: '0 8px 16px rgba(9, 30, 66, 0.08), 0 0 1px rgba(9, 30, 66, 0.31)',
        pastry: '0 3px 8px rgba(9, 30, 66, 0.08), 0 0 1px rgba(9, 30, 66, 0.31)',
        soft: '0 1px 1px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)',
        warm: '0 4px 8px rgba(9, 30, 66, 0.08), 0 0 1px rgba(9, 30, 66, 0.31)',
        'glow': '0 0 0 2px rgba(0, 82, 204, 0.2)',
        'glow-accent': '0 0 0 2px rgba(0, 101, 255, 0.3)',
      },
      backgroundImage: {
        'pastry-gradient': 'linear-gradient(135deg, #0052CC 0%, #0065FF 100%)',
        'pastry-soft': 'linear-gradient(180deg, #FFFFFF 0%, #F4F5F7 100%)',
      },
    },
  },
  plugins: [],
}
