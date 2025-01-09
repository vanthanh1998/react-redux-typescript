import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hooks.ts";
import { useEffect } from "react";
import { fetchAccount } from "./redux/slice/authSlice.ts";
import LayoutApp from "./components/common/layout.app.tsx";
import LayoutAdmin from "./components/admin/layout.admin.tsx";
import NotFound from "./components/common/not.found.tsx";
import DashboardPage from "./pages/admin/dashboard.tsx";
import ProtectedRoute from "./components/protected-route.ts/index.tsx";
import HomePage from "./pages/home";
import LoginPage from "./pages/auth/Login.tsx";
import RegisterPage from "./pages/auth/Register.tsx";

export default function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  useEffect(() => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;
    dispatch(fetchAccount());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/admin",
      element: (
        <LayoutApp>
          <LayoutAdmin />{" "}
        </LayoutApp>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
