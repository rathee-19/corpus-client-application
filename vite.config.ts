import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import vitePluginImp from 'vite-plugin-imp';
import svgrPlugin from 'vite-plugin-svgr';
import { fileURLToPath } from 'url';

// 1. Use custom variable names to avoid conflicts
const currentFilename = fileURLToPath(import.meta.url);
const projectRoot = path.dirname(currentFilename);

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // 2. Use the new variable here
      '@': path.join(projectRoot, 'src'),
    },
  },
  server: {
    port: 8889,
    proxy: {
      '/api': {
        target: 'https://api.corpus.swecha.org',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      },
    },
  },
  optimizeDeps: {
      include: [
          '@emotion/react', 
          '@emotion/styled',
          '@emotion/react/jsx-dev-runtime',
          'react/jsx-runtime' 
      ],
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    vitePluginImp({
      libList: [
        {
          libName: 'lodash',
          libDirectory: '',
          camel2DashComponentName: false,
          // 3. Typo fixed here: removed the extra 'D'
          style: () => {
            return false;
          },
        },
      ],
    }),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
});