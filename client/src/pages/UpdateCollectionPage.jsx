import Header from "../components/Layout/Header";
import CollectionForm from "../components/CollectionForm";
import { useParams } from "react-router-dom";
import { useFetchCollection } from "../hooks/useFetchCollection";

export default function UpdateCollectionPage() {
  const { collectionId } = useParams();

  const initialValues = useFetchCollection(collectionId);

  return (
    <>
      <Header title="Update collection" />
      <CollectionForm
        key={JSON.stringify(initialValues)}
        initialValues={initialValues}
      />
    </>
  );
}
