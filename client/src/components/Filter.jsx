export default function Filter({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <>
      <button className="mr-2" onClick={() => setSelectedCategory("")}>
        Reset
      </button>
      <select
        className="block w-full py-1 mr-4 px-2 border border-gray-300 bg-white dark:bg-gray-800/[.3] rounded-md shadow-sm focus:outline-none focus:ring-teal-600 focus:border-teal-700 sm:text-sm"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select category...</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
}
