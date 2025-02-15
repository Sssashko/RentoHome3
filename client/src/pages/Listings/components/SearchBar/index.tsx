import { useFiltersStore } from 'store';

const SearchBar = () => {
  const { searchTitle, setSearchTitle } = useFiltersStore();

  return (
    <div className="my-4 hidden md:flex flex-col gap-2 items-start rounded-lg bg-white dark:bg-gray-800 shadow p-4 text-gray-800 dark:text-white ml-8 w-60"> 
      <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
        Search
      </h2>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
