/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1F3A93', // Badakhshan lapis: brand, buttons, dark bands
        lapis: '#1F3A93', // links and focus on light (same lapis)
        ink: '#121A33', // body text
        steel: '#4F5A73', // secondary text
        muted: '#F5F7FC', // page background
        gold: '#E0B341', // accent: small marks, focus ring on dark bands
        goldInk: '#7A5A00', // gold-family text on white (AA)
      },
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', 'sans-serif'],
        arabic: ['Vazirmatn', 'Tahoma', 'sans-serif'],
      },
      fontSize: {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.25rem',
        xl: '1.5625rem',
        '2xl': '1.9375rem',
        '3xl': '2.4375rem',
      },
      maxWidth: {
        measure: '70ch',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
