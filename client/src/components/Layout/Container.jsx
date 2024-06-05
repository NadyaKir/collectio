import React from "react";
import { Outlet } from "react-router-dom";
export default function Container() {
  return (
    <>
      <div className="flex flex-col flex-1 px-10 pb-6 dark:bg-gray-800/[.1]">
        <Outlet />
      </div>
    </>
  );
}
