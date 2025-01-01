/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      logo: ["Rubik Vinyl", "serif"],
      logo2: "Agu Display",
    },
    extend: {
      colors: {
        primary: "#3490dc",
        secondary: "#f1c40f",
        danger: "#e74c3c",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

