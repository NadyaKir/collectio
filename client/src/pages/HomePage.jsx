import LastItems from "../components/LastItems";
import TopCollections from "../components/TopCollections";
import TagsCloud from "../components/TagsCloud";

export default function HomePage() {
  return (
    <div className="p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Last items</h2>
        <LastItems />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Top biggest collections</h2>
        <TopCollections />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Tags cloud</h2>
        <div className="flex flex-wrap items-center">
          <TagsCloud />
        </div>
      </div>
    </div>
  );
}
