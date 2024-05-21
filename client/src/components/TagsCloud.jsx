import { useSelector } from "react-redux";
import { TagCloud } from "react-tagcloud";
import { useFetchTags } from "../hooks/useFetchTags";

export default function TagsCloud() {
  useFetchTags();

  const tags = useSelector((state) => state.tags.tags);

  const modifiedTags = tags.map((tag) => ({
    value: tag.name,
    count: Math.floor(Math.random() * 11) + 20,
    ...tag,
  }));

  const customRenderer = (tag, size, color) => (
    <span
      key={tag.value}
      style={{
        animation: "blinker 3s linear infinite",
        animationDelay: `${Math.random() * 2}s`,
        fontSize: `${size / 2}em`,
        border: `1px solid ${color}`,
        borderRadius: "0.6em",
        padding: "0.1rem 1rem",
        margin: "0.1rem 0.3rem",
        display: "inline-block",
        color: "black",
        cursor: "pointer",
      }}
    >
      #{tag.value}
    </span>
  );

  return (
    <div className="h-40 flex flex-1 overflow-y-scroll">
      <TagCloud
        tags={modifiedTags}
        minSize={1}
        maxSize={3}
        colorOptions={{
          luminosity: "dark",
          hue: "blue",
        }}
        renderer={customRenderer}
        onClick={(tag) => alert(`'${tag.value}' was selected!`)}
      />
    </div>
  );
}
