import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import ScreenLoader from "./ScreenLoader";
import { authSelector } from "../store/slices/authSlice";

const GuestRoute = () => {
  const { user, authChecked } = useSelector(authSelector);

  if (!authChecked) {
    return <ScreenLoader />;
  }

  if (user) {
    const lastRoute = sessionStorage.getItem("lastProtectedRoute") || "/";

    return <Navigate to={lastRoute} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
