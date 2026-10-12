import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Change BASE for another repo name, or set to '/' for a custom domain.
const BASE = process.env.VITE_BASE || '/portfolio/'
export default defineConfig({ base: BASE, plugins: [react()] })
