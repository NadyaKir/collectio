import React from "react";
import { Outlet } from "react-router-dom";
export default function Container() {
  return (
    <>
      <div className="w-full h-full px-10 mb-2">
        <Outlet />
      </div>
    </>
  );
}
