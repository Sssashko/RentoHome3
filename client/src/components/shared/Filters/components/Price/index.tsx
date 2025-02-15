import { useFiltersStore } from 'store'

const Price = () => {
  const { priceRange, setPriceFilters } = useFiltersStore()

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-800 dark:text-white">
      <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">Price</h2>

      <div className="flex items-center gap-2">
        <input
          type="number"
          value={priceRange.minimum || ''}
          placeholder="Min"
          className="w-20 h-8 px-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
          onChange={(e) => setPriceFilters({ minimum: Number(e.target.value) })}
        />

        <span className="font-semibold text-gray-500 dark:text-gray-400">-</span>

        <input
          type="number"
          value={priceRange.maximum || ''}
          placeholder="Max"
          className="w-20 h-8 px-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
          onChange={(e) => setPriceFilters({ maximum: Number(e.target.value) })}
        />
      </div>
    </div>
  )
}

export default Price
