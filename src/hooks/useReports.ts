import { useEffect, useState } from 'react';
import { getReports } from '../api/jasper-report-api';
import type { Report } from '../types/jasper-reports.types';

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getReports()
      .then((data) => {
        !cancelled && setReports(data);
      })
      .catch((e) => {
        !cancelled && setError(e.message);
      })
      .finally(() => {
        !cancelled && setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    reports,
    loading,
    error
  };
};