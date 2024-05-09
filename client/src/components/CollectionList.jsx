import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import ToolButton from "./ToolButton";

const CollectionList = ({ collections }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="flex flex-col justify-between h-full border p-4 rounded-lg"
          >
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <h2 className="text-lg font-bold">{collection.name}</h2>
                <div>
                  <ToolButton title="Edit">
                    <EditOutlined />
                  </ToolButton>
                  <ToolButton title="Save">
                    <CheckOutlined />
                  </ToolButton>
                  <ToolButton title="Cancel">
                    <CloseOutlined />
                  </ToolButton>
                  <ToolButton>
                    <DeleteOutlined title="Delete" />
                  </ToolButton>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between">
                <div className="lg:mr-3">
                  {collection.image && (
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-auto lg:w-56 h-50  mr-4 rounded-lg"
                    />
                  )}
                  <p className="font-medium mt-2">
                    Category: {collection.category}
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-gray-600">{collection.description}</p>
                </div>
              </div>
            </div>
            <div className="ml-auto">
              <Link
                className="text-lg font-medium hover:text-teal-600"
                to={`/collection/${collection.id}`}
              >
                Show
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CollectionList;
