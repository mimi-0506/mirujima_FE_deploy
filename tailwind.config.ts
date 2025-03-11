import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './modals/**/*.{js,ts,jsx,tsx,mdx}',
    './constant/*.{js,ts,jsx,tsx,mdx}'
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
        Gray500: '#AAABB3',
        gray900: '#1A1A1C',
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
        pressed: '#E45555',
        lightLabel1: '#EBCBFB',
        lightLabel4: '#A8D2F5',
        lightGray400: '#B3B3B3'
      },
      screens: {
        md: '744px',
        desktop: '1280px'
      },
      dropShadow: {
        note: '0 0 20px rgba(0,0,0,0.04)'
      },
      fontSize: {
        head2: ['22px', { lineHeight: '28px', fontWeight: 600 }],
        head3: ['17px', { lineHeight: '22px', fontWeight: 600 }],
        button1: ['16px', { lineHeight: '22px', fontWeight: 600 }],
        button2: ['14px', { lineHeight: '16px', fontWeight: 500 }],
        body1: ['15px', { lineHeight: '20px', fontWeight: 500 }],
        body2: ['13px', { lineHeight: '18px', fontWeight: 400 }],
        small: ['11px', { lineHeight: '13px', fontWeight: 500 }]
      },
      animation: {
        tomatofill: 'tomatofill 2s infinite ease-in-out',
        tomatogradation: 'tomatogradation 2s infinite',
        confetti: 'confettiAnimation 3s infinite ease-in-out',
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        modalContent: 'modalContent 0.3s ease-out forwards'
      },
      keyframes: {
        tomatofill: {
          '0%': { height: '0%' },
          '50%': { height: '100%' },
          '100%': { height: '0%' }
        },
        tomatogradation: {
          '0%': {
            backgroundColor: 'transparent'
          },
          '50%': {
            backgroundColor: '#F86969'
          },
          '100%': {
            backgroundColor: 'transparent'
          }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        modalContent: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        confettiAnimation: {
          '0%': {
            transform: 'translate3d(0vw, -10vh, 0) scale(1) rotate(0deg)' // 위에서 시작
          },
          '100%': {
            transform: 'translate3d(10vw, 170vh, 0) scale(1) rotate(720deg)' // 아래로 떨어지고, 화면 밖에서 사라짐
          }
        }
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
} satisfies Config;
