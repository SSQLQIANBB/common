import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: './lib',
    rollupOptions: {},

    lib: {
      entry: './packages/index.ts',
      name: '@prometheus/utils',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd'],
    },
  },
})
