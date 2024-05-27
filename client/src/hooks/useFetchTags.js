import { useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useDispatch } from "react-redux";
import { setTags } from "../store/tagsSlice";

export const useFetchTags = () => {
  const dispatch = useDispatch();

  const fetchTags = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/tags`);

      const tags = response.data;

      dispatch(setTags(tags));
      return tags;
    } catch (error) {
      console.error("Fetch tags error:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);
};
