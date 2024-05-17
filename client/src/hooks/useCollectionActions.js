import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../utils/config";
import { setCollections } from "../store/collectionsSlice";
import { fileToBase64 } from "file64";

export const useCollectionActions = (dispatch) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const collections = useSelector((state) => state.collections.collections);

  const handleSaveClick = async (values, _id) => {
    const image64 =
      values.image instanceof File
        ? await fileToBase64(values.image)
        : values.image;

    const updatedCollectionWithBase64Image = {
      ...values,
      image: image64,
    };
    try {
      const response = await axios.put(
        `${SERVER_URL}/api/collections/update/${_id}`,
        updatedCollectionWithBase64Image
      );

      const updatedCollections = collections.map((collection) => {
        if (collection._id === _id) {
          return response.data;
        } else {
          return collection;
        }
      });

      dispatch(setCollections(updatedCollections));
      setSelectedImage(null);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleDeleteClick = async (_id) => {
    console.log(_id);
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`${SERVER_URL}/api/collections/delete/${_id}`);
      dispatch(
        setCollections(
          collections.filter((collection) => collection._id !== _id)
        )
      );
      console.log("Collection deleted successfully");
    } catch (error) {
      setError(error);
      console.error("Error deleting collection:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    collections,
    handleSaveClick,
    handleDeleteClick,
    isLoading,
    error,
    selectedImage,
    setSelectedImage,
  };
};
