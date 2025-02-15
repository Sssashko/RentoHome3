import { useFiltersStore } from 'store'
import { Type } from 'types'
import { CheckBox } from 'components/ui'

const allTypes: Type[] = ['Apartament', 'House']

const TypeFilter = () => {
  const { types, switchType } = useFiltersStore()

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-800 dark:text-white">
      <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">Type</h2>

      {/* "All" toggle */}
      <div
        className="flex items-center gap-2 mb-3 cursor-pointer"
        onClick={() => allTypes.forEach((type) => switchType(type))}
      >
        <CheckBox
          active={Object.values(types).every((value) => !value)}
        />
        <span className="font-semibold">ALL</span>
      </div>

      {/* Individual toggles */}
      {allTypes.map((type) => (
        <div
          className="flex items-center gap-2 mb-2 cursor-pointer"
          onClick={() => switchType(type)}
          key={type}
        >
          <CheckBox active={types[type]} />
          <span className="font-semibold">{type.toUpperCase()}</span>
        </div>
      ))}
    </div>
  )
}

export default TypeFilter
