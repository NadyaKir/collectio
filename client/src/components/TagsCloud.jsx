import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setSearchQuery } from "../store/searchSlice";
import { TagCloud } from "react-tagcloud";
import { useFetchTags } from "../hooks/useFetchTags";
import Chip from "./Chip";

export default function TagsCloud() {
  const dispatch = useDispatch();
  useFetchTags();

  const tags = useSelector((state) => state.tags.tags);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("searchQuery");

    if (searchQuery) {
      dispatch(setSearchQuery(searchQuery));
    }
  }, [location, dispatch]);

  const customRenderer = (tag) => (
    <Link key={tag._id} to={`/search?searchQuery=${tag.name}`}>
      <Chip title={tag.name} marginRight="mr-2" />
    </Link>
  );

  return (
    <div className="overflow-y-scroll">
      <TagCloud tags={tags} minSize={1} maxSize={3} renderer={customRenderer} />
    </div>
  );
}
