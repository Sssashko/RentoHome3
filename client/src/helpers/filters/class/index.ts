import { Classes } from 'store/filters/types'
import { Class } from 'types'

const classFilter = (classType: Class, classes: Classes) => {
	if (!classes.Budget && classes.Medium && !classes.Premium) {
		return true
	} else {
		return classes[classType]
	}
}

export default classFilter
