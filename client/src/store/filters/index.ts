import { Country, Class } from 'types'
import { create } from 'zustand'

import { PriceRange, Countries, Classes } from './types'

interface Filters {
	types: string[] // Renamed `makes` to `types`
	priceRange: PriceRange
	countries: Countries
	classes: Classes

	applyTypeFilter: (type: string) => void // Renamed `applyMakeFilter` to `applyTypeFilter`
	unApplyTypeFilter: (type: string) => void // Renamed `unApplyMakeFilter` to `unApplyTypeFilter`

	switchTransition: (country: Country) => void
	switchClass: (classType: Class) => void

	setPriceFilters: (priceRange: PriceRange) => void
}

const useFiltersStore = create<Filters>()((set) => ({
	types: [], // Renamed `makes` to `types`
	priceRange: {},
	countries: {
		latvia: true,
		estonia: true
	},
	classes: {
		budget: true,
		medium: true,
		premium: true
	},
	applyTypeFilter: (item) => { // Renamed `applyMakeFilter` to `applyTypeFilter`
		set((state) => {
			const { types } = state
			types.push(item)
			return { ...state, types }
		})
	},
	unApplyTypeFilter: (item) => { // Renamed `unApplyMakeFilter` to `unApplyTypeFilter`
		set((state) => {
			const types = state.types.filter((element) => element !== item)
			return { ...state, types }
		})
	},

	switchTransition: (country) => {
		set((state) => {
			const { countries } = state
			countries[country] = !countries[country]
			return { ...state, countries }
		})
	},
	switchClass: (classType) => { // Renamed parameter from `class` to `classType`
		set((state) => {
			const classes = { ...state.classes }
			classes[classType] = !classes[classType]
			return { ...state, classes }
		})
	},
	setPriceFilters: (priceRange) => {
		set((state) => ({
			...state,
			priceRange: { ...state.priceRange, ...priceRange }
		}))
	}
}))

export default useFiltersStore
