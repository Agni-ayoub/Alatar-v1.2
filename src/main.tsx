import { createRoot } from "react-dom/client";
import "./index.css";
import Master from "./master/master";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Plans from "./pages/plans/plans";
import Billing from "./pages/billing/billing";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AccessPage from "./pages/access/main/AccessPage";
import { Bounce, ToastContainer } from "react-toastify";
import ProtectedRoute from "./utils/protectedRoute";
import Companies from "./pages/companies/main/companies";
import Company from "./pages/companies/main/company/main/company";
import Users from "./pages/companies/main/company/pages/users/main/users";
import Vehicles from "./pages/companies/main/company/pages/vehicles/main/vehicles";
import Plan from "./pages/companies/main/company/pages/plan/main/plan";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Master /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
      {
        path: "companies",
        element: <ProtectedRoute><Companies /></ProtectedRoute>,
      },
      {
        path: "companies/company/:id",
        element: <ProtectedRoute><Company /></ProtectedRoute>,
        children : [
          {
            index : true,
            element : <ProtectedRoute><Users /></ProtectedRoute>
          },
          {
            path : "users",
            element : <ProtectedRoute><Users /></ProtectedRoute>
          },
          {
            path : "vehicles",
            element : <ProtectedRoute><Vehicles /></ProtectedRoute>
          },
          {
            path : "plan",
            element : <ProtectedRoute><Plan /></ProtectedRoute>
          }
        ]
      },
      {
        path: "plans",
        element: <ProtectedRoute><Plans /></ProtectedRoute>,
      },
      {
        path: "billing",
        element: <ProtectedRoute><Billing /></ProtectedRoute>,
      },
    ],
  },
  {
    path: "/access",
    element: <AccessPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Bounce}
      limit={4}
      toastClassName={"!bg-[var(--text-secondary)]/20 backDrop-burr-xl !text-[var(--text-primary)] !border-[var(--text-secondary)] backdrop-blur-md !text-xs !min-h-0 !h-12"}
      />
  </Provider>
);
