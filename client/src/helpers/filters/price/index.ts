import { PriceRange } from 'store/filters/types'

/**
 * Filters by price range:
 * - If both min & max are set, price must lie between.
 * - If only min is set, price must be >= min.
 * - If only max is set, price must be <= max.
 * - If none set, show all.
 */
const priceFilter = (price: number, priceRange: PriceRange): boolean => {
  const { minimum, maximum } = priceRange

  if (minimum && maximum) {
    // both ends defined
    return minimum <= price && price <= maximum
  } else if (minimum) {
    // only minimum defined
    return minimum <= price
  } else if (maximum) {
    // only maximum defined
    return price <= maximum
  } else {
    // no bounds defined
    return true
  }
}

export default priceFilter
