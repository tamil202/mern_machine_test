import { lazy, startTransition } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// lazy load handle
const Login = lazy(() => import("../src/auth/Login/Login"));
const Register = lazy(() => import("../src/auth/Register/Register"));
const dashboard = lazy(() => import("../src/data/dashboard/DashBoard"));

// Routes Hadling
const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/auth/register",
    Component: Register,
  },
  {
    path: "/data/dashboard",
    Component: dashboard,
  },
]);

// view
const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
