/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';
import { configDefaults } from 'vitest/config';

export default defineConfig(() => {
  const isTest = process.env.VITEST === 'true';

  return {
    define: {
      'global': 'globalThis',
    },
    plugins: [
      react(),
      commonjs(),
    ],
    optimizeDeps: {
      include: ['react-window', '@apollo/client', 'axios'],
    },
    resolve: {     
      alias: isTest
        ? [
            {
              find: /\.(css|less|scss|sass)$/,
              replacement: 'identity-obj-proxy',
            },
          ]
        : {
            './runtimeConfig': './runtimeConfig.browser',
          },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      exclude: [...configDefaults.exclude, 'cypress/**'],
      coverage: {
        provider: 'v8' as const,
        reporter: ['text', 'json', 'html'],
        exclude: ['vite.config.*', 'src/main.*', '**/*.d.ts'],
      },
    },
  };
});