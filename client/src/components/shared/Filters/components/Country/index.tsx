import { useFiltersStore } from 'store'
import { Country } from 'types'
import { CheckBox } from 'components/ui'

const countriesArray: Country[] = ['Latvia', 'Estonia', 'Lithuania']

const CountrySelect = () => {
  const { countries, switchTransition } = useFiltersStore()

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-800 dark:text-white">
      <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">Country</h2>
      {countriesArray.map((country) => (
        <div
          key={country}
          className="flex items-center gap-2 mb-2 cursor-pointer"
          onClick={() => switchTransition(country)}
        >
          <CheckBox active={countries[country]} />
          <span className="font-semibold">
            {country[0].toUpperCase() + country.slice(1)}
          </span>
        </div>
      ))}
    </div>
  )
}

export default CountrySelect
