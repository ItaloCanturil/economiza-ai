import { createContext, useContext } from "react";

export type OcrAnalyzeResponse = unknown;

export type DashboardContextValue = {
  analyzeReceipt: (file: File) => Promise<OcrAnalyzeResponse>;
  isAnalyzing: boolean;
};

export const DashboardContext = createContext<DashboardContextValue | undefined>(
  undefined
);

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}