import React, { useState } from "react";
import { SERVER_URL } from "../utils/config";
import axios from "axios";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState({
    collections: [],
    items: [],
  });

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/search?q=${searchText}`
      );
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        <h2>Collections</h2>
        <ul>
          {searchResults.collections.map((collection) => (
            <li key={collection._id}>{collection.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Items</h2>
        <ul>
          {searchResults.items.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
