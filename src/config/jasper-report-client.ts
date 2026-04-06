import axios from 'axios';

const USER = import.meta.env.JASPER_REPORTS_SERVER_USER;
const PASSWORD = import.meta.env.JASPER_REPORTS_SERVER_PASSWORD;
/**
 * Axios instance to make requests to the Jasper Reports server
 */
const jasperReportsClient = axios.create({
  // En desarrollo, Vite proxy maneja las peticiones a /jasperserver
  // En producción, puedes configurar baseURL si es necesario
  // baseURL: import.meta.env.DEV ? '/jasperserver/rest_v2' : import.meta.env.VITE_BASE_URL,
  baseURL: '/jasperserver/rest_v2',
  headers: {
    /* 
     * Codifica las credenciales en Base64 para enviarlas en el header Authorization
     * btoa(`admin:admin`)
     */
    Authorization: `Basic ${btoa(`${USER}:${PASSWORD}`)}`,
  }
});

export default jasperReportsClient;