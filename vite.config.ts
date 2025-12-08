import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Base path: có thể override bằng VITE_BASE_PATH build arg
// Default: '/CICD_github-actions-workflows/' cho GitHub Pages
// Cho local: set VITE_BASE_PATH='/' khi build
export default defineConfig(({ mode }) => {
  const basePath = process.env.VITE_BASE_PATH || '/CICD_github-actions-workflows/';
  
  return {
    plugins: [react()],
    base: basePath,
  };
})
