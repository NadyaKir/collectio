import LastItems from "../components/LastItems";
import TopCollections from "../components/TopCollections";
import TagsCloud from "../components/TagsCloud";

export default function HomePage() {
  return (
    <>
      <div className="mt-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Last items</h2>
        <LastItems />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Top biggest collections</h2>
        <TopCollections />
      </div>
      <div className="items-center">
        <h2 className="text-xl font-bold mb-4">Tags cloud</h2>
        <TagsCloud />
      </div>
    </>
  );
}
