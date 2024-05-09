import React from "react";

export default function PageLayuout({ children, title }) {
  return (
    <div className="w-full mb-8">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {children}
    </div>
  );
}
