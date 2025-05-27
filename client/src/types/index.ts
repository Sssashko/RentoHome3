type Type = 'Apartament' | 'House';           // allowed home types
type Country = 'Latvia' | 'Estonia' | 'Lithuania'; // allowed countries
type Class = 'Budget' | 'Medium' | 'Premium'; // allowed class tiers

interface Home {
  id: number;               
  title: string;            
  price: number;            
  square: string;           
  type: Type;               
  class: Class;             
  country: Country;         
  description: string;      
  likes: number;            
  user: User;               // owner data
  images: Image[];          // image metadata array
  owner: string | null
}

interface User {
  id: number;               
  username: string;         
  email: string;            
  avatar: string;           
  password: string;         
  role: 'user' | 'admin'   
}

interface Image {
  name: string;             
  originalName: string;     
  url: string;              
}

export { Type, Country, Class, Home, User, Image };

export interface Comment {
  id: number;
  home_id: number;          
  user_id: number;          
  text: string;             
  created_at?: string;      // timestamp (optional)
}

export interface Like {
  id: number;
  home_id: number;          
  user_id: number;          
}
