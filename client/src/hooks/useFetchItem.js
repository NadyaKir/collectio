import { useState, useEffect } from "react";
import { SERVER_URL } from "../utils/config";
import axios from "axios";

export const useFetchItem = (itemId) => {
  const [initialValues, setInitialValues] = useState({ title: "", tags: "" });
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        if (itemId) {
          const response = await axios.get(
            `${SERVER_URL}/api/items/item/${itemId}`
          );

          const itemData = response.data.item;

          setInitialValues({ title: itemData.title });
          setTags(itemData.tags);
        }
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    };

    fetchItem();
  }, [itemId]);

  return { initialValues, tags, setTags };
};
