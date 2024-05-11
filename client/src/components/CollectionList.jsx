import CollectionCard from "./CollectionCard";

const CollectionList = ({ collections }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {collections.map((collection) => (
        <CollectionCard
          key={collection._id}
          name={collection.name}
          image={collection.image}
          category={collection.category}
          description={collection.description}
        />
      ))}
    </div>
  );
};

export default CollectionList;
