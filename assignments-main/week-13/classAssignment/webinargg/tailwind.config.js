/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: '#002B5B',
        green: '#41E5D3',
        white: '#F9FAFB',
        gray: '#9DADBF',
        lightblue: '#19406A',
        lightgray: '#49678A',
        btngray: '#7F95AC',
      },
    },
  },
  plugins: [],
}
