import { defineConfig } from 'vite'
import unocss from '@unocss/vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), unocss()]
})
