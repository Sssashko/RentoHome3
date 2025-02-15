type Type = 'Apartament' | 'House'
type Country = 'Latvia' | 'Estonia'
type Class = 'Budget' | 'Medium' | 'Premium'

interface Home {
	id: number
	title: string
	price: number
	square: string
	type: Type
	class: Class
	country: Country
	description: string
	user: User
	images: Image[]
}

interface User {
	id: number
	username: string
	email: string
	avatar: string
	password: string
}

interface Image {
	name: string
	originalName: string
	url: string
}

export { type Home, type Image, type User }
