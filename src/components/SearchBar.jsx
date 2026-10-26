function SearchBar({ searchTerm, onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by author..."
      value={searchTerm}
      onChange={onSearch}
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
    />
  );
}

export default SearchBar;