import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import About from "./About.tsx";
import dashboard from "./dashboard.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		Component: App,
	},
	{
		path: "/about",
		Component: About,
	},
	{
		path: "/dashboard",
		Component: dashboard,
	},
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
