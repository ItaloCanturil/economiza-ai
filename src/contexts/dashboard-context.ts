import { createContext, useContext } from "react";

export type OcrReceiptData = {
  id: string;
  gastos: number;
  status: "pending" | "processing" | "success" | "failed" | string;
  loja: string;
  date: string;
  arquivo?: string;
};

export type OcrAnalyzeResponse = {
  success: boolean;
  message?: string;
  data?: OcrReceiptData;
} | unknown;

export type DashboardTotals = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export type DashboardTableRow = {
  id: string;
  gastos: number;
  status: "pending" | "processing" | "success" | "failed";
  loja: string;
  date: string;
};

export type DashboardChartItem = {
  month: string;
  food: number;
  transport: number;
  utilities: number;
  entertainment: number;
  all: number;
};

export type DashboardContextValue = {
  analyzeReceipt: (file: File) => Promise<OcrAnalyzeResponse>;
  isAnalyzing: boolean;
  addIncome: (amount: number) => void;
  addExpense: (amount: number) => void;
  incomes: number[];
  expenses: number[];
  totals: DashboardTotals;
  tableRows: DashboardTableRow[];
  chartData: DashboardChartItem[];
};

export const DashboardContext = createContext<DashboardContextValue | undefined>(
  undefined
);

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}