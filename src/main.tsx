import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./route";

const root = document.getElementById("root")!;

import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 24 * 60 * 60 * 1000,
		},
	},
});

persistQueryClient({
	queryClient: queryClient,
	persister: createSyncStoragePersister({ storage: window.localStorage }),
	maxAge: 24 * 60 * 60 * 1000,
});

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
