type Type = 'Apartament' | 'House'
type Country = 'Latvia' | 'Estonia' | 'Lithuania'
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
	likes: number
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

export interface Comment {
	id: number;
	home_id: number;
	user_id: number;
	text: string;
	created_at?: string;
  }

export interface Like {
	id: number;
	home_id: number;
	user_id: number;
  }

export { type Home, type Image, type User }
