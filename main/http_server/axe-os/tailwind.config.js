/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-family)', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: 'var(--primary-color)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
