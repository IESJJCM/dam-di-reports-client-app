import { useCallback, useEffect, useState } from 'react';
import { getReportUrl, getReports } from '../api/jasper-report-api';
import type { Report } from '../types/jasper-reports.types';

/**
 * JasperReports state + actions.
 *
 * - Fetches the available report units once on mount.
 * - Executes the currently selected report whenever it changes.
 * - Exposes a `blob:` URL (`reportUrl`) that can be embedded (iframe/object) or downloaded.
 */
export const useReports = () => {
  /** List of reports available on the JasperReports server. */
  const [reports, setReports] = useState<Report[]>([]);
  /** True while the list of reports is being fetched. */
  const [loadingReports, setLoadingReports] = useState(false);
  /** Error message (if any) from fetching the report list. */
  const [errorLoadingReports, setErrorLoadingReports] = useState<string | null>(null);

  /** Report unit selected by the user (drives execution). */
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  /** True while the selected report is being executed/fetched as a blob. */
  const [loadingReport, setLoadingReport] = useState(false);
  /** Error message (if any) from executing/fetching the selected report. */
  const [errorLoadingReport, setErrorLoadingReport] = useState<string | null>(null);
  /** `blob:` URL for the last successfully executed report. */
  const [reportUrl, setReportUrl] = useState<string | null>(null);

  /*
  Fetch report list once on mount.
  */
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

  /*
  Re-execute report whenever the selection changes.
  */
  useEffect(() => {
    void load();
  }, [selectedReport]);

  /**
   * Executes the currently selected report and updates `reportUrl`.
   *
   * Note: `getReport()` returns a freshly-created `blob:` URL. We revoke the previous one
   * before storing the new URL to prevent accumulating unreleased blob URLs in memory.
   */
  const load = useCallback(async () => {
    if (selectedReport) {
      setLoadingReport(true);
      setErrorLoadingReport(null);

      try {
        const url = await getReportUrl(selectedReport.uri);
        setReportUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      } catch (e: any) {
        setErrorLoadingReport(e?.message ?? String(e));
      } finally {
        setLoadingReport(false);
      }
    }
  }, [selectedReport]);


  return {
    // Data
    reports,
    loadingReports,
    errorLoadingReports,

    reportUrl,
    loadingReport,
    errorLoadingReport,

    selectedReport,
    // Functions
    /** Updates the selected report (will trigger execution via the effect). */
    setSelectedReport,
    /** Manually (re)execute the currently selected report. */
    reload: load,
  };
};