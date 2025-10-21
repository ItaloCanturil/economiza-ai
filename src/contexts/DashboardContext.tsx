import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardContext, type OcrAnalyzeResponse } from "./dashboard-context";

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

function getStoredData(key: string) {
	const storedValue = localStorage.getItem(key);
	if (storedValue) {
		try {
			return JSON.parse(storedValue);
		} catch {
			return []; // Return empty array if JSON is bad
		}
	}
	return []; // Return empty array if nothing is stored
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
	const queryClient = useQueryClient();

	const [incomes, setIncomes] = useState<number[]>(() =>
		getStoredData("incomes")
	);
	const [expenses, setExpenses] = useState<number[]>(() =>
		getStoredData("expenses")
	);

	useEffect(() => {
		localStorage.setItem("incomes", JSON.stringify(incomes));
		setIncomes(incomes);
	}, [incomes]);

	useEffect(() => {
		localStorage.setItem("expenses", JSON.stringify(expenses));
		setExpenses(expenses);
	}, [expenses]);

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
		]
	);

	return (
		<DashboardContext.Provider value={value}>
			{children}
		</DashboardContext.Provider>
	);
}
