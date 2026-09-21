import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ScreenLoader from "./ScreenLoader";
import { authSelector, fetchCurrentUser } from "../store/slices/authSlice";

const ProtectedRoute = () => {
  const dispatch = useDispatch();

  const { user, authChecked } = useSelector(authSelector);

  useEffect(() => {
    if (!authChecked) {
      dispatch(fetchCurrentUser());
    }
  }, [authChecked, dispatch]);

  if (!authChecked) {
    return <ScreenLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
