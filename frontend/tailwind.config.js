/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#172B49',
          dark: '#0E1C30',
          light: '#233F68',
        },
        cream: {
          DEFAULT: '#F8F0EB',
          light: '#FDFBF9',
          dark: '#EDE0D7',
        },
        offwhite: '#FFFDFC',
        burgundy: '#672E46',
        'muted-pink': '#DDA6B3',
        charcoal: '#252525',
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

