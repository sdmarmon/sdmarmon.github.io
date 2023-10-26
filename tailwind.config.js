/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'betterhover': {'raw': '(hover: hover)'},
    }
    },
  },
  plugins: [],
}

