import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: './lib',
    rollupOptions: {
      external: [], // 可根据需要添加外部依赖
    },
    lib: {
      entry: './packages/index.ts',
      name: '@ssq/common',
      fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
      formats: ['es', 'umd'],
    },
  },
});
