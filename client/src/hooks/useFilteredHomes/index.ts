import { useMemo } from 'react';
import { typeFilter, priceFilter, countryFilter, classFilter } from 'helpers/filters';
import { useHomesStore, useFiltersStore } from 'store';

const useFilteredHomes = () => {
  const { homes } = useHomesStore();
  const { types, countries, classes, priceRange, sortBy, searchTitle } = useFiltersStore();

  const sorted = useMemo(() => {
    
    const filteredByType = homes.filter(({ type }) => typeFilter(type, types));
    
    const filteredByPrice = filteredByType.filter(({ price }) => priceFilter(price, priceRange));
    
    const filteredByCountry = filteredByPrice.filter(({ country }) => countryFilter(country, countries));
    
    const filteredByClass = filteredByCountry.filter(({ class: homeClass }) => classFilter(homeClass, classes));
    
    const filtered = filteredByClass.filter(({ title }) => title.toLowerCase().includes(searchTitle.toLowerCase()));
    
    const sortedHomes = [...filtered];
    if (sortBy === 'priceAsc') {
      sortedHomes.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      sortedHomes.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'titleAsc') {
      sortedHomes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'titleDesc') {
      sortedHomes.sort((a, b) => b.title.localeCompare(a.title));
    }
    return sortedHomes;
  }, [homes, types, countries, classes, priceRange, sortBy, searchTitle]);
  
  return sorted;
};

export default useFilteredHomes;
