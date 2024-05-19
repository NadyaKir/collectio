import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/api/users/getUsers`);
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error get users: ", error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, setUsers, fetchUsers, isLoading, error };
};
