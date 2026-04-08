import { useEffect, useState } from 'react';
import { getReports } from '../api/jasper-report-api';
import type { Report } from '../types/jasper-reports.types';

export const useReports = () => {
  const [reports, setReports]                         = useState<Report[]>([]);
  const [loadingReports, setLoadingReports]           = useState(false);
  const [errorLoadingReports, setErrorLoadingReports] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoadingReports(true);

    getReports()
      .then((data) => {
        !cancelled && setReports(data);
      })
      .catch((e) => {
        !cancelled && setErrorLoadingReports(e.message);
      })
      .finally(() => {
        !cancelled && setLoadingReports(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    reports,
    loadingReports,
    errorLoadingReports
  };
};