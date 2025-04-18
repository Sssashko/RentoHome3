import { create } from 'zustand'
import { PriceRange, Types, Countries, Classes } from './types'
import { Type, Country, Class } from 'types'

// 1) Объяви SortBy здесь (или выше)
type SortBy = 'none' | 'priceAsc' | 'priceDesc' | 'titleAsc' | 'titleDesc';

interface Filters {
  types: Types
  priceRange: PriceRange
  countries: Countries
  classes: Classes
  switchType: (type: Type) => void
  switchTransition: (country: Country) => void
  switchClass: (classType: Class) => void
  setPriceFilters: (priceRange: PriceRange) => void

  // Новые поля
  sortBy: SortBy
  setSortBy: (value: SortBy) => void

  // Поля для поиска
  searchTitle: string
  setSearchTitle: (title: string) => void
}

const useFiltersStore = create<Filters>()((set) => ({
  // Старые поля
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
    Estonia: true,
    Lithuania: true
  },
  classes: {
    Budget: true,
    Medium: true,
    Premium: true
  },

  switchType: (type) => {
    set((state) => {
      const types = { ...state.types }
      types[type] = !types[type]
      return { ...state, types }
    })
  },
  switchTransition: (country) => {
    set((state) => ({
      ...state,
      countries: {
        ...state.countries,
        [country]: !state.countries[country]
      }
    }))
  },
  switchClass: (classType) => {
    set((state) => ({
      ...state,
      classes: {
        ...state.classes,
        [classType]: !state.classes[classType]
      }
    }))
  },
  setPriceFilters: (priceRange) => {
    set((state) => ({
      ...state,
      priceRange: {
        ...state.priceRange,
        ...priceRange
      }
    }))
  },

  // Новые поля
  sortBy: 'none',
  setSortBy: (value) => set((state) => ({
    ...state,
    sortBy: value
  })),

  // Добавлено поле поиска
  searchTitle: '',
  setSearchTitle: (title) => set({ searchTitle: title })
}))

export default useFiltersStore
