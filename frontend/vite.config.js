import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/zhangwu/',   // ⭐⭐⭐ 必须
  plugins: [react()],
})
