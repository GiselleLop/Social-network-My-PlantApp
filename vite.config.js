/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, loadEnv } from 'vite';

// additional config to direct the vite build to src directory
// https://vitejs.dev/config/#conditional-config
// https://vitejs.dev/config/shared-options.html#root

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());  // Asegúrate de que 'mode' está pasando correctamente

  const commonConfig = {
    server: {
      cors: true,
    },
    define: {
      'process.env': env,
    },
  };

  if (command === 'build') {
    return {
      ...commonConfig,
      root: 'src',
      // para hacer un deploy en github pages, configura propiedad base con el
      // nombre/url de tu repo
      // para fazer uma implantação github pages, defina a propriedade base
      // para o nome/url do seu repositório
      // https://vitejs.dev/guide/static-deploy.html#github-pages
      build: {
        minify: false,
        rollupOptions: {
          output: {
            dir: './dist',
          },
          input: './src/index.html',
        },
      },
    };
  }
   // Configuración para desarrollo
   return {
    ...commonConfig,
    root: 'src', // El root apunta a 'src' en modo dev
    server: {
      cors: true,
      historyApiFallback: true,
    },
  };
});
