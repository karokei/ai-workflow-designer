/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Mika Core Palette
        mika: {
          p50:  '#eef2ff',
          p100: '#e0e7ff',
          p200: '#c7d2fe',
          p300: '#a5b4fc',
          p400: '#818cf8',
          p500: '#6366f1',
          p600: '#4f46e5',
          p700: '#4338ca',
          p800: '#3730a3',

          a50:  '#ecfdf5',
          a500: '#10b981',
          a600: '#059669',
          a700: '#047857',

          am50:  '#fffbeb',
          am600: '#d97706',

          r50:  '#fff1f2',
          r600: '#e11d48',

          v50:  '#f5f3ff',
          v600: '#7c3aed',

          t50:  '#f0fdfa',
          t600: '#0d9488',

          n0:   '#ffffff',
          n50:  '#f8fafc',
          n100: '#f1f5f9',
          n200: '#e2e8f0',
          n300: '#cbd5e1',
          n400: '#94a3b8',
          n500: '#64748b',
          n600: '#475569',
          n700: '#334155',
          n800: '#1e293b',
          n900: '#0f172a',
        },
        // Semantic Custom Properties mapping
        bg: {
          DEFAULT: 'var(--bg)',
          base: 'var(--bg)',
          card: 'var(--bg-card)',
          secondary: 'var(--bg-secondary)',
        },
        border: {
          DEFAULT: 'var(--border)',
          base: 'var(--border)',
          light: 'var(--border-light)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          // short aliases
          pri: 'var(--text-primary)',
          sec: 'var(--text-secondary)',
          mute: 'var(--text-muted)',
        },
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Fira Code"', '"Cascadia Code"', 'Consolas', 'monospace'],
        display: ['"Be Vietnam Pro"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-lg': ['2rem', { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '700' }],
        'heading': ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.015em', fontWeight: '700' }],
        'subheading': ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body': ['0.9375rem', { lineHeight: '1.65', letterSpacing: '-0.005em' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'label': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.06em', fontWeight: '600' }],
      },
      borderRadius: {
        'r-sm': 'var(--r-sm)',
        'r-md': 'var(--r-md)',
        'r-lg': 'var(--r-lg)',
        'r-xl': 'var(--r-xl)',
        'r-2xl': 'var(--r-2xl)',
      },
      boxShadow: {
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'focus': 'var(--shadow-focus)',
      }
    },
  },
  plugins: [],
}
