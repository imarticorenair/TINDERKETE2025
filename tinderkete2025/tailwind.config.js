/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Asegúrate de incluir archivos JSX/TSX
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-animated'), // Asegúrate de que el plugin esté aquí
  ],
};
