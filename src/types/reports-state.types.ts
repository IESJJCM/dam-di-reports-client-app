import type { Report } from './jasper-reports.types';

export interface ReportsState {
  reports: Report[];
  loadingReports: boolean;
  errorLoadingReports: string | null;
}