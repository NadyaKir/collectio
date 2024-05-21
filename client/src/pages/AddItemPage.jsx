import Header from "../components/Layout/Header";
import ItemForm from "../components/ItemForm";
import { useFetchItem } from "../hooks/useFetchItem";

export default function AddItemPage() {
  const { initialValues, tags, setTags } = useFetchItem();

  return (
    <>
      <Header title="Add item" />
      <ItemForm
        key={JSON.stringify(initialValues)}
        initialValues={initialValues}
        tags={tags}
        setTags={setTags}
      />
    </>
  );
}
