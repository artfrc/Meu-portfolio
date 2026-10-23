/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // O GitHub Pages publica este repositório em https://artfrc.github.io/Meu-portfolio/
  base: '/Meu-portfolio/',
  plugins: [vue(), tailwindcss()],
  server: { port: 5500 },
  preview: { port: 5500 },
  test: {
    environment: 'jsdom',
  },
})
