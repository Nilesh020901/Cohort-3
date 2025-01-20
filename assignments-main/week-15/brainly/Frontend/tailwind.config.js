/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 'white': {
        //   100: '#FAF8FF',
        //   200: '#F9FBFC',
        // },
        'purple': {
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

