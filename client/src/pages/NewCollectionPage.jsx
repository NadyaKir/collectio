import Header from "../components/Layout/Header";
import CollectionForm from "../components/CollectionForm";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_URL } from "../utils/config";
import axios from "axios";

export default function NewCollectionPage() {
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
  });

  const { collectionId } = useParams();

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        if (collectionId) {
          const response = await axios.get(
            `${SERVER_URL}/api/collections/collection/${collectionId}`
          );
          const collectionData = response.data;

          setInitialValues({
            title: collectionData.title || "",
            description: collectionData.description || "",
            category: collectionData.category || "",
            image: collectionData.image || null,
          });
        } else {
          setInitialValues({
            title: "",
            description: "",
            category: "",
            image: null,
          });
        }
      } catch (error) {
        console.error("Error fetching collection:", error);
      }
    };

    fetchCollection();
  }, [collectionId]);

  return (
    <>
      <Header title="Add new collection" />
      <CollectionForm
        key={JSON.stringify(initialValues)}
        initialValues={initialValues}
      />
    </>
  );
}
