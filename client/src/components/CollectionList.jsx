import CollectionCard from "./CollectionCard";
import { useCollections } from "../hooks/useCollections";
import Spinner from "./Spinner";

const CollectionList = () => {
  const { collections, isLoading, error } = useCollections();

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full w-full">
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error.message}</div>
      ) : collections.length === 0 ? (
        <div className="my-auto text-center text-gray-500">
          No collections found. Create a new collection to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((collection) => (
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
      )}
    </>
  );
};

export default CollectionList;
