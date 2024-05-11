import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import getRoleFromToken from "../utils/getRoleFromToken";

const ProtectedRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = getRoleFromToken();

  if (isAuthenticated && isAdmin) {
    return <Outlet />;
  }
};
export default ProtectedRoutes;
