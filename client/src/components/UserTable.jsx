import { useState, useEffect } from "react";
import { getStatusColor } from "../utils/colorHelper";
import { useUsers } from "../hooks/useUsers";
import axios from "axios";
import { SERVER_URL } from "../utils/config";

export default function UserTable() {
  const { users, setUsers } = useUsers();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  console.log(selectedUsers);

  useEffect(() => {
    if (selectedUsers.length === users.length && users.length !== 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedUsers, users]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedUsers(users.map((user) => user._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleChangeRole = async (userId, role) => {
    const isAdmin = role === "admin";

    try {
      const updatedUsers = users.map((user) => {
        if (user._id === userId) {
          return { ...user, isAdmin: isAdmin };
        }
        return user;
      });
      setUsers(updatedUsers);

      await axios.put(`${SERVER_URL}/api/users/setRole`, {
        userId,
        isAdmin,
      });
    } catch (error) {
      const prevUserRole = users.find((user) => user._id === userId).isAdmin;
      setUsers(
        users.map((user) => {
          if (user._id === userId) {
            return { ...user, isAdmin: !prevUserRole };
          }
          return user;
        })
      );

      console.error("Failed to update user role:", error);
    }
  };

  return (
    <div className="overflow-x-auto relative flex-1 border rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="text-center">
            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Registration Date
            </th>
            <th className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Login Date
            </th>
            <th className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id} className="text-center hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleSelectUser(user._id)}
                />
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{user._id}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.username}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                {user.registrationDate}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {user.lastLoginDate ? user.lastLoginDate : "-"}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="flex justify-center items-center">
                  <span
                    className={`inline-block w-16 text-center rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                      user.isBlocked
                    )}`}
                  >
                    {user.isBlocked ? "Blocked" : "Active"}
                  </span>
                </div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <select
                  value={user.isAdmin ? "admin" : "user"}
                  onChange={(e) => handleChangeRole(user._id, e.target.value)}
                  className="block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
