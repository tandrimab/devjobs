/** @type {import('tailwindcss').Config} */
 
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        100: '100px'
      },
      backgroundImage: {
        trianglePattern: "url('/assets/logos/Triangle.svg')"
      }
    },
    fontFamily: {
      'bold': ['Kumbh sans_bold'],
      'extraBold': ['Kumbh sans_extraBold'],
      'medium': ['Kumbh sans_medium'],
      'thin': ['Kumbh sans_thin'],
      'semiBold': ['Kumbh sans_semiBold']
    },
    fontSize: {
      base: ['1rem', {
        lineHeight: '1.625rem',
        fontWeight: 400,
      }],
      sm: ['0.875rem', {
        lineHeight: '1.125rem',
        fontWeight: 300,
      }],
      '3xl': ['1.75rem', {
        lineHeight: '2.125rem',
        fontWeight: 600,
      }],
      '2xl': ['1.5rem', {
        lineHeight: '1.8125rem',
        fontWeight: 500,
      }],
      xl: ['1.25rem', {
        lineHeight: '1.5rem',
        fontWeight: 400,
      }],
    },
    colors: {
      violet: '#9e7f66',
      white: '#FFFFFF',
      lightViolet: '#939BF4',
      lightGrey: '#F4F6F8',
      veryDarkBlue: '#19202D',
      veryLightBlue: 'rgba(25, 32, 45, 0.1035)',
      grey: '#9DAEC2',
      midnight: '#121721',
      darkGrey: '#6E8098',
      veryLightGrey: 'rgba(110, 128, 152, 0.2)',
      lightBlue: '#5964E0',
      btnLight: '#C9C9C9',
      btnDark: 'rgba(89, 100, 224, 1)',
      btnDarkHover: '#939BF4',
      btnLightHover: 'rgba(89, 100, 224, 0.35)',
      btnVeryLight: 'rgba(89, 100, 224, 0.1)',

    },
    opacity: {
      1: '0.1',
      10: '0.1035',
      25: '0.25',
      35: '0.35',
      5: '0.5'
    }
  },
  plugins: [],
}
