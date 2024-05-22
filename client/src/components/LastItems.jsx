import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { setLastItems } from "../store/itemSlice";

export default function LastItems() {
  const dispatch = useDispatch();
  const lastItems = useSelector((state) => state.items.lastItems);

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
    <div className="grid  xs:grid-col-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {lastItems.map((item) => (
        <div
          key={item._id}
          className="flex flex-col justify-between h-full border p-4 rounded-lg"
        >
          <h2 className="text-xl font-bold">
            <Link
              to={`/collections/${item.collectionId._id}/items/${item._id}?userId=${item.createdBy._id}`}
              className=" hover:text-teal-600"
            >
              {item.title}
            </Link>
          </h2>
          <div>
            Collection:{" "}
            <Link
              to={`/collections/${item.collectionId._id}/items?userId=${item.createdBy._id}`}
              className=" hover:text-teal-600"
            >
              {item.collectionId.title}
            </Link>
          </div>
          <div>
            Created by:{" "}
            <Link
              to={`/collections?userId=${item.createdBy._id}&&collectionId=${item.collectionId._id}`}
              className="text-lg hover:text-teal-600"
            >
              {item.createdBy.username}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
