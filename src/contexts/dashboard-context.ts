import { createContext, useContext } from "react";

export type OcrAnalyzeResponse = unknown;

export type DashboardTotals = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export type DashboardContextValue = {
  analyzeReceipt: (file: File) => Promise<OcrAnalyzeResponse>;
  isAnalyzing: boolean;
  addIncome: (amount: number) => void;
  addExpense: (amount: number) => void;
  incomes: number[];
  expenses: number[];
  totals: DashboardTotals;
};

export const DashboardContext = createContext<DashboardContextValue | undefined>(
  undefined
);

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}