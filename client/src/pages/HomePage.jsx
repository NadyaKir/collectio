import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chip from "../components/Chip";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { setLastItems } from "../store/itemSlice";

export default function HomePage() {
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const lastItems = useSelector((state) => state.items.lastItems);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/tags`);

        const tags = response.data;
        const reversedTags = [...tags].reverse();

        setTags(reversedTags);
        return tags;
      } catch (error) {
        console.error("Fetch tags error:", error);
        throw error;
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchLastItems = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/items`);

        const items = response.data.items;
        dispatch(setLastItems(items));
      } catch (error) {
        console.error("Fetch tags error:", error);
        throw error;
      }
    };
    fetchLastItems();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Last items:</h2>
        <ul>
          {lastItems.map((item) => (
            <li key={item._id}>
              <div>
                <strong>Item Title:</strong> {item.title}
              </div>
              <div>
                <strong>Collection Title:</strong> {item.collectionId.title}
              </div>
              <div>
                <strong>Created By:</strong> {item.createdBy.username}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">The biggest collections:</h2>
        <ul>
          <li>Col 1</li>
          <li>Col 2</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Tags cloud:</h2>
        <div className="flex flex-wrap items-center">
          {tags.map((tag, index) => (
            <Link key={tag._id}>
              <Chip
                title={tag.name}
                marginRight={index === tags.length - 1 ? "mr-0" : "mr-2"}
                dismissible={false}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
