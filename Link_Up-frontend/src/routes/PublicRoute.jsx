import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/auth.store";

const PublicRoute = () => {
  const authenticated = useAuthStore((state) => state.authenticated);
  const loading = useAuthStore((state) => state.loading);

  // Still hydrating auth state — don't redirect yet
  if (loading) return null;

  // Already logged in → send to feed
  if (authenticated) {
    return <Navigate to="/feed" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
