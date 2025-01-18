/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: {
          500: '#434343',
          600: '#383838',
          700: '#333333',
          800: '#262626',
          900: '#1A1A1A',
        },
        yellow: {
          800: '#FFB700',
          900: '#FFAC32',
        },
        cyan: {
          900: '#1CBBBA',
        },
        red: {
          900: '#F53837',
        },
        green: {
          900: '#049727',
        },
      }
    },
  },
  plugins: [],
}

