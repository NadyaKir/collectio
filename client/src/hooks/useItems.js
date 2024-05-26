import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../utils/config";
import { setItems } from "../store/itemSlice";

export const useItems = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();

  const [totalItems, setTotalItems] = useState(0);

  const fetchItems = async (collectionId, currentPage, pageSize) => {
    setIsLoading(true);
    dispatch(setItems([]));
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/items/collection/${collectionId}`,
        {
          params: {
            page: currentPage,
            pageSize: pageSize,
          },
        }
      );

      const items = response.data.items;
      const totalItems = response.data.totalItems;

      const tagIds = items.reduce((acc, item) => {
        acc.push(...item.tags);
        return acc;
      }, []);

      const tagNamesResponse = await axios.post(
        `${SERVER_URL}/api/tags/names`,
        { tagIds }
      );

      const tagMap = {};
      tagNamesResponse.data.tags.forEach((tag) => {
        tagMap[tag._id] = tag;
      });

      const updatedItems = items.map((item) => ({
        ...item,
        tags: item.tags.map((tagId) => ({
          _id: tagId,
          name: tagMap[tagId].name,
        })),
      }));

      dispatch(setItems(updatedItems));
      setTotalItems(totalItems);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  return {
    items,
    fetchItems,
    totalItems,
    isLoading,
    error,
  };
};
