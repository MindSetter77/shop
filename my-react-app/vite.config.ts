import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    allowedHosts: process.env.ALLOWED_HOST ? [process.env.ALLOWED_HOST] : [],
  },
})
