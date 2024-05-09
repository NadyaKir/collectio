import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Last items:</h2>
        <ul>
          <li>Col 1</li>
          <li>Col 2</li>
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">The biggest collections:</h2>
        <ul>
          <li>Col 1</li>
          <li>Col 2</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Tags cloud:</h2>
        <div>
          <button className="mr-2 mb-2 p-2 bg-gray-200 rounded hover:bg-gray-300">
            Tag 1
          </button>
          <button className="mr-2 mb-2 p-2 bg-gray-200 rounded hover:bg-gray-300">
            Tag 2
          </button>
        </div>
      </div>
    </div>
  );
}
