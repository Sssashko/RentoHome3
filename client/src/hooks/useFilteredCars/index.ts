import { typeFilter, priceFilter, countryFilter, classFilter } from 'helpers/filters'
import { useCarsStore, useFiltersStore } from 'store'

const useFilteredCars = () => {
	const { cars } = useCarsStore()
	const { types, countries, classes, priceRange } = useFiltersStore() // Renamed `makes` to `types`

	return cars
		.filter(({ model }) => typeFilter(model, types)) // Renamed `makeFilter` to `typeFilter` and `makes` to `types`
		.filter(({ price }) => priceFilter(price, priceRange))
		.filter(({ country }) => countryFilter(country, countries))
		.filter(({ class: carClass }) => classFilter(carClass, classes)) // `class` renamed to `carClass`
}

export default useFilteredCars
