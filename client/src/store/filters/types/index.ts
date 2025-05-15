// numeric price range with optional bounds
	interface PriceRange {
	minimum?: number;  // optional lower bound
	maximum?: number;  // optional upper bound
  }
  
  // toggles for home types
  interface Types {
	Apartament: boolean;
	House: boolean;
  }
  
  // toggles for available countries
   interface Countries {
	Latvia: boolean;
	Estonia: boolean;
	Lithuania: boolean;
  }
  
  // toggles for class tiers
   interface Classes {
	Budget: boolean;
	Medium: boolean;
	Premium: boolean;
  }
  
  export { PriceRange, Types, Countries, Classes };
  