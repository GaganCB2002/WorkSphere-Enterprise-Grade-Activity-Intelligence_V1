/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,jsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        headline: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
      },
      colors: {
        // Redefined pastel theme colors
        pastry: {
          primary: '#8B7CF6', // Soft Lavender
          'primary-light': '#7CC6FE', // Pastel Blue
          'blue-light': '#7CC6FE',
          'purple-light': '#8B7CF6',
          coral: '#FFBFA3', // Soft Peach
        },
        brand: '#8B7CF6',
        primary: '#8B7CF6',
        secondary: '#6B7280',
        tertiary: '#8EE3B5',
        'luxury-blue': '#7CC6FE',
        
        // Pastel named colors
        lavender: '#8B7CF6',
        'pastel-blue': '#7CC6FE',
        mint: '#8EE3B5',
        peach: '#FFBFA3',
        pink: '#F8B4D9',
        yellow: '#FFEAA7',
        
        // System / UI mappings using CSS variables for dark-mode toggleability
        background: 'var(--bg-main)',
        surface: 'var(--bg-surface)',
        outline: 'var(--border-main)',
        'outline-variant': 'var(--border-main)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
      },
      boxShadow: {
        premium: '0 20px 60px rgba(15, 23, 42, 0.05)',
        pastry: '0 8px 32px rgba(139, 124, 246, 0.12)',
        soft: '0 4px 20px rgba(139, 124, 246, 0.04)',
        warm: '0 8px 30px rgba(139, 124, 246, 0.08)',
      },
      backgroundImage: {
        'pastry-gradient': 'linear-gradient(135deg, #8B7CF6 0%, #7CC6FE 50%, #8EE3B5 100%)',
        'pastry-soft': 'linear-gradient(180deg, #F8FAFC 0%, #E2E8F0 100%)',
      },
    },
  },
  plugins: [],
}
