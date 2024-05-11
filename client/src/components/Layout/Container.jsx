import React from "react";
import { Outlet } from "react-router-dom";
export default function Container() {
  return (
    <>
      <div className="w-full h-screen px-10 mb-8">
        <Outlet />
      </div>
    </>
  );
}
