/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'surface': '#101415',
        'surface-container-low': '#191c1e',
        'surface-container': '#1d2022',
        'surface-container-high': '#272a2c',
        'surface-container-highest': '#323537',
        'surface-variant': '#323537',
        'on-surface': '#e0e3e5',
        'on-surface-variant': '#c2c6d4',
        'outline': '#8c909e',
        'outline-variant': '#424752',
        'primary': '#acc7ff',
        'primary-container': '#0056b3',
        'secondary-fixed': '#74f5ff',
        'secondary-fixed-dim': '#00dbe7',
        'secondary-container': '#00f1fe',
        'error': '#ffb4ab',
        'error-container': '#93000a',
        'background': '#101415',
        'on-background': '#e0e3e5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
