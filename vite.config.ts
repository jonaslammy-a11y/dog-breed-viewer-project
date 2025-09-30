import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';
import { configDefaults } from 'vitest/config';

export default defineConfig(() => {
  const isTest = process.env.VITEST === 'true';

  return {
    plugins: [
      react(),
      commonjs(),
    ],
    optimizeDeps: {
      include: ['react-window', '@apollo/client'],
      esbuildOptions: {
        // Add this to ensure proper ESM handling
        mainFields: ['module', 'jsnext:main', 'jsnext'],
      },
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
      // Add this to help with module resolution
      mainFields: ['module', 'jsnext:main', 'jsnext', 'main'],
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