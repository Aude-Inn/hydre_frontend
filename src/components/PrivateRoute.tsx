import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  requiredRole: "admin" | "user";
}

export const PrivateRoute = ({ requiredRole }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!requiredRole && user.role !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export const AdminRoute = () => {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
