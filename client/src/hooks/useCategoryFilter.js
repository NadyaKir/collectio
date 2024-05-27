import { useState } from "react";
import { useSelector } from "react-redux";

export default function useCategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = useSelector((state) => state.collections.categories);

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
  };
}
