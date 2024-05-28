/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      backgroundImage: {
        line: "url('/line.webp')",
      },
      colors: {
        green: "#35FF69",
        purple: "#9A35FF",
        darkBg: "#121212",
        dark: "#1E1E1E",
        danger: "#D02323",
        gray: "#303030",
        lightGray: "#FAFAFA ",
      },
      screens: {
        "3xl": "1920px",
      },
      fontFamily: {
        poppins: ["'Poppins'", "sans-serif"],
        prompt: ["'Prompt'", "sans-serif"],
      },
    },
  },
  //plugins: [require("tailwind-scrollbar")],
};
