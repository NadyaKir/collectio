import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { setTopCollections } from "../store/collectionsSlice";
import { setLastItems } from "../store/itemSlice";
import TagsCloud from "../components/TagsCloud";

export default function HomePage() {
  const dispatch = useDispatch();
  const lastItems = useSelector((state) => state.items.lastItems);
  const topCollections = useSelector(
    (state) => state.collections.topCollections
  );

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
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Last items:</h2>
        <div className="grid  xs:grid-col-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {lastItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-between h-full border p-4 rounded-lg"
            >
              <h2 className="text-xl font-bold">
                <Link className=" hover:text-teal-600">{item.title}</Link>
              </h2>
              <div>
                Collection:{" "}
                <Link className=" hover:text-teal-600">
                  {item.collectionId.title}
                </Link>
              </div>
              <div>
                Created by:{" "}
                <Link className="text-lg hover:text-teal-600">
                  {item.createdBy.username}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">The biggest collections:</h2>
        <ul>
          {topCollections.map((collection) => (
            <li>{collection.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Tags cloud:</h2>
        <div className="flex flex-wrap items-center">
          <TagsCloud />
        </div>
      </div>
    </div>
  );
}
