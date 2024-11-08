type Country = 'latvia' | 'estonia'
type Class = 'budget' | 'medium' | 'premium' 

interface Car {
	id: number
	model: string
	year: number
	price: number
	power: string
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
}

interface Image {
	name: string
	originalName: string
	url: string
}

export { type Car, type Image, type User }
