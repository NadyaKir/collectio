import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  const { title, tags } = item;

  return (
    <div className="max-w-lg rounded overflow-hidden">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
      <div className="px-6 pt-4 pb-2">
        {tags &&
          tags.length > 0 &&
          tags.map((tag) => (
            <Link key={tag._id}>
              <span
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                key={tag._id}
              >
                {tag.name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ItemCard;
