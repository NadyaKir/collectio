import React from "react";

export default function Container({ children }) {
  return <div className="flex flex-wrap w-full px-10">{children}</div>;
}
