import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx,js,jsx}'],
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      exclude: [
        'src/**/__tests__/**/*.ts',
        'src/**/*.{test,spec}.{ts,tsx,js,jsx}'
      ]
    },
    testTimeout: 10000,
    isolate: true
  }
})
