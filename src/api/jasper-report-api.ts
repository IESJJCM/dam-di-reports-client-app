import httpClient from '../config/jasper-report-client';
import type { Report } from '../types/jasper-reports.types';

/**
   * Login to the JasperReports server
   * Only use to check if the server is available
   * @returns True if the login is successful, false otherwise
   */
export const login = async () => {
  try {
    const response = await httpClient.get(`/serverInfo`);
    return response.status === 200;
  } catch (error: any) {
    if (error.code === 'ERR_NETWORK' || error.message?.includes('ERR_CONNECTION_REFUSED')) {
      console.error('Error de conexión: El servidor JasperReports no está disponible a través del proxy');
    } else {
      console.error('Error en login:', error.message);
    }
    return false;
  }
}

/**
 * Get the list of reports from the JasperReports server
 * @returns List of reports
 */
export const getReports = async (): Promise<Report[]> => {
  const { data } = await httpClient.get('/resources?type=reportUnit&recursive=true', {
    headers: {
      Accept: 'application/json',
    },
  });
  return data.resourceLookup ?? [];
};

/**
 * Execute a report and get the blob URL
 * @param reportPath Path to the report
 * @param format Output format (pdf, html, xls, etc.)
 * @param params Report parameters
 * @returns Blob URL of the executed report
 */
export const getReportUrl = async (
  reportPath: string, 
  format = 'pdf', 
  params?: Record<string, any>
): Promise<string> => {
  const response = await httpClient.get(`/reports${reportPath}.${format}`, {
    responseType: 'blob',
    params: params
  });

  return URL.createObjectURL(response.data);
}


/**
 * Get the list of input controls for a report
 * @param reportPath Path to the report
 * @returns List of input controls
 */
export const getReportInputControls = async (reportPath: string) => {
  try {
    const response = await httpClient.get(`/reports${reportPath}/inputControls`, {
      headers: {
        Accept: 'application/json',
      },
    });
    // The response usually contains an array of input controls in response.data.inputControl
    return response.data.inputControl || [];
  } catch (error) {
    console.error('Error fetching input controls:', error);
    return [];
  }
}