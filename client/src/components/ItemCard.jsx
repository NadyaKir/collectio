import React from "react";
import { Link } from "react-router-dom";
import Chip from "./Chip";

const ItemCard = ({ item }) => {
  const { title, tags } = item;

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
      <div className="px-6 pt-4 pb-2 flex flex-wrap">
        {tags && tags.length > 0 ? (
          tags.map((tag, index) => (
            <Link key={tag._id} to={`/search?searchQuery=${tag.name}`}>
              <Chip
                title={tag.name}
                marginRight={index === item.tags.length - 1 ? "mr-0" : "mr-2"}
                dismissible={false}
              />
            </Link>
          ))
        ) : (
          <span>No tags</span>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
