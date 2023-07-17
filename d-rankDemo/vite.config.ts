import path from 'path';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/test/qianxiaodong/dist/' : './',
  plugins: [vue()],
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'public/assets'),
      '@models': path.resolve(__dirname, 'public/assets/models'),
      '@images': path.resolve(__dirname, 'public/assets/images')
    }
  },
})
