import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2022',
    outDir: './lib',
    emptyOutDir: true,
    copyPublicDir: false,
    minify: 'esbuild',
    rollupOptions: {
      external: ['axios'],
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      output: {
        exports: 'named',
        compact: true,
        globals: {
          axios: 'axios',
        },
      },
    },
    lib: {
      entry: {
        index: './packages/index.ts',
        http: './packages/http/index.ts',
        'http/Axios': './packages/http/Axios.ts',
        'http/axiosCancel': './packages/http/axiosCancel.ts',
        'http/axiosTransform': './packages/http/axiosTransform.ts',
        'http/helper': './packages/http/helper.ts',
        'http/types': './packages/http/types.ts',
        utils: './packages/utils/index.ts',
      },
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
      formats: ['es', 'cjs'],
    },
  },
});
