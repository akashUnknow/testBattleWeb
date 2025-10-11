// tailwind.config.js
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.js",
    "./src/components/HeroUI/**/*.{js,jsx,ts,tsx}",
    "./src/Layouts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8",
        secondary: "#9333ea",
        dark: "#111827",
        light: "#f9fafb",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
