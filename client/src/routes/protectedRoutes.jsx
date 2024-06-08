import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import getTokenData from "../utils/getTokenData";

const ProtectedRoutes = ({ requireAdmin }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { isAdmin } = getTokenData();

  if (isAuthenticated && (!requireAdmin || isAdmin)) {
    return <Outlet />;
  }

  return (
    <div className="flex flex-col flex-1 px-10 pb-6 dark:bg-gray-800/[.1] justify-center items-center">
      <p className="text-center">
        You don't have access to this page.{" "}
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          Go to the home page
        </Link>
        .
      </p>
    </div>
  );
};
export default ProtectedRoutes;
