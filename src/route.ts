import { createBrowserRouter } from "react-router";
import App from "./App";
import Dashboard from "./Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./Home";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        Component: Home,
        index: true,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
      {
        path: '/dashboard',
        Component: DashboardLayout,
        children: [
          {
            index: true,
            Component: Dashboard,
          },
        ]
      }
    ]
  },
]);

export default router;