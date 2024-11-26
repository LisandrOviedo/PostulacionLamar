/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#002846", // Color principal
        secondary: "#F0C95C", // Color secundario
        button: "#0053af",
        error: "#ff1a1a",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
