/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary-fixed-variant": "#8a4518",
        "primary-fixed": "#fbe8d8",
        "tertiary-fixed-dim": "#e8a0a0",
        "tertiary-fixed": "#fce0e0",
        "secondary-fixed-dim": "#cec6be",
        "on-secondary": "#ffffff",
        "primary-container": "#e08850",
        "on-secondary-fixed": "#2a2420",
        "surface-container-high": "#ece6dc",
        "on-surface-variant": "#605850",
        "background": "#FAF6F0",
        "surface-container-highest": "#e6e0d6",
        "on-secondary-fixed-variant": "#504840",
        "error-container": "#fce4e0",
        "outline-variant": "#EFE6DD",
        "inverse-primary": "#f0a878",
        "on-error-container": "#7a1a10",
        "surface-tint": "#C2652A",
        "on-error": "#ffffff",
        "secondary": "#78706a",
        "on-primary": "#ffffff",
        "surface-container-low": "#FFFFFF",
        "secondary-fixed": "#eae2da",
        "surface-dim": "#dcd6cc",
        "surface-container": "#F5EFEB",
        "on-tertiary-container": "#3a2020",
        "on-primary-container": "#fbe8d8",
        "inverse-surface": "#2B221E",
        "tertiary": "#8c3c3c",
        "surface-bright": "#FAF6F0",
        "tertiary-container": "#d47070",
        "on-secondary-container": "#605850",
        "surface": "#FAF6F0",
        "on-tertiary-fixed": "#2e1515",
        "secondary-container": "#eae2da",
        "primary": "#C2652A",
        "outline": "#9a9088",
        "on-tertiary-fixed-variant": "#6e3030",
        "on-primary-fixed": "#401a08",
        "surface-container-lowest": "#ffffff",
        "surface-variant": "#ece6dc",
        "on-tertiary": "#ffffff",
        "on-surface": "#3a302a",
        "error": "#c0392b",
        "on-background": "#3a302a",
        "primary-fixed-dim": "#f0a878",
        "inverse-on-surface": "#faf5ee"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["EB Garamond", "serif"],
        "display": ["EB Garamond", "serif"],
        "body": ["Manrope", "sans-serif"],
        "label": ["Manrope", "sans-serif"]
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(58, 48, 42, 0.04)',
      }
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries")
  ],
}
