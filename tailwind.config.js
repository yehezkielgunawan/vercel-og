// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        primary: ["Fira Sans", ...fontFamily.sans],
      },
      colors: {
        primary: {
          50: "#91ffff",
          100: "#87ffff",
          200: "#7dffff",
          300: "#73ffff",
          400: "#69fffb",
          500: "#5ffbf1",
          600: "#55f1e7",
          700: "#4be7dd",
          800: "#41ddd3",
          900: "#37d3c9",
        },
        dark: "#222222",
        pink: {
          50: "#ff9dd7",
          100: "#f993cd",
          200: "#ef89c3",
          300: "#e57fb9",
          400: "#db75af",
          500: "#d16ba5",
          600: "#c7619b",
          700: "#bd5791",
          800: "#b34d87",
          900: "#a9437d",
        },
        secondary: {
          50: "#b8daff",
          100: "#aed0ff",
          200: "#a4c6ff",
          300: "#9abcfb",
          400: "#90b2f1",
          500: "#86a8e7",
          600: "#7c9edd",
          700: "#7294d3",
          800: "#688ac9",
          900: "#5e80bf",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
