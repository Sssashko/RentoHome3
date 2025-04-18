interface PriceRange {
	minimum?: number
	maximum?: number
}

interface Types {
	Apartament: boolean
	House: boolean
}

interface Countries {
	Latvia: boolean
	Estonia: boolean
	Lithuania: boolean
}

interface Classes {
	Budget: boolean
	Medium: boolean
	Premium: boolean
}

export { PriceRange, Types, Countries, Classes }
