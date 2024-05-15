import React, { useState, useEffect } from "react";
import {
  PlusOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Header from "../components/Layout/Header";
import ToolBar from "../components/Toolbar/ToolBar";
import ToolButton from "../components/Toolbar/ToolButton";
import { useNavigate, useParams } from "react-router-dom";
import Link from "antd/es/typography/Link";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../utils/config";
import { setItems } from "../store/itemSlice";

export default function CollectionPage() {
  const items = useSelector((state) => state.items.items);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editingItems, setEditingItems] = useState([]);
  const dispatch = useDispatch();

  const { collectionId } = useParams();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/items//collection/${collectionId}`
        );
        dispatch(setItems(response.data.items));
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [collectionId, dispatch]);

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

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item._id !== itemId);
    dispatch(setItems(updatedItems));
  };
  const navigate = useNavigate();

  const handleRowClick = (itemId) => {
    navigate(`/collections/${collectionId}/items/${itemId}`);
  };

  return (
    <>
      <Header title="Items" />
      <ToolBar>
        <ToolButton
          title="Add"
          handleAction={() =>
            navigate(`/collections/${collectionId}/items/addItem`)
          }
        >
          <PlusOutlined />
        </ToolButton>
      </ToolBar>
      <div className="overflow-x-auto relative flex-1 border rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-center">
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr
                key={item._id}
                className={`text-left ${
                  editingItems.includes(item._id)
                    ? ""
                    : "hover:bg-gray-100 cursor-pointer"
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
                <td className="px-4 py-2 whitespace-nowrap w-1/2">
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
                        <EditOutlined className="text-2xl mr-4 text-teal-700 hover:text-teal-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          handleDeleteItem(item._id);
                          e.stopPropagation();
                        }}
                      >
                        <DeleteOutlined className="text-2xl text-teal-700 hover:text-teal-600" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
