import { Class } from 'types'
import { Classes } from 'store/filters/types'

/**
 * Passes a home if:
 * 1) No checkboxes are active (show all).
 * 2) Otherwise, only those whose class is selected.
 */
const classFilter = (homeClass: Class, classes: Classes): boolean => {
  // if none of the class filters is on, don't filter anything
  if (!classes.Budget && !classes.Medium && !classes.Premium) {
    return true
  }
  // otherwise only pass homes whose class matches an active filter
  return classes[homeClass]
}

export default classFilter
