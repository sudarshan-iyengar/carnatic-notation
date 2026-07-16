import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/carnatic-notation/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true
  }
});
