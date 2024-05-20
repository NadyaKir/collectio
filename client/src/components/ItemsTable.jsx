import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import ToolBar from "../components/Toolbar/ToolBar";
import ToolButton from "../components/Toolbar/ToolButton";
import { useNavigate, useParams } from "react-router-dom";
import Link from "antd/es/typography/Link";
import { SERVER_URL } from "../utils/config";
import Chip from "../components/Chip";
import { useItems } from "../hooks/useItems";
import Spinner from "../components/Spinner";

export default function ItemsTable() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editingItems, setEditingItems] = useState([]);
  const navigate = useNavigate();

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
    if (editingItems.includes(itemId)) {
      setEditingItems(editingItems.filter((id) => id !== itemId));
    } else {
      setEditingItems([...editingItems, itemId]);
    }
  };

  const handleRowClick = (itemId) => {
    navigate(`/collections/${collectionId}/items/${itemId}`);
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

  return (
    <>
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
      <div className="flex flex-col h-full overflow-x-auto relative border rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y border-collapse border-b divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="h-12 text-center divide-gray-200">
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {items.length > 0 && (
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
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="h-full w-full bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr
                  key={item._id}
                  className={`text-left ${
                    editingItems.includes(item._id)
                      ? ""
                      : "hover:bg-gray-100 cursor-pointer h-16"
                  }`}
                  onClick={() => handleRowClick(item._id)}
                >
                  <td className="px-4 py-2 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => handleSelectItem(item._id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap w-1/4">
                    <Link to={`/collections/${collectionId}/items/${item._id}`}>
                      {item._id}
                    </Link>
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap w-1/4">
                    {editingItems.includes(item._id) ? (
                      <input
                        type="text"
                        defaultValue={item.title}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      item.title
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap w-1/4">
                    <div className="flex items-center">
                      {item.tags.map((tag, index) => (
                        <Chip
                          key={tag._id}
                          title={tag.name}
                          marginRight={
                            index === item.tags.length - 1 ? "mr-0" : "mr-2"
                          }
                          dismissible={false}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="text-center px-4 py-2 whitespace-nowrap w-1/4">
                    {editingItems.includes(item._id) ? (
                      <div>
                        <button
                          onClick={(e) => {
                            handleEditItem(item._id);
                            e.stopPropagation();
                          }}
                        >
                          <SaveOutlined className="text-2xl mr-4 text-teal-600 hover:text-teal-700" />
                        </button>
                        <button
                          onClick={(e) => {
                            handleEditItem(item._id);
                            e.stopPropagation();
                          }}
                        >
                          <CloseOutlined className="text-2xl text-teal-600 hover:text-teal-700" />
                        </button>
                      </div>
                    ) : (
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
            No items found. Create a new item to get started!
          </div>
        )}
      </div>
    </>
  );
}
