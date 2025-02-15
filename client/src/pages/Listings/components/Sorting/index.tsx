import { useState, useRef, useEffect } from 'react';
import { useFiltersStore } from 'store';
import { FaSortAmountDown, FaSortAmountUp, FaChevronUp, FaChevronDown } from 'react-icons/fa';

const Sorting = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const { sortBy, setSortBy } = useFiltersStore();

  // Цена
  const handleSortPriceAsc = () => setSortBy('priceAsc');
  const handleSortPriceDesc = () => setSortBy('priceDesc');
  // Алфавит
  const handleSortTitleAsc = () => setSortBy('titleAsc');
  const handleSortTitleDesc = () => setSortBy('titleDesc');
  const handleSortNone = () => setSortBy('none');

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isExpanded]);

  return (
    <div className="my-4 hidden md:flex flex-col gap-2 items-center rounded-lg bg-white dark:bg-gray-800 shadow p-4 text-gray-800 dark:text-white ml-8 w-60">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Sorting</h2>
        {isExpanded ? (
          <FaChevronUp className="text-blue-600 dark:text-blue-400 transition-transform duration-200" />
        ) : (
          <FaChevronDown className="text-blue-600 dark:text-blue-400 transition-transform duration-200" />
        )}
      </div>

      <div
        ref={contentRef}
        className="w-full overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isExpanded ? `${contentHeight}px` : '0px' }}
      >
        {/* Sort by Price */}
        <div className="flex flex-col items-start gap-2 mb-3 mt-2">
          <button
            onClick={handleSortPriceAsc}
            className={`flex items-center gap-1 px-4 py-1 rounded ${
              sortBy === 'priceAsc' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            <FaSortAmountUp />
            Price Asc
          </button>

          <button
            onClick={handleSortPriceDesc}
            className={`flex items-center gap-1 px-4 py-1 rounded ${
              sortBy === 'priceDesc' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            <FaSortAmountDown />
            Price Desc
          </button>
        </div>

        {/* Sort by Title */}
        <div className="flex flex-col items-start gap-2 mb-3">
          <button
            onClick={handleSortTitleAsc}
            className={`flex items-center gap-1 px-4 py-1 rounded ${
              sortBy === 'titleAsc' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            A → Z
          </button>

          <button
            onClick={handleSortTitleDesc}
            className={`flex items-center gap-1 px-4 py-1 rounded ${
              sortBy === 'titleDesc' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            Z → A
          </button>
        </div>

        {/* Clear Sort */}
        <button
          onClick={handleSortNone}
          className={`px-4 py-1 mb-2 rounded font-semibold ${
            sortBy === 'none' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-200'
          }`}
        >
          Clear Sort
        </button>
      </div>
    </div>
  );
};

export default Sorting;
