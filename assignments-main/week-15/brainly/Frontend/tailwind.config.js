/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': {
          500: '#FFFFFF',
        },
        'purple': {
          100: '#6267F5',
          200: '#EFF1FE',
          300: '#463EBC',
          400: '#463AC5',
          500: '#E0E7FF',
          600: '#5046E4',
          700: '#4F44C6',
        },
      },
    },
  },
  plugins: [],
}

