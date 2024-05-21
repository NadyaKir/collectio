import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import ItemCard from "../components/ItemCard";
import { useParams } from "react-router-dom";

export default function CollectionItemPage() {
  const [item, setItem] = useState({});
  const { itemId } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/items/item/${itemId}`
        );
        const item = response.data.item;
        setItem(item);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItem();
  }, []);

  return (
    <div>
      <ItemCard item={item} />
    </div>
  );
}
