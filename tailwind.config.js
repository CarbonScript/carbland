/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{tsx,jsx,ejs}'],
  safelist: [
    {
      pattern: /.*/,
    },
  ],
  prefix: 'tw-',
  theme: {
    extend: {},
  },
  plugins: [],
};
