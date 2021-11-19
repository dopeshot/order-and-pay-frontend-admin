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
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 3px 20px 12px rgba(171, 171, 171, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
    extend: {
      colors: {
        'primary-blue': '#0967D2',
        'headline-black': '#1F2933',
        'white-lightgrey': '#F5F7FA',
        'hr-grey': '#E4E7EB',
        'checkbox-grey': '#E0E6EE',
        'lightgrey': '#9AA5B1',
        'darkgrey': '#52606D',
        'active-grey': "#E8EEF5"
      },
    },
  },
  plugins: [],
}
