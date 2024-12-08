/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors:{
        'taxi-blue': '#57A3EF',
        'taxi-to-color':'#CAE2FA',
        'warning-red':'#f0291a'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

