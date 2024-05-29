import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { setLastItems } from "../store/itemSlice";
import Spinner from "../components/Spinner";

export default function LastItems() {
  const dispatch = useDispatch();
  const lastItems = useSelector((state) => state.items.lastItems);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLastItems = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${SERVER_URL}/api/items`);
        const items = response.data.items;
        dispatch(setLastItems(items));
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch last items error:", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchLastItems();
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!isLoading && lastItems.length === 0) {
    return <div>No last items</div>;
  }

  return (
    <div className="grid xs:grid-col-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-1">
      {lastItems.map((item) => (
        <div
          key={item._id}
          className="flex flex-col justify-between h-full border p-2 rounded-lg"
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
