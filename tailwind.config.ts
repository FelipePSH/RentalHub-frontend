import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blaze-orange': {
          50: '#fff8ec',
          100: '#ffefd3',
          200: '#ffdaa5',
          300: '#ffbf6d',
          400: '#ff9832',
          500: '#ff790a',
          600: '#ff6000',
          700: '#cc4402',
          800: '#a1350b',
          900: '#822e0c',
          950: '#461404',
        },
        'cod-gray': {
          '50': '#f7f7f6',
          '100': '#e6e3e1',
          '200': '#ccc7c3',
          '300': '#aaa49e',
          '400': '#888179',
          '500': '#6d685f',
          '600': '#56524b',
          '700': '#47433e',
          '800': '#3b3834',
          '900': '#33312e',
          '950': '#161513',
          '1000': '#1f1d1b',
      },
        pampas: {
          50: '#f8f7f3',
          100: '#f0eee4',
          200: '#dfdac9',
          300: '#cbc2a6',
          400: '#b5a582',
          500: '#a5906a',
          600: '#98805e',
          700: '#7f694f',
          800: '#685644',
          900: '#554739',
          950: '#2d251d',
        },
        'teste': {
          50: "f8f7f3",
        },
      text: {
        DEFAULT: "#FAFBFC",
        lighter: "#F3F4F6"
      }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')],
};

export default config;
