import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
  },
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: '#df3ca6',
          secondary: '#7430f9',
          error: '#e90505',
          neutral: '#eee',
        },
      },
    ],
  },
  plugins: [daisyui],
};
