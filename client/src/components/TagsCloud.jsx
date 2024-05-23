import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Импортируем Link из react-router-dom
import { setSearchQuery } from "../store/searchSlice";
import { TagCloud } from "react-tagcloud";
import { useFetchTags } from "../hooks/useFetchTags";
import Chip from "./Chip";

export default function TagsCloud() {
  const dispatch = useDispatch();
  useFetchTags();

  const tags = useSelector((state) => state.tags.tags);

  const handleTagClick = (tag) => {
    dispatch(setSearchQuery(tag.value));
    dispatch(setSearchQuery(""));
  };

  const customRenderer = (tag) => (
    <Link key={tag._id} to={`/search?searchQuery=${tag.value}`}>
      <Chip title={tag.name} marginRight="mr-2" />
    </Link>
  );

  return (
    <div className="overflow-y-scroll">
      <TagCloud
        tags={tags}
        minSize={1}
        maxSize={3}
        renderer={customRenderer}
        onClick={(tag) => handleTagClick(tag)}
      />
    </div>
  );
}
