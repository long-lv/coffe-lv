/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow : ['"Barlow Condensed"','sans-serif']
      },
      colors : {
        primary : '#16405B'
      }
    },
  },
  plugins: [],
}

