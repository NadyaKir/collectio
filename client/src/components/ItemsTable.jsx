import React, { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import ToolBar from "../components/Toolbar/ToolBar";
import ToolButton from "../components/Toolbar/ToolButton";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { SERVER_URL } from "../utils/config";
import Chip from "../components/Chip";
import { useItems } from "../hooks/useItems";
import Spinner from "../components/Spinner";
import getTokenData from "../utils/getTokenData";

export default function ItemsTable() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const collectionUserId = queryParams.get("userId");

  const { isAdmin, userId } = getTokenData();
  const { collectionId } = useParams();

  const { items, fetchItems, isLoading, error } = useItems();

  useEffect(() => {
    if (selectedItems.length === items.length && items.length !== 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedItems, items]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(items.map((item) => item._id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleEditItem = (itemId) => {
    navigate(`/collections/${collectionId}/items/update/${itemId}`);
  };

  const handleRowClick = (itemId) => {
    navigate(
      `/collections/${collectionId}/items/${itemId}?userId=${collectionUserId}`
    );
  };

  const handleDeleteItems = async (itemId) => {
    const itemIdsToDelete = itemId ? [itemId] : [];

    const selectedIds =
      itemIdsToDelete.length > 0 ? itemIdsToDelete : selectedItems;

    try {
      await axios.delete(`${SERVER_URL}/api/items/delete`, {
        data: { itemIds: selectedIds },
      });

      fetchItems();
      setSelectedItems([]);
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };

  const isHaveRightToChange =
    userId && (isAdmin || (userId === collectionUserId && !isAdmin));

  return (
    <>
      {isHaveRightToChange && (
        <ToolBar>
          <ToolButton
            title="Add"
            handleAction={() =>
              navigate(`/collections/${collectionId}/items/addItem`)
            }
          >
            Add
          </ToolButton>
          <ToolButton
            handleAction={() =>
              handleDeleteItems(
                selectedItems.length > 0 ? undefined : selectedItems
              )
            }
          >
            Delete all
          </ToolButton>
        </ToolBar>
      )}

      <div className="flex flex-col flex-1 max-h-[40rem] overflow-x-auto relative border rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y border-collapse border-b divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="h-12 text-center divide-gray-200">
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {items.length > 0 &&
                    userId &&
                    userId === collectionUserId && (
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    )}
                </th>
                <th className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>

                <th className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isHaveRightToChange ? "Actions" : null}
                </th>
              </tr>
            </thead>

            <tbody className="h-full w-full bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr
                  key={item._id}
                  className="text-left hover:bg-gray-100 cursor-pointer h-16"
                  onClick={() => handleRowClick(item._id)}
                >
                  <td className="px-4 py-2 whitespace-nowrap">
                    {isHaveRightToChange && (
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5"
                        checked={selectedItems.includes(item._id)}
                        onChange={() => handleSelectItem(item._id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap w-1/4">
                    <Link to={`/collections/${collectionId}/items/${item._id}`}>
                      {item._id}
                    </Link>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap w-1/4">
                    {item.title}
                  </td>
                  <td className="text-center px-4 py-2 whitespace-nowrap w-1/4">
                    <div className="flex items-center">
                      {item.tags.length > 0 ? (
                        item.tags.map((tag, index) => (
                          <Link
                            key={tag._id}
                            to={`/search?searchQuery=${tag.name}`}
                          >
                            <Chip
                              title={tag.name}
                              marginRight={
                                index === item.tags.length - 1 ? "mr-0" : "mr-2"
                              }
                              dismissible={false}
                            />
                          </Link>
                        ))
                      ) : (
                        <span className="w-full">No tags</span>
                      )}
                    </div>
                  </td>
                  <td className="text-center px-4 py-2 whitespace-nowrap w-1/4">
                    {isHaveRightToChange && (
                      <>
                        <button
                          onClick={(e) => {
                            handleEditItem(item._id);
                            e.stopPropagation();
                          }}
                        >
                          <EditOutlined className="text-2xl mr-4 text-gray-500 hover:text-gray-700" />
                        </button>
                        <button
                          onClick={(e) => {
                            handleDeleteItems(item._id);
                            e.stopPropagation();
                          }}
                        >
                          <DeleteOutlined className="text-2xl text-gray-500 hover:text-gray-700" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isLoading && items.length === 0 && (
          <div className="flex flex-1 h-full justify-center items-center text-gray-500">
            <Spinner />
          </div>
        )}
        {error && !isLoading && (
          <div className="flex flex-1 h-full justify-center items-center text-gray-500">
            <div className="text-center text-red-500">
              Error: {error.message}
            </div>
          </div>
        )}
        {items.length === 0 && !isLoading && !error && (
          <div className="flex flex-1 h-full justify-center items-center text-gray-500">
            {isHaveRightToChange
              ? "No items found. Create a new item to get started!"
              : "No items found. User has not created any item yet"}
          </div>
        )}
      </div>
    </>
  );
}
