/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sp: {
          max: "1400px",
        },
        lg: {
          min: "1400px",
        },
      },
    },
  },
  plugins: [],
};