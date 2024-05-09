/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    backgroundImage: {
      "login-img": "url('./assets/stamps-img.jpg')",
    },
  },
};
