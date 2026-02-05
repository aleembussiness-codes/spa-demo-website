/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          teal: '#2C5F61',
          light: '#5C9EA0',
          dark: '#1e4042',
        },
        sand: {
          DEFAULT: '#E8DDD3',
          light: '#F8F6F3',
          dark: '#D4C5B9',
        },
        charcoal: {
          DEFAULT: '#2D3748',
          dark: '#1A202C',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
