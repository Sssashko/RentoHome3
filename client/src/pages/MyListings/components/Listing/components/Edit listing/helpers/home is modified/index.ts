import { Home, Image } from 'types'

type Modified = Omit<Home, 'images'> & { images: (Image | File)[] }

const homeIsModified = (home: Home, modified: Modified) => {
	for (let key of Object.keys(home) as (keyof Home)[]) {
		if (JSON.stringify(home[key]) !== JSON.stringify(modified[key])) {
			return true
		}
	}
	return false
}

export default homeIsModified
