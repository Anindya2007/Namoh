import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables from frontend/.env based on current mode
  const env = loadEnv(mode, process.cwd(), '');

  // Determine the backend target URL from env variables with safe fallbacks
  const backendTarget =
    env.VITE_BACKEND_URL ||
    env.BACKEND_URL ||
    (env.FRONTEND_URL && env.FRONTEND_URL.includes('3000')
      ? env.FRONTEND_URL.replace('https://', 'http://')
      : null) ||
    'http://localhost:3000';

  const frontendPort = parseInt(env.VITE_PORT || env.PORT || '5173', 10);

  return {
    plugins: [react()],
    server: {
      port: frontendPort,
      proxy: {
        '/api': {
          target: backendTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
