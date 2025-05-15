import { useFiltersStore } from 'store'  // Zustand store for filter state
import { Type } from 'types'
import { CheckBox } from 'components/ui'

// List of all possible property types
const allTypes: Type[] = ['Apartament', 'House']

const TypeFilter = () => {
  // Get current type filter state and toggle action
  const { types, switchType } = useFiltersStore()

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-800 dark:text-white">
      <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
        Type
      </h2>

      {/* "All" toggle clears or sets all type filters */}
      <div
        className="flex items-center gap-2 mb-3 cursor-pointer"
        onClick={() => allTypes.forEach((type) => switchType(type))}
      >
        {/* Active when no single type is selected */}
        <CheckBox active={Object.values(types).every((v) => !v)} />
        <span className="font-semibold">ALL</span>
      </div>

      {/* Individual type toggles */}
      {allTypes.map((type) => (
        <div
          key={type}
          className="flex items-center gap-2 mb-2 cursor-pointer"
          onClick={() => switchType(type)}  // Toggle this type on/off
        >
          <CheckBox active={types[type]} />
          <span className="font-semibold">{type.toUpperCase()}</span>
        </div>
      ))}
    </div>
  )
}

export default TypeFilter
