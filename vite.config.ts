import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; 
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  /**
   * Proxy de desarrollo hacia JasperServer bajo `/jasperserver`:
   * - Peticiones mismo origen desde la app de Vite → sin problemas de CORS en el navegador al desarrollar.
   * - `target`: Jasper Reports Server local (puerto por defecto 8080).
   * - `changeOrigin: true`: envía `Host` (y cabeceras relacionadas) como el origen del destino para que
   *   el backend que valida host/origen acepte la petición proxificada.
   * - `secure: false`: permite destinos HTTPS con certificados autofirmados en dev (no afecta a http://).
   * - Quitar `WWW-Authenticate` en las respuestas: evita el cuadro nativo de login Basic/Digest del
   *   navegador cuando el servidor responde 401 con esa cabecera; la app puede gestionar la auth a su manera.
   */
  server: {
    proxy: {
      '/jasperserver': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on('proxyRes', (proxyRes, _req, _res) => {
            if (proxyRes.headers['www-authenticate']) {
              delete proxyRes.headers['www-authenticate'];
            }
          });
        }
      },
    },
  }, 
});
