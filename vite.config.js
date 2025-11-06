// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Smart-Brain-FrontEnd/', // 👈 matches your repo name exactly
  resolve: {
    alias: {
      process: 'process/browser',
    },
  },
  define: {
    global: 'window',
  },
});
