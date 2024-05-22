import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCollections } from "../store/collectionsSlice";
import { SERVER_URL } from "../utils/config";
import getToketData from "../utils/getTokenData";

export const useCollections = (collectionUserId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { userId } = getToketData();
  const collections = useSelector((state) => state.collections.collections);

  const fetchUserCollections = async () => {
    setIsLoading(true);
    dispatch(setCollections([]));
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/collections/${
          collectionUserId ? collectionUserId : userId
        }`
      );
      dispatch(setCollections(response.data));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching collections:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCollections();
  }, []);

  return {
    collections,
    fetchUserCollections,
    isLoading,
    error,
  };
};
