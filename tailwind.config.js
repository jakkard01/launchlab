/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        glow: 'soft-glow 4s ease-in-out infinite',
      },
      keyframes: {
        'soft-glow': {
          '0%, 100%': { boxShadow: '0 0 32px 0 #00ffd8, 0 0 0 0 #00ffd8' },
          '50%': { boxShadow: '0 0 64px 8px #00ffd8, 0 0 0 0 #00ffd8' },
        },
      },
    },
  },
  plugins: [],
}
