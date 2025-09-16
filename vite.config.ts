import { defineConfig } from 'vite';

export default defineConfig({
   root: './src/client',
   base: 'assets/',
   build: {
      outDir: '../../public/assets',
      assetsDir: '.',
      emptyOutDir: true,
      sourcemap: 'inline',
   },
   server: {
      hmr: {
         host: 'localhost',
         port: 3000,
      },
   },
   resolve: {
      alias: {
         '@core': './src/core',
      },
   },
});
