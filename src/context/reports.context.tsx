import { createContext } from "react";
import type { ReportsState } from "../types/reports-state.types";
import { useReports } from "../hooks/useReports";

export const ReportsContext = createContext<ReportsState>({} as ReportsState);

export const ReportsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ReportsContext.Provider value={{ ...useReports() }}>
      {children}
    </ReportsContext.Provider>
  );
};
