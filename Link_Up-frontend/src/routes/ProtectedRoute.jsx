import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/auth.store";
import Loader from "../components/common/Loader";

const ProtectedRoute = () => {
  const authenticated = useAuthStore(
    (state) => state.authenticated
  );

  const loading = useAuthStore(
    (state) => state.loading
  );

  if (loading) {
    return <Loader full />;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;