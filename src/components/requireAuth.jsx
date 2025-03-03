import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const auth = !!localStorage.getItem("token"); // Convert to boolean
  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;