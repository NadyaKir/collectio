import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCollections } from "../store/collectionsSlice";
import { SERVER_URL } from "../utils/config";
import getToketData from "../utils/getTokenData";

export const useCollections = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCollections, setTotalCollections] = useState(0);

  const { userId } = getToketData();

  const collections = useSelector((state) => state.collections.collections);

  const fetchUserCollections = async (
    collectionUserId,
    currentPage,
    pageSize,
    selectedCategory,
    searchText
  ) => {
    setIsLoading(true);
    dispatch(setCollections([]));
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/collections/${
          collectionUserId ? collectionUserId : userId
        }`,
        {
          params: {
            page: currentPage,
            pageSize: pageSize,
            category: selectedCategory,
            search: searchText,
          },
        }
      );

      const collections = response.data;

      dispatch(setCollections(collections.collections));
      setTotalCollections(collections.totalCollections);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching collections:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  return {
    collections,
    totalCollections,
    fetchUserCollections,
    isLoading,
    error,
  };
};
