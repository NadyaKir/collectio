import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chip from "../components/Chip";
import axios from "axios";
import { SERVER_URL } from "../utils/config";

export default function HomePage() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/tags`);

        const tags = response.data;

        console.log(tags);
        setTags(tags);
        return tags;
      } catch (error) {
        console.error("Fetch tags error:", error);
        throw error;
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Last items:</h2>
        <ul>
          <li>Col 1</li>
          <li>Col 2</li>
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
              {index === tags.length - 1 ? (
                <Chip
                  title={tag.name}
                  marginRight={"mr-0"}
                  dismissible={false}
                />
              ) : (
                <Chip
                  title={tag.name}
                  marginRight={"mr-2"}
                  dismissible={false}
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
