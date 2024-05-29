import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useDispatch } from "react-redux";
import { setTags } from "../store/tagsSlice";

export const useFetchTags = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTags = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/api/tags`);
      const tags = response.data;
      dispatch(setTags(tags));
      setIsLoading(false);
      return tags;
    } catch (error) {
      console.error("Fetch tags error:", error);
      setError(error);
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return { isLoading, error };
};
