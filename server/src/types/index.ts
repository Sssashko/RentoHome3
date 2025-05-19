// domain types for homes, users, images, comments, likes
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
  user: User         // owner info
  images: Image[]    // gallery URLs
}

interface User {
  id: number
  username: string
  email: string
  avatar: string     // profile picture URL
  password: string
}

interface Image {
  name: string           // stored filename
  originalName: string   // uploaded filename
  url: string            // public URL
}

export interface Comment {
  id: number
  home_id: number
  user_id: number
  text: string
  created_at?: string  // optional creation time
}

export interface Like {
  id: number
  home_id: number
  user_id: number
}

export { type Home, type Image, type User }
