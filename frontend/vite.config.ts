import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import viteSvgr from 'vite-plugin-svgr';
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@common': path.resolve(__dirname, './src/common'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@services': path.resolve(__dirname, './src/services'),
    },
  },
  plugins: [
    react(),
    viteSvgr(),
    compression({
      algorithm: 'brotliCompress',
      exclude: [
        /\.(br)$/,
        /\.(gz)$/,
        /\.(webp)$/,
        /\.(woff)$/,
        /\.(woff2)$/,
        /\.(jpg)$/,
        /\.(jpeg)$/,
        /\.(png)$/,
        /\.(gif)$/,
      ],
      deleteOriginalAssets: true,
    }),
  ],
});
