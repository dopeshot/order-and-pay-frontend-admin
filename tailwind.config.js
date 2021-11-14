module.exports = {
  purge: [],
  // MC: In production purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        md: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    fontFamily: {
      'sofia': ['Sofia Pro', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif']
    },
    extend: {
      colors: {
        'primary-blue': '#0967D2',
        'headline-black': '#1F2933',
        'white-lightgrey': '#F5F7FA',
        'hr-grey': '#E4E7EB',
        'checkbox-grey': '#E0E6EE',
        'lightgrey': '#9AA5B1',
        'darkgrey': '#52606D'
      },
    },
  },
  plugins: [],
}
