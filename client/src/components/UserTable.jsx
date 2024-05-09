import { useState } from "react";
import { getStatusColor } from "../utils/colorHelper";

export default function UserTable() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      registrationDate: "2023-01-15",
      lastLoginDate: "2024-05-07",
      status: "Active",
      isAdmin: true,
    },
    {
      id: 2,
      username: "jane_smith",
      email: "jane@example.com",
      registrationDate: "2023-02-20",
      lastLoginDate: "2024-05-08",
      status: "Blocked",
      isAdmin: false,
    },
    {
      id: 3,
      username: "jane_smith",
      email: "jane@example.com",
      registrationDate: "2023-02-20",
      lastLoginDate: "2024-05-08",
      status: "Blocked",
      isAdmin: false,
    },
  ]);
  return (
    <div className="overflow-x-auto relative flex-1 border rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="text-center">
            <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
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
              Admin
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="text-center hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{user.id}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.username}</td>
              <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                {user.registrationDate}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {user.lastLoginDate}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="flex justify-center items-center">
                  <span
                    className={`inline-block w-16 text-center rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {user.isAdmin ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
