import { createContext } from "react";
import type { ReportsState } from "../types/reports-state.types";
import { useReports } from "../hooks/useReports";

export const ReportsContext = createContext<ReportsState>({
  reports: [],
  loadingReports: false,
  errorLoadingReports: null,
});

export const ReportsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { reports, loadingReports, errorLoadingReports } = useReports();
  return (
    <ReportsContext.Provider value={{ reports, loadingReports, errorLoadingReports }}>
      {children}
    </ReportsContext.Provider>
  );
};
