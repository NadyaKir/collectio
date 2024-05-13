import { useEffect } from "react";
import { SERVER_URL } from "../utils/config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCollections } from "../store/collectionsSlice";

export const useCollections = () => {
  const dispatch = useDispatch();

  const collections = useSelector((state) => state.collections.collections);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/collections/getAllCollections`
        );
        dispatch(setCollections(response.data));
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  const handleDelete = (deletedId) => {
    dispatch(
      setCollections(
        collections.filter((collection) => collection._id !== deletedId)
      )
    );
  };

  return { handleDelete };
};
