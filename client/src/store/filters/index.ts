import { Type, Country, Class } from 'types'
import { create } from 'zustand'

import { PriceRange, Types, Countries, Classes } from './types'

interface Filters {
	types: Types
	priceRange: PriceRange
	countries: Countries
	classes: Classes

	switchType: (type: Type) => void 
	switchTransition: (country: Country) => void
	switchClass: (classType: Class) => void
	setPriceFilters: (priceRange: PriceRange) => void
}

const useFiltersStore = create<Filters>()((set) => ({
	types: {
		Apartament: true,
		House: true
	},
	priceRange: {
		minimum: 0,  
		maximum: 0
	},
	countries: {
		Latvia: true,
		Estonia: true
	},
	classes: {
		Budget: true,
		Medium: true,
		Premium: true
	},
	switchType: (type: Type) => {
		set((state) => {
			const types = { ...state.types }
			types[type] = !types[type] 
			return { ...state, types }
		})
	},
	switchTransition: (country: Country) => {
		set((state) => {
			return { 
				...state, 
				countries: { 
					...state.countries, 
					[country]: !state.countries[country] 
				} 
			}
		})
	},
	switchClass: (classType: Class) => { 
		set((state) => {
			return { 
				...state, 
				classes: { 
					...state.classes, 
					[classType]: !state.classes[classType] 
				} 
			}
		})
	},
	setPriceFilters: (priceRange: PriceRange) => {
		set((state) => ({
			...state,
			priceRange: { 
				...state.priceRange, 
				...priceRange 
			}
		}))
	}
}))

export default useFiltersStore
