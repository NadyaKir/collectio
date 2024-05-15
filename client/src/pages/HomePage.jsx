import React from "react";
import { Link } from "react-router-dom";
import Chip from "../components/Chip";

export default function HomePage() {
  const tags = [
    { _id: "1", name: "Tag 1" },
    { _id: "2", name: "Tag 2" },
    { _id: "3", name: "Tag 3" },
    { _id: "4", name: "Tag 4" },
  ];

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
        <div className="flex flex-wrap items-center">
          {tags.map((tag, index) => (
            <Link key={tag._id}>
              {index === tags.length - 1 ? (
                <Chip
                  title={tag.name}
                  marginRight={"mr-0"}
                  dismissible={false}
                />
              ) : (
                <Chip
                  title={tag.name}
                  marginRight={"mr-2"}
                  dismissible={false}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
