import { Home, Image } from 'types'

// Modified is same as Home but allows image entries to be either existing Image or new File
type Modified = Omit<Home, 'images'> & { images: (Image | File)[] }

// returns true if any non-image field in `home` differs from `modified`
// — helps avoid unnecessary updates when nothing actually changed
const homeIsModified = (home: Home, modified: Modified) => {
  for (let key of Object.keys(home) as (keyof Home)[]) {
    // compare values deeply by stringifying
    if (JSON.stringify(home[key]) !== JSON.stringify(modified[key])) {
      return true
    }
  }
  return false
}

export default homeIsModified
