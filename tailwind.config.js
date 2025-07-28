/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customblue: {
          DEFAULT: '#6ab6ce',
          light: '#8fd0e2',
          dark: '#4693a9',
        },
      },
    },
  },
  plugins: [],
};
