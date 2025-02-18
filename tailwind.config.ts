import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './modals/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        main: '#F86969',
        default: '#FBA5A5',
        solid: '#FFF0F0',
        Cgray: '#F6F6F6',
        gray500: '#1C1616',
        gray400: '#575151',
        gray350: '#C0C0C0',
        gray300: '#E0DEDE',
        gray200: '#F2EFEF',
        gray100: '#FBFBFB',
        white: '#FFFFFF',
        black: '#000000',
        warning: '#FF4F4F',
        clear: '#00C48C',
        label1: '#BE52F2',
        label2: '#F1B424',
        label3: '#FFA26B',
        label4: '#0084F4',
        pressed: '#E45555'
      },
      screens: {
        md: '744px',
        desktop: '1280px'
      },
      dropShadow: {
        note: '0 0 20px rgba(0,0,0,0.04)'
      }
    }
  },
  plugins: []
} satisfies Config;
