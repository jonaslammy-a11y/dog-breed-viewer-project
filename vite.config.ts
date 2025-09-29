import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';
import { configDefaults } from 'vitest/config';

export default defineConfig(() => {
  const isTest = process.env.VITEST === 'true';

  return {
    plugins: [
      react(),
      commonjs(), // Adds better CommonJS interop for libraries like react-window
    ],
    optimizeDeps: {
      include: ['react-window'], // Ensures react-window is pre-bundled correctly
    },
    resolve: {
      alias: isTest
        ? [
            {
              find: /\.(css|less|scss|sass)$/,
              replacement: 'identity-obj-proxy',
            },
          ]
        : [],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      exclude: [...configDefaults.exclude, 'cypress/**'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: ['vite.config.*', 'src/main.*', '**/*.d.ts'],
      },
    },
  };
});