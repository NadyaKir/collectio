import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { CloseOutlined } from "@ant-design/icons";
import getTokenData from "../utils/getTokenData";

export default function TicketModal({ closeModal }) {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [collection, setCollection] = useState("");
  const [state, setState] = useState("Open");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = getTokenData();

    try {
      const ticket = await axios.post(`${SERVER_URL}/api/jira/issue/create`, {
        email,
      });

      console.log(ticket);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md">
        <button
          className="text-right w-full mb-2 text-sm text-gray-600 no-underline hover:underline"
          onClick={closeModal}
        >
          <CloseOutlined />
        </button>
        <h2 className="text-center text-lg font-semibold mb-4">
          Create Support Ticket
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="description"
            >
              Description:
            </label>
            <textarea
              id="description"
              className="form-textarea w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="priority"
            >
              Priority:
            </label>
            <select
              id="priority"
              className="form-select w-full"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button
            className="block w-full text-md p-2 rounded border border-teal-600 font-bold hover:text-teal-700 lg:mt-0"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
