/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#f9ba1a',
          DEFAULT: '#d4af37',
          dark: '#8c7f5f',
        },
        dark: {
          DEFAULT: '#181611',
          light: '#2d2b22',
        }
      },
      fontFamily: {
        'lexend': ['Lexend', 'sans-serif'],
        'noto': ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};