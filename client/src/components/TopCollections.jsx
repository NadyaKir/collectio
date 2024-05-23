import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { setTopCollections } from "../store/collectionsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function TopCollections() {
  const dispatch = useDispatch();
  const topCollections = useSelector(
    (state) => state.collections.topCollections
  );

  useEffect(() => {
    const fetchTopCollections = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/collections/top`);
        const topCollections = response.data;
        dispatch(setTopCollections(topCollections));
      } catch (error) {
        console.error("Error while getting top collections:", error);
      }
    };

    fetchTopCollections();
  }, [dispatch]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Number of items</th>
            <th className="px-4 py-2">Created by</th>
          </tr>
        </thead>
        <tbody>
          {topCollections.map((collection, index) => (
            <tr key={collection._id} className="border-b border-gray-200">
              <td className="px-4 py-2 text-center">{index + 1}</td>
              <td className="px-4 py-2">
                <Link
                  to={`/collections/${collection.collectionId}/items?userId=${collection.userId}`}
                  className="hover:text-teal-700 cursor-pointer"
                >
                  {collection.title}
                </Link>
              </td>
              <td className="px-4 py-2 font-bold text-center">
                {collection.numberOfItems}
              </td>
              <td className="px-4 py-2">
                <Link
                  to={`/collections?userId=${collection.userId}&&collectionId=${collection.collectionId}`}
                  className="hover:text-teal-700 cursor-pointer"
                >
                  {collection.username}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
