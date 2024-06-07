import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import getTokenData from "../utils/getTokenData";

export const useFetchIssues = () => {
  const [issues, setIssues] = useState([]);
  const [totalIssues, setTotalIssues] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //   const { email } = getTokenData();
  const email = "liletoj191@jadsys.com";

  const fetchIssues = async (page, pageSize, status, search) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/api/jira/issues`, {
        params: {
          email,
          page,
          pageSize,
          status,
          search,
        },
      });

      const issues = response.data.issues;
      console.log(response.data);
      setIssues(issues);
      setTotalIssues(response.data.total);
      setIsLoading(false);
    } catch (error) {
      console.error("Error get issues: ", error);
      setError(error);
      setIsLoading(false);
    }
  };

  return {
    issues,
    totalIssues,
    setIssues,
    fetchIssues,
    isLoading,
    error,
  };
};
