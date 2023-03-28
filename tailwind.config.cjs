/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1250px',
    },
    extend: {
      keyframes: {
        skeleton: {
          '0%': { left: '-200%' },
          '100%': { left: '100%' },
        },
      },
      animation: {
        skeleton: 'skeleton 0.8s linear infinite',
      },
      colors: {
        basic: '#151647',
        disabledColor: '#FBFBFF',
        accent: '#ed706a',
        secondary: '#9494B0',
        secondaryAlternative: '#8A9098',
        basicLight: '#F6F6FB',
        white: '#FFFFFF',
        black: '#000',
        successStatus: '#34AC7F',
        successStatusLight: '#E5F5EF',
        accentLight: '#FCE7E6',
        infoLight: '#DDEBFF',
        secondaryLight: '#CFCFE0',
        gray: '#C2C2C2',
        'gray-100': '#F9F9F9',
        'gray-200': '#F3F3F4',
        lightGray: '#E7E7ED',
        inherit: 'inherit',
      },
      boxShadow: {
        'gray-500': '0px 0px 30px 0px rgba(148, 148, 176, 0.2)'
      },
    },
    fontFamily: {
      montserrat: ['Montserrat', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont'],
      roboto: ['Roboto', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont'],
    },
  },
  plugins: [],
}
