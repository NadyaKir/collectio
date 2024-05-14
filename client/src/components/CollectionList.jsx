import CollectionCard from "./CollectionCard";
import getTokenData from "../utils/getTokenData";
import { useSelector } from "react-redux";
import { useCollections } from "../hooks/useCollections";

const CollectionList = () => {
  const collections = useSelector((state) => state.collections.collections);
  const { userId } = getTokenData();

  const userCollections = collections.filter(
    (collection) => collection.createdBy === userId
  );

  useCollections();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {userCollections.map((collection) => (
        <CollectionCard
          _id={collection._id}
          key={collection._id}
          title={collection.title}
          image={collection.image}
          category={collection.category}
          description={collection.description}
        />
      ))}
    </div>
  );
};

export default CollectionList;
