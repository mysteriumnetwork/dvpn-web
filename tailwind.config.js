/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          main: "#3C3857",
          secondary: "#5A597D",
        },
        dark: {
          main: "#F6F6FA",
          secondary: "#9090BB",
        },

        primary: "#d61f85",
        primaryLight: "#ed5bac",
        purple: {
          300: "#9090BB", // colorGrayBlue
          500: "#5A597D", // colorGrayBlue2
        },
      },
    },
  },
  plugins: [],
};
