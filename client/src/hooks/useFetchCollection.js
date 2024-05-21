import { useState, useEffect } from "react";
import { SERVER_URL } from "../utils/config";
import axios from "axios";

export const useFetchCollection = (collectionId) => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        if (collectionId) {
          const response = await axios.get(
            `${SERVER_URL}/api/collections/collection/${collectionId}`
          );

          const collectionData = response.data;

          setInitialValues({
            title: collectionData.title || "",
            description: collectionData.description || "",
            category: collectionData.category || "",
            image: collectionData.image || null,
          });
        }
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    };

    fetchCollection();
  }, [collectionId]);

  return initialValues;
};
