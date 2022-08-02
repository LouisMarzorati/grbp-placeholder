/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6ee7b7',
        primaryHover: '#5dd6a6',
        secondary: '#F000B8',
        secondaryHover: '#E000A7',
        accent: '#37CDBE',
        accentHover: '#2ECC71',
        neutral: '#3D4451',

        'base-100': '#FFFFFF',

        info: '#3ABFF8',
        infoHover: '#2AA8E6',
        success: '#36D399',
        successHover: '#24B981',
        warning: '#FBBD23',
        warningHover: '#F9B822',
        error: '#F87272',
        errorHover: '#F7616C',
      },
    },
  },
  plugins: [],
}
