/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '320px',  // Extra Small screens
      'sm': '640px',  // Small screens
      'md': '768px',  // Medium screens
      'lg': '1024px', // Large screens
      'xl': '1280px', // Extra Large screens
    },
  },
  plugins: [],
}

