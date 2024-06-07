export default function Filter({ values, selectedValue, setSelectedValues }) {
  return (
    <>
      <button className="mr-2" onClick={() => setSelectedValues("")}>
        Reset
      </button>
      <select
        className="block w-full py-1 mr-4 px-2 border border-gray-300 bg-white dark:bg-gray-800/[.3] rounded-md shadow-sm focus:outline-none focus:ring-teal-600 focus:border-teal-700 sm:text-sm"
        value={selectedValue}
        onChange={(e) => setSelectedValues(e.target.value)}
      >
        <option value="">Select..</option>
        {values.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
}
