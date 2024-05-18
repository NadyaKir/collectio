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
        console.log(topCollections);
        dispatch(setTopCollections(topCollections));
      } catch (error) {
        console.error("Error while getting top collections:", error);
      }
    };

    fetchTopCollections();
  }, []);
  return (
    <div>
      <ul>
        {topCollections.map((collection) => (
          <Link key={collection._id}>
            <li>{collection.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
