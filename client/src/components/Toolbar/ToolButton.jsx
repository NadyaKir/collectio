import React from "react";

export default function ToolButton({ children, handleAction, title }) {
  return (
    <button
      type="button"
      onClick={handleAction}
      className="block text-md p-1 text-gray-500 hover:text-gray-700 mr-2 mt-4 lg:mt-0"
      title={title}
    >
      {children}
    </button>
  );
}
