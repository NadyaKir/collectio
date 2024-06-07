// import { useState, useEffect } from "react";
// import axios from "axios";
// import { SERVER_URL } from "../utils/config";

// export default function useFilter() {
//   const [values, setValues] = useState([]);
//   const [selectedValue, setSelectedValues] = useState("");

//   async function fetchCategories() {
//     try {
//       const response = await axios.get(
//         `${SERVER_URL}/api/collections/categories`
//       );
//       setValues(response.data);
//     } catch (error) {
//       console.error("Error fetching filter values:", error.message);
//     }
//   }

//   async function fetchStatuses() {
//     try {
//       const response = await axios.get(`${SERVER_URL}/api/jira/statuses`);
//       console.log(response);
//     } catch (error) {
//       console.error("Error fetching filter values:", error.message);
//     }
//   }

//   // fetchCategories();
//   fetchStatuses();

//   return {
//     values,
//     selectedValue,
//     setSelectedValues,
//   };
// }

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
