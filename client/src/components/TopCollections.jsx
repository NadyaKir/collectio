import { useEffect, useState } from "react";
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
    <table className="w-full divide-y divide-gray-200">
      <thead className="">
        <tr className="text-center">
          <th className="py-1 px-1">Position</th>
          <th className="py-1 px-1">Title</th>
          <th className="py-1 px-1">Number of items</th>
          <th className="py-1 px-1">Created by</th>
        </tr>
      </thead>
      <tbody>
        {topCollections.map((collection, index) => (
          <tr key={collection._id} className="border-b border-gray-300">
            <td className="py-1 px-1 text-center">
              <span
                className={`inline-flex items-center justify-center w-8 h-8  bg-gray-100 rounded-full ${
                  index < 3
                    ? index === 0
                      ? "bg-yellow-400"
                      : index === 1
                      ? "bg-gray-300"
                      : "bg-yellow-600"
                    : ""
                }`}
              >
                <span className="text-xs">{index + 1}</span>
              </span>
            </td>
            <td className="py-2 px-1 text-center">
              <Link className="hover:text-teal-700 cursor-pointer">
                {collection.title}
              </Link>
            </td>
            <td className="py-2 px-1 font-bold text-center">
              {collection.numberOfItems}
            </td>
            <td className="py-2 px-1 text-center">
              <Link className="hover:text-teal-700 cursor-pointer">
                {collection.userName}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
