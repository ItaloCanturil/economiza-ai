import React, { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardContext, type OcrAnalyzeResponse } from "./dashboard-context";

const API_BASE_URL = import.meta.env?.VITE_API_URL || "https://mock.economiza.ai";

class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

async function request(path: string, init?: RequestInit, token?: string | null) {
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
        throw new ApiError(message || `Request failed: ${res.status}`, res.status);
      }
    } else {
      try {
        message = await res.text();
      } catch {
        throw new ApiError(message || `Request failed: ${res.status}`, res.status);
      }
    }
    throw new ApiError(message || `Request failed: ${res.status}`, res.status);
  }

  if (contentType.includes("application/json")) {
    return res.json();
  }
  return null;
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

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

      return request("/ocr/analyze", { method: "POST", body: form }, token);
    },
    onError: (err: unknown) => {
      console.error(err);
      throw err;
    },
  });

  const value = useMemo(
    () => ({
      analyzeReceipt: async (file: File) => analyzeReceipt({ file }),
      isAnalyzing: isPending,
    }),
    [analyzeReceipt, isPending]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}