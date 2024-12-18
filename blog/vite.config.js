import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // Listen on all local IPs
    port: 5100,
  },
  plugins: [react()],
});
