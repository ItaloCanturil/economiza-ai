import { createBrowserRouter } from "react-router";
import App from "./App";
import Dashboard from "./Dashboard";
import About from "./About";

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
        {
            path: "/about",
            Component: About,
        },
        {
            path: "/dashboard",
            Component: Dashboard,
        },
    ]
  },
]);

export default router;