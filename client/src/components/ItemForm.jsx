import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { useParams } from "react-router-dom";
import getTokenData from "../utils/getTokenData";

const ItemForm = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);

  const { userId } = getTokenData();
  const { collectionId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${SERVER_URL}/api/items/addItem`, {
        title,
        tags,
        collectionId,
        userId,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Теги (разделенные запятыми)"
        value={tags}
        onChange={(e) => setTags(e.target.value.split(","))}
      />
      <button type="submit">Добавить айтем коллекции</button>
    </form>
  );
};

export default ItemForm;
