/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './includes/**/*.{html,js}',
    './pages/**/*.{html,js}',
    './projects/**/*.{html,js}',
  ],
  theme: {
    extend: {
      fontSize: {
        clamp0to3xl: 'clamp(1rem, 0.5625rem + 1.0938vw, 1.875rem)',
        clamp1to2xl: 'clamp(1.25rem, 0.9643rem + 0.4464vw, 1.5rem)',
        clamp3to4xl: 'clamp(1.875rem, 1.7045rem + 0.8523vw, 2.25rem)',
        clamp4to6xl: 'clamp(2.25rem, 1.25rem + 1.5625vw, 3.75rem)',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
}
