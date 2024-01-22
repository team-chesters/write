import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        Vue()
    ],
    resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
