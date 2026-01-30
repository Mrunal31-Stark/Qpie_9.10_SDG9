/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1e40af',
        'primary-dark': '#1e3a8a',
        'secondary': '#2563eb',
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
        'gradient-blue-dark': 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1e40af 100%)',
      }
    },
  },
  plugins: [],
}
