/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A', // deep navy
        accent: '#0BB5A7',  // modern teal accent
        muted: '#F6F8FB',   // soft background
        ink: '#1F2937'      // readable gray/black
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
