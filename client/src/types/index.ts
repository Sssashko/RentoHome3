type Type = 'Apartament' | 'House';           // allowed home types
type Country = 'Latvia' | 'Estonia' | 'Lithuania'; // allowed countries
type Class = 'Budget' | 'Medium' | 'Premium'; // allowed class tiers

interface Home {
  id: number;               // unique home ID
  title: string;            // home title
  price: number;            // numeric price
  square: string;           // size string (e.g. "50m²")
  type: Type;               // home type
  class: Class;             // quality tier
  country: Country;         // location country
  description: string;      // full description
  likes: number;            // like count
  user: User;               // owner data
  images: Image[];          // image metadata array
}

interface User {
  id: number;               // user ID
  username: string;         // display name
  email: string;            // contact email
  avatar: string;           // avatar URL
  password: string;         // stored password hash
}

interface Image {
  name: string;             // internal filename
  originalName: string;     // original upload name
  url: string;              // image URL
}

export { Type, Country, Class, Home, User, Image };

export interface Comment {
  id: number;
  home_id: number;          // linked home
  user_id: number;          // commenter
  text: string;             // comment text
  created_at?: string;      // timestamp (optional)
}

export interface Like {
  id: number;
  home_id: number;          // liked home
  user_id: number;          // who liked
}
