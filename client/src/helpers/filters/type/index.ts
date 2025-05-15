import { Types } from 'store/filters/types'
import { Type } from 'types'

/**
 * Like other filters:
 * - If no type is selected, pass all homes.
 * - Otherwise only pass homes of selected types.
 */
const typeFilter = (type: Type, types: Types): boolean => {
  // if neither “Apartament” nor “House” is checked, show all
  if (!types.Apartament && !types.House) {
    return true
  }
  // otherwise check the specific type flag
  return types[type]
}

export default typeFilter
