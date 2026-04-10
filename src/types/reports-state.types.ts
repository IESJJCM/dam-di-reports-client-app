import type { Report } from './jasper-reports.types';

export interface ReportsState {
  // Data
  reports: Report[];
  loadingReports: boolean;
  errorLoadingReports: string | null;

  reportUrl: string | null;
  loadingReport: boolean;
  errorLoadingReport: string | null;

  selectedReport: Report | null;

  // Functions
  setSelectedReport: (report: Report) => void;
  load: () => Promise<void>;
  reload: () => Promise<void>;
}