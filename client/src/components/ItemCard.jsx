import React from "react";
import { Link } from "react-router-dom";
import Chip from "./Chip";

const ItemCard = ({ item }) => {
  const { title, tags } = item;

  return (
    <div className="flex flex-col h-full">
      <div className="text-center">
        <div className="font-bold text-xl my-6">{title}</div>
      </div>
      <div className="flex flex-wrap">
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
