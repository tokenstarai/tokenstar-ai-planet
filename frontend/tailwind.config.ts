import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // 使用 class 策略（html.dark）
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        dark: {
          900: '#0a0a0f',
          800: '#111118',
          700: '#1a1a2e',
          600: '#16213e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // 中文优化字号体系（在 Tailwind 默认值基础上整体上调）
        'xs':   ['0.8125rem',  { lineHeight: '1.5' }],   // 13px（原12px）
        'sm':   ['0.9375rem',  { lineHeight: '1.65' }],  // 15px（原14px）
        'base': ['1.0625rem',  { lineHeight: '1.75' }],  // 17px（原16px）
        'lg':   ['1.1875rem',  { lineHeight: '1.7' }],   // 19px（原18px）
        'xl':   ['1.3125rem',  { lineHeight: '1.65' }],  // 21px（原20px）
        '2xl':  ['1.5625rem',  { lineHeight: '1.5' }],   // 25px（原24px）
        '3xl':  ['1.9375rem',  { lineHeight: '1.35' }],  // 31px（原30px）
        '4xl':  ['2.3125rem',  { lineHeight: '1.2' }],   // 37px（原36px）
        '5xl':  ['3rem',       { lineHeight: '1.1' }],   // 48px（不变）
        '6xl':  ['3.75rem',    { lineHeight: '1' }],     // 60px（不变）
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
      },
    },
  },
  plugins: [],
}
export default config
