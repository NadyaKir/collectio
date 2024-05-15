const withMT = require("@material-tailwind/html/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    backgroundImage: {
      "login-img": "url('./assets/stamps-img.jpg')",
    },
  },
});
