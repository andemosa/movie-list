import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/swr";

const PublicRoute = () => {
  const token = getToken()

  if (token)
    return (
      <Navigate to={"/list"} replace />
    );

  return <Outlet />;
};

export default PublicRoute;
