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
        blue: {
          175: "#AFC9D6",
          225: "#94A2B8",
          475: "#5C7D8D",
          750: "#254E62",
          850: "#0D3A4F",
        },
        gray: {
          75: "#CBD5E1",
          125: "#D5DADC",
          250: "#A1A1AA",
          550: "#6A7377",
        },
        green: {
          125: "#E5F8EB",
          550: "#63B64E",
        },
        pink: {
          125: "#F4E0EB",
          225: "#FDC6E5",
          525: "#D64495",
        },
        red: {
          DEFAULT: "#EF4444",
        },
        white: {
          DEFAULT: "#FFFFFF",
          25: "#F1F1F1",
          50: "#F5FBFF",
          75: "#E9F7FF",
          125: "#fafafa",
          150: "#F1F5F9",
          175: "#DAE2E8",
        },
      },
      zIndex: {
        60: "60",
      },
      minWidth: {
        50: "200px",
      },
      borderWidth: {
        1.5: "1.5px",
      },
    },
  },
  plugins: [],
};
