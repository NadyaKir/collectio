import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { SERVER_URL } from "../utils/config";
import axios from "axios";
import Header from "../components/Layout/Header";
import Spinner from "../components/Spinner";

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({
    collections: [],
    items: [],
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("searchQuery") || "";

  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/search?q=${searchQuery}`
        );
        setSearchResults(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error during search:", error);
      }
    };

    handleSearch();
  }, [searchQuery]);

  return (
    <>
      <Header title="Search" />
      <h2 className="text-md  mb-4">
        Search results for <strong>"{searchQuery}"</strong>
      </h2>
      {isLoading && (
        <div className="flex flex-1 justify-center items-center h-full">
          <Spinner />
        </div>
      )}

      {!isLoading &&
        (searchResults.collections.length > 0 ||
          searchResults.items.length > 0) && (
          <div className="mb-2">
            <p>
              Found <strong>{searchResults.collections.length}</strong>{" "}
              collections
            </p>
            <p>
              Found <strong>{searchResults.items.length}</strong> items
            </p>
          </div>
        )}

      {!isLoading &&
      searchResults.collections.length === 0 &&
      searchResults.items.length === 0 ? (
        <div className="flex flex-1 justify-center items-center h-full text-gray-500">
          <p>No collections or items found.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {searchResults.collections.map((collection) => (
            <li key={collection._id} className="py-2">
              Collection:{" "}
              <Link
                to={`/collections/${collection._id}/items?userId=${collection.createdBy}`}
                className="text-blue-500 hover:underline"
              >
                {collection.title}
              </Link>
              by {collection.createdBy}
            </li>
          ))}
          {searchResults.items.map((item) => (
            <li key={item._id} className="py-2">
              Item:{" "}
              <Link
                to={`/collections/${item.collectionId}/items/${item._id}?userId=${item.createdBy}`}
                className="text-blue-500 hover:underline"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchPage;
