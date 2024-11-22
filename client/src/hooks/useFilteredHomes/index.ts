import { typeFilter, priceFilter, countryFilter, classFilter } from 'helpers/filters'
import { useHomesStore, useFiltersStore } from 'store'

const useFilteredHomes = () => {
	const { homes } = useHomesStore()
	const { types, countries, classes, priceRange } = useFiltersStore() 

	return homes
		.filter(({ type }) => typeFilter(type, types)) 
		.filter(({ price }) => priceFilter(price, priceRange))
		.filter(({ country }) => countryFilter(country, countries))
		.filter(({ class: homeClass }) => classFilter(homeClass, classes)) 
}

export default useFilteredHomes
