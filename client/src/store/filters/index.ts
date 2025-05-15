import { create } from 'zustand';
import { PriceRange, Types, Countries, Classes } from './types';
import { Type, Country, Class } from 'types';

// sort options for the homes list
type SortBy = 'none' | 'priceAsc' | 'priceDesc' | 'titleAsc' | 'titleDesc';

interface Filters {
  types: Types;                 // which home types to include
  priceRange: PriceRange;       // filter by price range
  countries: Countries;         // which countries to include
  classes: Classes;             // which class tiers to include

  switchType: (type: Type) => void;       // toggle a home type
  switchTransition: (country: Country) => void; // toggle a country
  switchClass: (classType: Class) => void;      // toggle a class tier
  setPriceFilters: (priceRange: PriceRange) => void; // update price filters

  sortBy: SortBy;               // current sort selection
  setSortBy: (value: SortBy) => void; // update sort option

  searchTitle: string;          // text for title search
  setSearchTitle: (title: string) => void; // update search text
}

const useFiltersStore = create<Filters>()((set) => ({
  types: { Apartament: true, House: true },      // default: show all types
  priceRange: { minimum: 0, maximum: 0 },        // default price bounds
  countries: { Latvia: true, Estonia: true, Lithuania: true }, // all countries
  classes: { Budget: true, Medium: true, Premium: true }, // all tiers

  switchType: (type) => {
    set((state) => {
      const types = { ...state.types };
      types[type] = !types[type];              // flip selected type
      return { types };
    });
  },

  switchTransition: (country) => {
    set((state) => ({
      countries: {
        ...state.countries,
        [country]: !state.countries[country],  // flip country toggle
      },
    }));
  },

  switchClass: (classType) => {
    set((state) => ({
      classes: {
        ...state.classes,
        [classType]: !state.classes[classType], // flip class tier
      },
    }));
  },

  setPriceFilters: (priceRange) => {
    set((state) => ({
      priceRange: {
        ...state.priceRange,
        ...priceRange,                        // merge new bounds
      },
    }));
  },

  sortBy: 'none',                              // default: no sorting
  setSortBy: (value) => set({ sortBy: value }),// change sort order

  searchTitle: '',                             // default: empty search
  setSearchTitle: (title) => set({ searchTitle: title }), // update search
}));

export default useFiltersStore;
