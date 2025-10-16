import { createBrowserRouter } from "react-router";
import App from "./App";
import Dashboard from "./Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        path: "/dashboard",
        Component: DashboardLayout,
        children: [
          {
            index: true,
            Component: Dashboard,
          },
        ],
      },
    ]
  },
]);

export default router;