import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';  // 用于设置别名


export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 设置 '@/...' 作为 src 目录的别名
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  
});





