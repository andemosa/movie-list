import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/swr";

const ProtectedRoute = () => {
  const token = getToken()

  if (!token)
    return (
      <Navigate to={"/login"} replace />
    );

  return <Outlet />;
};

export default ProtectedRoute;
