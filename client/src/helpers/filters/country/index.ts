import { Countries } from 'store/filters/types'
import { Country } from 'types'

/**
 * Like classFilter but for countries:
 * - If no country is selected, show all homes.
 * - Otherwise only show homes in selected countries.
 */
const countryFilter = (country: Country, countries: Countries): boolean => {
  // if no country filters are active, show everything
  if (!countries.Latvia && !countries.Estonia && !countries.Lithuania) {
    return true
  }
  // otherwise check the specific country flag
  return countries[country]
}

export default countryFilter
