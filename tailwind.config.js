/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './App.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  important: 'html',
  safelist: [
    {
      pattern:
        /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background|indicator)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark|primary)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        // 라이트 모드 고정용 색상만 유지
        primary: {
          500: '#00AEEF',
        },
        secondary: {
          500: '#FFD74A',
        },
        background: {
          light: '#FBFBFB',
          dark: '#181719',
        },
        typography: {
          black: '#181718',
          white: '#FFFFFF',
          gray: '#D4D4D4',
        },
      },
      fontFamily: {
        jakarta: ['var(--font-plus-jakarta-sans)'],
        inter: ['var(--font-inter)'],
      },
      boxShadow: {
        'soft-1': '0px 0px 10px rgba(38, 38, 38, 0.1)',
      },
    },
  },
};
