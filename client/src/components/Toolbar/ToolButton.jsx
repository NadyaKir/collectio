import React from "react";

export default function ToolButton({ children, handleAction, title }) {
  return (
    <button
      type="button"
      onClick={handleAction}
      className="hover:text-teal-600 text-2xl pr-2"
      title={title}
    >
      {children}
    </button>
  );
}
