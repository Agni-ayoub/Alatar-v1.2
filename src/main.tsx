import { createRoot } from "react-dom/client";
import "./index.css";
import Master from "./master/master";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Companies from "./pages/companies/companies";
import Plans from "./pages/plans/plans";
import Billing from "./pages/billing/billing";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AccessPage from "./pages/access/main/AccessPage";
import { Bounce, ToastContainer } from "react-toastify";

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
  {
    path : '/access',
    element: <AccessPage />
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
