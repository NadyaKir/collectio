import Header from "../components/Layout/Header";
import ItemForm from "../components/ItemForm";
import { useParams } from "react-router-dom";
import { useFetchItem } from "../hooks/useFetchItem";

export default function UpdateItemPage() {
  const { itemId } = useParams();
  const { initialValues, tags, setTags } = useFetchItem(itemId);

  return (
    <>
      <Header title="Update item" />
      <ItemForm
        key={JSON.stringify(initialValues)}
        initialValues={initialValues}
        tags={tags}
        setTags={setTags}
      />
    </>
  );
}
