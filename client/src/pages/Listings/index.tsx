import { Homes, Filters, Sorting, SearchBar } from './components';

const HomesPage = () => (
  <div className="flex justify-center bg-gray-150 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
    {/* Sidebar Filters */}
    <div className="hidden md:block ml-4 mr-4">
      <Filters />
      <Sorting />
      <SearchBar/>
    </div>

    {/* Homes List */}
    <div className="flex-1">
      <Homes />
    </div>
  </div>
);

export default HomesPage;
