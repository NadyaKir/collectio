import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";

const useFilter = (endpoint) => {
  const [values, setValues] = useState([]);
  const [selectedValue, setSelectedValues] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/${endpoint}`);
        setValues(response.data);
      } catch (error) {
        console.error("Error fetching filter values:", error.message);
      }
    };

    fetchData();
  }, [endpoint]);

  return {
    values,
    selectedValue,
    setSelectedValues,
  };
};

export default useFilter;
