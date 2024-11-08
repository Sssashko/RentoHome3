const typeFilter = (query: string, types: string[]) => {
	if (!types.length) return true
	for (let type of types) {
		if (query.toLowerCase().includes(type.toLowerCase())) {
			return true
		}
	}
	return false
}

export default typeFilter
