import { typeFilter, priceFilter, countryFilter, classFilter } from 'helpers/filters';
import { useHomesStore, useFiltersStore } from 'store';

const useFilteredHomes = () => {
  const { homes } = useHomesStore();
  const { types, countries, classes, priceRange, sortBy, searchTitle } = useFiltersStore();

  // 1) Фильтрация
  const filtered = homes
    .filter(({ type }) => typeFilter(type, types))
    .filter(({ price }) => priceFilter(price, priceRange))
    .filter(({ country }) => countryFilter(country, countries))
    .filter(({ class: homeClass }) => classFilter(homeClass, classes))
    .filter(({ title }) => title.toLowerCase().includes(searchTitle.toLowerCase())); // 🔍 Фильтр по названию

  // 2) Сортировка
  const sorted = [...filtered];
  if (sortBy === 'priceAsc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'priceDesc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'titleAsc') {
    sorted.sort((a, b) => a.title.localeCompare(b.title)); // A → Z
  } else if (sortBy === 'titleDesc') {
    sorted.sort((a, b) => b.title.localeCompare(a.title)); // Z → A
  }

  return sorted;
};

export default useFilteredHomes;
