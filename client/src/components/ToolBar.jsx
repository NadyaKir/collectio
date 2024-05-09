import React from "react";

export default function ToolBar() {
  const onBlock = () => {};
  const onUnblock = () => {};
  const onDelete = () => {};

  return (
    <div className="flex ml-4 mt-4 mb-4">
      <div className="flex">
        <button
          onClick={onBlock}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Block
        </button>
        <button
          onClick={onUnblock}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-2 rounded mr-2 flex items-center"
        >
          Unblock
        </button>
      </div>
      <div>
        <button
          onClick={onDelete}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded flex items-center"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
