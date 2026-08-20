import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/AngelikaDael/', 
  build: {
    outDir: 'docs', // Outputs production build to /docs
  },
})
