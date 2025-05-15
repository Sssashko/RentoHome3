// a hook that returns homes filtered & sorted according to your UI controls
import { useMemo } from 'react'
import { typeFilter, priceFilter, countryFilter, classFilter } from 'helpers/filters'
import { useHomesStore, useFiltersStore } from 'store'

const useFilteredHomes = () => {
  const { homes } = useHomesStore()               // all homes from global store
  const { types, countries, classes, priceRange, sortBy, searchTitle } = useFiltersStore()

  const sorted = useMemo(() => {
    // 1) filter by type
    const filteredByType = homes.filter(({ type }) => typeFilter(type, types))

    // 2) then by price range
    const filteredByPrice = filteredByType.filter(({ price }) =>
      priceFilter(price, priceRange)
    )

    // 3) then by country
    const filteredByCountry = filteredByPrice.filter(({ country }) =>
      countryFilter(country, countries)
    )

    // 4) then by class (Budget/Medium/Premium)
    const filteredByClass = filteredByCountry.filter(({ class: homeClass }) =>
      classFilter(homeClass, classes)
    )

    // 5) then by title search text
    const filtered = filteredByClass.filter(({ title }) =>
      title.toLowerCase().includes(searchTitle.toLowerCase())
    )

    // 6) make a copy to sort
    const sortedHomes = [...filtered]

    // 7) apply sort order
    if (sortBy === 'priceAsc') {
      sortedHomes.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'priceDesc') {
      sortedHomes.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'titleAsc') {
      sortedHomes.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'titleDesc') {
      sortedHomes.sort((a, b) => b.title.localeCompare(a.title))
    }

    return sortedHomes
  },
  // re-run whenever any input changes
  [homes, types, countries, classes, priceRange, sortBy, searchTitle]
  )

  return sorted
}

export default useFilteredHomes
