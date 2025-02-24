import { createRoot } from "react-dom/client";
import "./index.css";
import Master from "./master/master";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Companies from "./pages/companies/companies";
import Plans from "./pages/plans/plans";
import Billing from "./pages/billing/billing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Master />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "companies",
        element: <Companies />,
      },
      {
        path: "plans",
        element: <Plans />,
      },
      {
        path: "billing",
        element: <Billing />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
