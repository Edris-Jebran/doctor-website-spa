/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E5B52', // Scrub: operating-room drape green
        lapis: '#23408E', // Badakhshan lapis: links, focus on light
        ink: '#14211F', // body text
        steel: '#5B6B69', // secondary text
        muted: '#F4F7F6', // Ward: page background
        mint: '#9FE3D0', // focus ring on dark bands
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        arabic: ['"IBM Plex Sans Arabic"', '"IBM Plex Sans"', 'Tahoma', 'sans-serif'],
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
