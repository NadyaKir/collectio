import { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/users/getUsers`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error get users: ", error);
      }
    };

    fetchUsers();
  }, []);

  return { users, setUsers };
};
