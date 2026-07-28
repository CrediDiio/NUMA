/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bone: '#F5F2EB',
        ink: {
          DEFAULT: '#1A1816',
          soft: '#6E6A63',
        },
        clay: '#C2593F',
        card: '#EDE8DF',
        line: '#E2DDD3',
        graphite: '#3B3835',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      letterSpacing: {
        label: '0.15em',
        wideish: '0.06em',
      },
      transitionTimingFunction: {
        knot: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      maxWidth: {
        page: '80rem',
      },
    },
  },
  plugins: [],
};