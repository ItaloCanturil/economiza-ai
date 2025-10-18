import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type RegisterInput = {
	name: string;
	email: string;
	password: string;
};

type LoginInput = {
	email: string;
	password: string;
};

export type AuthUser = {
	name: string;
	email: string;
};

export type MeResponse = {
	id: number;
	email: string;
	name: string;
	createdAt: string;
};

type AuthContextValue = {
	user: AuthUser | null;
	isAuthenticated: boolean;
	isUserLoading: boolean;
	userError: unknown;
	register: (input: RegisterInput) => Promise<void>;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const API_BASE_URL =
	(import.meta as any).env?.VITE_API_URL || "https://mock.economiza.ai";
const CURRENT_USER_KEY = "auth_user";

// function getCurrentUser(): AuthUser | null {
// 	try {
// 		const raw = localStorage.getItem(CURRENT_USER_KEY);
// 		return raw ? (JSON.parse(raw) as AuthUser) : null;
// 	} catch {
// 		return null;
// 	}
// }

function setCurrentUser(user: AuthUser | null) {
	if (user) {
		localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
	} else {
		localStorage.removeItem(CURRENT_USER_KEY);
	}
}

// function getToken(): string | null {
// 	try {
// 		return localStorage.getItem(AUTH_TOKEN_KEY);
// 	} catch {
// 		return null;
// 	}
// }

// function setToken(token: string | null) {
// 	if (token) {
// 		localStorage.setItem(AUTH_TOKEN_KEY, token);
// 	} else {
// 		localStorage.removeItem(AUTH_TOKEN_KEY);
// 	}
// }

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
	const headers: HeadersInit = {
		...(init?.headers || {}),
	};
	if (!("Content-Type" in headers)) {
		headers["Content-Type"] = "application/json";
	}
	if (token) {
		headers["Authorization"] = `Bearer ${token}`;
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const queryClient = useQueryClient();

	const { data: token } = useQuery<string | null>({
		queryKey: ["auth", "token"],
		staleTime: Infinity,
		gcTime: Infinity,
		initialData: null,
	});

	const {
		data: me,
		isLoading: isUserLoading,
		error: userError,
	} = useQuery<MeResponse>({
		queryKey: ["auth", "me"],
		enabled: !!token,
		staleTime: 60_000,
		queryFn: () => request("/api/auth/me", { method: "GET" }, token || null),
	});

	useEffect(() => {
		if (userError instanceof ApiError && userError.status === 401) {
			queryClient.setQueryData(["auth", "token"], null);
			queryClient.removeQueries({ queryKey: ["auth", "me"] });
		}
	}, [userError, queryClient]);

	const { mutateAsync: register } = useMutation({
		mutationFn: async (input: RegisterInput) =>
			request(
				"/api/auth/register",
				{
					method: "POST",
					body: JSON.stringify(input),
				},
				null
			),
		onSuccess: (data) => {
			if (data?.tokens?.access_token) {
				queryClient.setQueryData(["auth", "token"], data.tokens.access_token);
			}
			if (data) {
				queryClient.setQueryData(["auth", "me"], data.data);
			}
		},
		onError: (err: unknown) => {
			console.error(err);
			throw err;
		},
	});

	const { mutateAsync: login } = useMutation({
		mutationFn: async (input: LoginInput) =>
			request(
				"/api/auth/login",
				{
					method: "POST",
					body: JSON.stringify(input),
				},
				null
			),
		onSuccess: (data) => {
			if (data?.data?.tokens?.access_token) {
				queryClient.setQueryData(
					["auth", "token"],
					data.data.tokens.access_token
				);
			}
			if (data?.data) {
				queryClient.setQueryData(["auth", "me"], data.data);
			}
		},
		onError: (err: unknown) => {
			if (err instanceof ApiError && err.status === 401) {
				queryClient.setQueryData(["auth", "token"], null);
				queryClient.removeQueries({ queryKey: ["auth", "me"] });
			}
		},
	});

	const { mutateAsync: logout } = useMutation({
		mutationFn: async () =>
			request("/api/auth/logout", { method: "POST" }, token || null),
		onSuccess: () => {
			queryClient.setQueryData(["auth", "token"], null);
			queryClient.removeQueries({ queryKey: ["auth", "me"] });
		},
		onError: (err: unknown) => {
			console.error(err);
			throw err;
		},
	});

	const refreshMe = useCallback(async () => {
		queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
		await queryClient.refetchQueries({ queryKey: ["auth", "me"] });
	}, [queryClient]);

	const value = useMemo<AuthContextValue>(
		() => ({
			user: me?.data ?? null,
			isAuthenticated: !!token,
			isUserLoading,
			userError,
			register,
			login,
			logout,
			refreshMe,
		}),
		[me, token, isUserLoading, userError, register, login, logout, refreshMe]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
