/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: {
          100: "#E0F2FE", 
          200: "#B9E5FB",
          300: "#7CD5FB",
        },
        splash: "#0b8fac",
      },
    },
  },
  plugins: [],
} 