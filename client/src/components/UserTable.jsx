import { useState, useEffect } from "react";
import { getStatusColor } from "../utils/colorHelper";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import useAuth from "../hooks/useAuth";
import getTokenData from "../utils/getTokenData";
import { DeleteOutlined } from "@ant-design/icons";
import ToolBar from "../components/Toolbar/ToolBar";
import ToolButton from "../components/Toolbar/ToolButton";
import { useUsers } from "../hooks/useUsers";
import Spinner from "../components/Spinner";

export default function UserTable() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { signout } = useAuth();

  const { userId } = getTokenData();
  const { users, setUsers, updateUserList, fetchUsers, isLoading, error } =
    useUsers();

  useEffect(() => {
    if (selectedUsers.length === users.length && users.length !== 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedUsers, users]);

  const handleBlockUsers = async () => {
    try {
      if (selectedUsers.includes(userId)) {
        await signout();
        return;
      }

      await axios.put(`${SERVER_URL}/api/users/block`, {
        userIds: selectedUsers,
      });

      fetchUsers();
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error blocking users:", error);
    }
  };

  const handleUnblockUsers = async () => {
    try {
      await axios.put(`${SERVER_URL}/api/users/unblock`, {
        userIds: selectedUsers,
      });

      fetchUsers();
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error unblocking users:", error);
    }
  };

  const handleDeleteUsers = async (userId) => {
    const userIdsToDelete = userId ? [userId] : [];

    const selectedIds =
      userIdsToDelete.length > 0 ? userIdsToDelete : selectedUsers;

    try {
      await axios.delete(`${SERVER_URL}/api/users/delete`, {
        data: { userIds: selectedIds },
      });

      fetchUsers();
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

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

  const handleRowClick = (userId) => {
    const updatedSelectedUsers = selectedUsers.includes(userId)
      ? selectedUsers.filter((id) => id !== userId)
      : [...selectedUsers, userId];
    setSelectedUsers(updatedSelectedUsers);
  };

  const handleChangeRole = async (userId, role) => {
    const isAdmin = role === "admin";
    const currentUserId = getTokenData().userId;

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

      if (userId === currentUserId && !isAdmin) {
        await signout();
      }
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
    <>
      <ToolBar>
        <ToolButton handleAction={handleBlockUsers}>Block</ToolButton>
        <ToolButton handleAction={handleUnblockUsers}>Unblock</ToolButton>
        <ToolButton
          handleAction={() =>
            handleDeleteUsers(
              selectedUsers.length > 0 ? undefined : selectedUsers
            )
          }
        >
          Delete all
        </ToolButton>
      </ToolBar>
      <div className="flex flex-col h-full overflow-x-auto relative border rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y border-collapse border-b divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="h-12 text-center divide-gray-200">
                <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {users.length > 0 && (
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  )}
                </th>
                <th className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
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
                  Role
                </th>
                <th className="px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="h-full w-full bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="text-center hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(user._id)}
                >
                  <td className="px-2 py-2 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleSelectUser(user._id)}
                    />
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap w-1">
                    {user._id}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td
                    className={`px-2 py-2 whitespace-nowrap ${
                      userId === user._id ? "font-bold" : ""
                    }`}
                  >
                    {user.email}
                    {userId === user._id ? " (you)" : ""}
                  </td>
                  <td className="text-center px-2 py-2 whitespace-nowrap">
                    {user.registrationDate}
                  </td>
                  <td className="text-center px-2 py-2 whitespace-nowrap">
                    {user.lastLoginDate ? user.lastLoginDate : "-"}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <select
                      value={user.isAdmin ? "admin" : "user"}
                      onChange={(e) =>
                        handleChangeRole(user._id, e.target.value)
                      }
                      onClick={(e) => e.stopPropagation()}
                      className="block w-full py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap">
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
                  <td className="px-2 text-center py-2 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUsers(user._id);
                      }}
                    >
                      <DeleteOutlined className="text-2xl text-gray-500 hover:text-gray-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isLoading && users.length === 0 && (
          <div className="flex flex-1 h-full justify-center items-center text-gray-500">
            <Spinner />
          </div>
        )}
        {error && !isLoading && (
          <div
            div
            className="flex flex-1 h-full justify-center items-center text-gray-500"
          >
            <div className="text-center text-red-500">
              Error: {error.message}
            </div>
          </div>
        )}
        {users.length === 0 && !isLoading && !error && (
          <div className="flex flex-1 h-full justify-center items-center text-gray-500">
            No users found.
          </div>
        )}
      </div>
    </>
  );
}
