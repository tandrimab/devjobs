/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
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
