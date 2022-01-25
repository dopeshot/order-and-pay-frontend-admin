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
      dropdown: '-10px 10px 10px rgba(171, 171, 171, 0.15), 10px 10px 10px rgba(171, 171, 171, 0.15)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      'focus': '0 0 0 0.25rem rgba(5, 82, 181, 0.3)'
    },
    extend: {
      colors: {
        'primary-blue': '#0967D2',
        'primary-blue-hover': '#0552B5',
        'primary-blue-hover-icon': '#47A3F3',
        'secondary-blue': '#C5E0FB',
        'secondary-blue-hover': '#BDD4F0',
        'dark-blue': "#03449E",
        'headline-black': '#1F2933',
        'white-lightgrey': '#F5F7FA',
        'border-grey': '#E4E7EB',
        'checkbox-grey': '#E0E6EE',
        'lightgrey': '#9AA5B1',
        'darkgrey': '#52606D',
        'active-grey': "#E8EEF5",
        'modal-bg-blue': '#132144',
        'danger-red': '#EF4E4E',
        'dark-danger-red': '#CF1124',
        'darker-danger-red': '#AB091E'
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['group-focus'],
      borderColor: ['group-focus']
    }
  },
  plugins: [],
}
