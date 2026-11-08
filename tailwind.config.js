/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0B2A4A', // logo navy: brand, buttons, dark bands
        lapis: '#0B2A4A', // links and focus on light (same navy)
        ink: '#0F1B2D', // body text
        steel: '#4F5A73', // secondary text
        muted: '#F3F7F7', // tinted section background
        accent: '#2EC4A9', // logo teal, brightened: buttons and marks on navy
        accentInk: '#00796B', // logo teal for text and marks on white (AA)
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
