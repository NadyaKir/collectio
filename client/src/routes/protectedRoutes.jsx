import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import getTokenData from "../utils/getTokenData";

const ProtectedRoutes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { isAdmin } = getTokenData;

  if (isAuthenticated && isAdmin) {
    return <Outlet />;
  }
};
export default ProtectedRoutes;
