import { Countries } from 'store/filters/types'
import { Country } from 'types'

const countryFilter = (country: Country, countries: Countries) => {
	if (!countries.latvia && !countries.estonia) {
		return true
	} else {
		return countries[country]
	}
}

export default countryFilter
