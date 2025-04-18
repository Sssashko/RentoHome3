import { Countries } from 'store/filters/types'
import { Country } from 'types'

const countryFilter = (country: Country, countries: Countries) => {
	if (!countries.Latvia && !countries.Estonia && !countries.Lithuania) {
		return true
	} else {
		return countries[country]
	}
}

export default countryFilter
