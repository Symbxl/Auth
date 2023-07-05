import AuthGuard from "../guard/AuthGuard";
import HomePage from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";
import LoginPage from "../pages/LoginPage";
import UserPage from "../pages/UserPage";
import UserGuard from "../guard/UserGuard";

export const routesConfig = [
  {
    id: 1,
    path: "/",
    element: <HomePage />,
  },
  {
    id: 2,
    path: "/admin",
    element: (
      <AuthGuard>
        <AdminPage />
      </AuthGuard>
    ),
  },
  {
    id: 3,
    path: "/login",
    element: <LoginPage />,
  },
  {
    id: 4,
    path: "/user",
    element: (
      <UserGuard>
        <UserPage />
      </UserGuard>
    ),
  },
];
