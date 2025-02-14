/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'bounce-sm': 'bounce 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
