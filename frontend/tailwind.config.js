/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cytric: {
          900: "#093545",
          800: "#092C39",
          600: "#2BD17E",
          500: "#224957",
        },
      },
    },
  },
  plugins: [],
};
