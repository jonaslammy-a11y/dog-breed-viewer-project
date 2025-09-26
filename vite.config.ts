import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    commonjs(), // Adds better CommonJS interop for libraries like react-window
  ],
  optimizeDeps: {
    include: ['react-window'], // Ensures react-window is pre-bundled correctly
  },
});