module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#2b3437",
        secondary: "#40474e",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
