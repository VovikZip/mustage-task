/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/ui/**/*.{js,ts,jsx,tsx,css,html}',
  ],
  
  theme: {
    extend: {
      animation: {
        fadeOut: 'fadeOut 0.5s ease-in-out forwards',
      },
      keyframes: {
        fadeOut: {
          '0%, 83.33%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}


