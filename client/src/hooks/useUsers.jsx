import { useState, useEffect } from "react";
import axios from "axios";

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/users/getUsers"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error get users: ", error);
      }
    };

    fetchUsers();
  }, []);

  return { users };
};
