import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	DashboardContext,
	type OcrAnalyzeResponse,
	type DashboardChartItem,
	type DashboardTableRow,
	type OcrReceiptData,
} from "./dashboard-context";

const API_BASE_URL =
	import.meta.env?.VITE_API_URL || "https://mock.economiza.ai";

class ApiError extends Error {
	status?: number;
	constructor(message: string, status?: number) {
		super(message);
		this.status = status;
	}
}

async function request(
	path: string,
	init?: RequestInit,
	token?: string | null
) {
	const isFormData = init?.body instanceof FormData;
	const headers = new Headers(init?.headers);
	if (!isFormData && !headers.has("Content-Type")) {
		headers.set("Content-Type", "application/json");
	}
	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	const res = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
	const contentType = res.headers.get("content-type") || "";

	if (!res.ok) {
		let message = "";
		if (contentType.includes("application/json")) {
			try {
				const body = await res.json();
				message = body?.message || JSON.stringify(body);
			} catch {
				throw new ApiError(
					message || `Request failed: ${res.status}`,
					res.status
				);
			}
		} else {
			try {
				message = await res.text();
			} catch {
				throw new ApiError(
					message || `Request failed: ${res.status}`,
					res.status
				);
			}
		}
		throw new ApiError(message || `Request failed: ${res.status}`, res.status);
	}

	if (contentType.includes("application/json")) {
		return res.json();
	}
	return null;
}

function getStoredData<T>(key: string, fallback: T): T {
	const storedValue = localStorage.getItem(key);
	if (storedValue) {
		try {
			return JSON.parse(storedValue) as T;
		} catch {
			return fallback;
		}
	}
	return fallback;
}

function normalizeAnalyzeResponse(resp: OcrAnalyzeResponse): {
	rows: DashboardTableRow[];
	chart: DashboardChartItem[];
	incomes: number[];
	expenses: number[];
} {
	// Expected shape: { success, message?, data: OcrReceiptData }
	const data = (resp as { data?: OcrReceiptData })?.data;

	const rows: DashboardTableRow[] = data
		? [
				{
					id: String(data.id),
					gastos: Number(data.gastos ?? 0),
					status:
						data.status === "pending" ||
						data.status === "processing" ||
						data.status === "success" ||
						data.status === "failed"
							? (data.status as DashboardTableRow["status"])
							: "success",
					loja: String(data.loja ?? "Unknown"),
					date: String(data.date ?? new Date().toISOString().slice(0, 10)),
				},
		  ]
		: [];

	// Simple chart aggregation: put gastos under a default category (e.g., utilities)
	const month = data
		? new Date(data.date).toLocaleString("pt-BR", { month: "short" })
		: "";
	const chart: DashboardChartItem[] = data
		? [
				{
					month,
					food: 0,
					transport: 0,
					utilities: Number(data.gastos ?? 0),
					entertainment: 0,
					all: Number(data.gastos ?? 0),
				},
		  ]
		: [];

	const incomes: number[] = [];
	const expenses: number[] = data ? [Number(data.gastos ?? 0)] : [];

	return { rows, chart, incomes, expenses };
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
	const queryClient = useQueryClient();

	const [incomes, setIncomes] = useState<number[]>(() =>
		getStoredData<number[]>("incomes", [])
	);
	const [expenses, setExpenses] = useState<number[]>(() =>
		getStoredData<number[]>("expenses", [])
	);
	const [tableRows, setTableRows] = useState<DashboardTableRow[]>(() =>
		getStoredData<DashboardTableRow[]>("tableRows", [])
	);
	const [chartData, setChartData] = useState<DashboardChartItem[]>(() =>
		getStoredData<DashboardChartItem[]>("chartData", [])
	);

	useEffect(() => {
		localStorage.setItem("incomes", JSON.stringify(incomes));
		setIncomes(incomes);
	}, [incomes]);

	useEffect(() => {
		localStorage.setItem("expenses", JSON.stringify(expenses));
		setExpenses(expenses);
	}, [expenses]);

	useEffect(() => {
		localStorage.setItem("tableRows", JSON.stringify(tableRows));
		setTableRows(tableRows);
	}, [tableRows]);

	useEffect(() => {
		localStorage.setItem("chartData", JSON.stringify(chartData));
		setChartData(chartData);
	}, [chartData]);

	const { mutateAsync: analyzeReceipt, isPending } = useMutation<
		OcrAnalyzeResponse,
		unknown,
		{ file: File }
	>({
		mutationFn: async ({ file }) => {
			const form = new FormData();
			form.append("file", file);

			const token =
				(queryClient.getQueryData(["auth", "token"]) as string | null) || null;

			return request("api/ocr/analyze", { method: "POST", body: form }, token);
		},
		onSuccess: (resp) => {
			try {
				console.log("🚀 ~ DashboardProvider ~ resp:", resp);
				const { rows, chart, incomes, expenses } =
					normalizeAnalyzeResponse(resp);
				setTableRows((prev) => [...prev, ...rows]);
				setChartData((prev) => [...prev, ...chart]);
				if (incomes.length) setIncomes((prev) => [...prev, ...incomes]);
				if (expenses.length) setExpenses((prev) => [...prev, ...expenses]);
			} catch (e) {
				console.error("Failed to normalize OCR response", e);
			}
		},
		onError: (err: unknown) => {
			console.error(err);
			throw err;
		},
	});

	const addIncome = (amount: number) => {
		setIncomes((prev) => [...prev, amount]);
	};
	const addExpense = (amount: number) => {
		setExpenses((prev) => [...prev, amount]);
	};

	const totalIncome = React.useMemo(
		() => incomes.reduce((sum, v) => sum + v, 0),
		[incomes]
	);
	const totalExpense = React.useMemo(
		() => expenses.reduce((sum, v) => sum + v, 0),
		[expenses]
	);
	const balance = React.useMemo(
		() => totalIncome - totalExpense,
		[totalIncome, totalExpense]
	);

	const value = useMemo(
		() => ({
			analyzeReceipt: async (file: File) => analyzeReceipt({ file }),
			isAnalyzing: isPending,
			addIncome,
			addExpense,
			incomes,
			expenses,
			totals: {
				totalIncome,
				totalExpense,
				balance,
			},
			tableRows,
			chartData,
		}),
		[
			analyzeReceipt,
			isPending,
			addIncome,
			addExpense,
			incomes,
			expenses,
			totalIncome,
			totalExpense,
			balance,
			tableRows,
			chartData,
		]
	);

	return (
		<DashboardContext.Provider value={value}>
			{children}
		</DashboardContext.Provider>
	);
}
