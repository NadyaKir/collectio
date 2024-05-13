import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/collections/categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return { categories, setCategories };
};
