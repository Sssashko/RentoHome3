import { useFiltersStore } from 'store'        // Zustand store for filter state
import { Country } from 'types'
import { CheckBox } from 'components/ui'

const countriesArray: Country[] = ['Latvia', 'Estonia', 'Lithuania']

const CountrySelect = () => {
  // Subscribe to current country filter state and toggle action
  const { countries, switchTransition } = useFiltersStore()

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-800 dark:text-white">
      <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
        Country
      </h2>
      {countriesArray.map((country) => (
        <div
          key={country}
          className="flex items-center gap-2 mb-2 cursor-pointer"
          // Toggle this country in the filter when clicked
          onClick={() => switchTransition(country)}
        >
          {/* Checkbox shows whether this country is currently active in filters */}
          <CheckBox active={countries[country]} />
          <span className="font-semibold">
            {country}
          </span>
        </div>
      ))}
    </div>
  )
}

export default CountrySelect
