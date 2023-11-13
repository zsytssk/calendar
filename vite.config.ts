import eslint from '@rollup/plugin-eslint';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  resolve: {
    alias: {
      '@zsy/calendar': path.resolve(__dirname, 'src/calendar'),
    },
  },
  plugins: [
    {
      ...eslint(),
      enforce: 'pre',
      apply: 'build',
    },
    react(),
  ],
});
