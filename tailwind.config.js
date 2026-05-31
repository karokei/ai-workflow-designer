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
        // ── Mika Cyan Accent (Primary) ──
        cyan: {
          DEFAULT: '#00D4FF',
          hover:   '#00AACC',
          active:  '#0088AA',
          glow:    'rgba(0, 212, 255, 0.15)',
          50:  '#e6faff',
          100: '#b3f1ff',
          200: '#80e8ff',
          300: '#4ddfff',
          400: '#1ad6ff',
          500: '#00D4FF',
          600: '#00AACC',
          700: '#008099',
          800: '#005566',
          900: '#002b33',
        },

        // ── Mika Secondary Blue ──
        'mika-blue': '#4169E1',

        // ── Mika Status Colors ──
        'mika-success': '#00E5A0',
        'mika-warning': '#FFB800',
        'mika-error':   '#FF4444',
        'mika-info':    '#00AAFF',

        // ── Mika Neutral Palette (legacy aliases for phase theme colors) ──
        mika: {
          // Indigo (phase colors only — not for brand accent)
          p50:  '#eef2ff',
          p100: '#e0e7ff',
          p200: '#c7d2fe',
          p300: '#a5b4fc',
          p400: '#818cf8',
          p500: '#6366f1',
          p600: '#4f46e5',
          p700: '#4338ca',
          p800: '#3730a3',
          // Emerald
          a50:  '#ecfdf5',
          a500: '#10b981',
          a600: '#059669',
          a700: '#047857',
          // Amber
          am50:  '#fffbeb',
          am600: '#d97706',
          // Rose
          r50:  '#fff1f2',
          r600: '#e11d48',
          // Violet
          v50:  '#f5f3ff',
          v600: '#7c3aed',
          // Teal
          t50:  '#f0fdfa',
          t600: '#0d9488',
          // Slate neutrals
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

        // ── Semantic CSS Var Mappings ──
        bg: {
          DEFAULT:   'var(--bg)',
          base:      'var(--bg)',
          card:      'var(--bg-card)',
          secondary: 'var(--bg-secondary)',
          elevated:  'var(--bg-elevated)',
        },
        border: {
          DEFAULT: 'var(--border)',
          base:    'var(--border)',
          light:   'var(--border-light)',
          accent:  'var(--border-accent)',
        },
        text: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted:     'var(--text-muted)',
          accent:    'var(--text-accent)',
          // short aliases
          pri:  'var(--text-primary)',
          sec:  'var(--text-secondary)',
          mute: 'var(--text-muted)',
        },
        // Mika accent via CSS var (adapts light/dark)
        accent: {
          DEFAULT: 'var(--mika-cyan)',
          hover:   'var(--mika-cyan-hover)',
          glow:    'var(--mika-cyan-glow)',
        },
      },

      fontFamily: {
        // Mika: Space Mono for brand/headings, Be Vietnam Pro for body
        display: ['"Space Mono"', 'monospace'],
        sans:    ['"Be Vietnam Pro"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },

      fontSize: {
        // Mika Type Scale
        'hero':       ['60px', { lineHeight: '1.1', letterSpacing: '-1px', fontWeight: '700', fontFamily: '"Space Mono", monospace' }],
        'display-xl': ['40px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['28px', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '700' }],
        'heading':    ['20px', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
        'subheading': ['16px', { lineHeight: '1.5', letterSpacing: '-0.005em', fontWeight: '600' }],
        'body-lg':    ['18px', { lineHeight: '1.7' }],
        'body':       ['15px', { lineHeight: '1.65', letterSpacing: '-0.005em' }],
        'body-sm':    ['13px', { lineHeight: '1.6' }],
        'code':       ['14px', { lineHeight: '1.7' }],
        'caption':    ['13px', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'label':      ['11px', { lineHeight: '1.4', letterSpacing: '0.06em', fontWeight: '600' }],
      },

      borderRadius: {
        // Mika radius scale
        'r-xs':  'var(--r-xs)',   // 2px
        'r-sm':  'var(--r-sm)',   // 4px  ← Mika radius-sm
        'r-md':  'var(--r-md)',   // 8px  ← Mika radius-md
        'r-lg':  'var(--r-lg)',   // 12px ← Mika radius-lg
        'r-xl':  'var(--r-xl)',   // 20px ← Mika radius-xl
        'r-2xl': 'var(--r-2xl)', // 24px
      },

      boxShadow: {
        'xs':    'var(--shadow-xs)',
        'sm':    'var(--shadow-sm)',
        'md':    'var(--shadow-md)',
        'lg':    'var(--shadow-lg)',
        'xl':    'var(--shadow-xl)',
        'focus': 'var(--shadow-focus)',
        'glow':  'var(--shadow-glow)',
        // Mika named glows
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.30), 0 0 60px rgba(0, 212, 255, 0.10)',
        'glow-cyan-sm': '0 0 8px rgba(0, 212, 255, 0.25)',
      },

      backgroundImage: {
        'mika-surface': 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
        'mika-accent': 'linear-gradient(135deg, var(--mika-cyan) 0%, var(--mika-blue) 100%)',
      },
    },
  },
  plugins: [],
}
