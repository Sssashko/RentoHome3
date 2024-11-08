interface PriceRange {
	minimum?: number
	maximum?: number
}

interface Countries {
	latvia: boolean
	estonia: boolean
}

interface Classes {
	budget: boolean
	medium: boolean
	premium: boolean
}

export { PriceRange, Countries, Classes }
