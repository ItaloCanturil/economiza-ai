import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./route";
import { AuthProvider } from "./auth/AuthContext";

const root = document.getElementById("root")!;
const queryClient = new QueryClient();

ReactDOM.createRoot(root).render(
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</QueryClientProvider>
);
