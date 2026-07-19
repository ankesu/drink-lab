import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages 用 base: '/drink-lab/'，本地用 '/'
const base = process.env.GH_PAGES === 'true' ? '/drink-lab/' : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
