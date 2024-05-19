import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SERVER_URL } from "../utils/config";
import { setItems } from "../store/itemSlice";
import { useParams } from "react-router-dom";

export const useItems = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();
  const { collectionId } = useParams();

  const fetchItems = async () => {
    setIsLoading(true);
    dispatch(setItems([]));
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/items/collection/${collectionId}`
      );

      const items = response.data.items;

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
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [collectionId, dispatch]);

  return {
    items,
    fetchItems,
    isLoading,
    error,
  };
};
