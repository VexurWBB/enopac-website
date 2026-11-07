import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Tailwind runs through its Vite plugin. Do not inherit a parent workspace's PostCSS setup.
  css: { postcss: { plugins: [] } },
})
