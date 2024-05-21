import Header from "../components/Layout/Header";
import CollectionForm from "../components/CollectionForm";
import { useFetchCollection } from "../hooks/useFetchCollection";

export default function NewCollectionPage() {
  const { initialValues } = useFetchCollection();

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
