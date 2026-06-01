import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 60,
      },
      exclude: [
        'src/data/**',   // curriculum data files
        'src/types/**',  // type definitions only
        'eslint.config.js',
        'postcss.config.js',
        'tailwind.config.js',
        'dist/**',
        'coverage/**',
      ],
    },
  },
})
