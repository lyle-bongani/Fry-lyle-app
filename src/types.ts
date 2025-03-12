export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  promo?: string;
  fee: string;
  image: string;
  isNew?: boolean;
  address?: string;
  phone?: string;
  description?: string;
  isOpen?: boolean;
  openingHours?: string;
  isFavorite?: boolean;
  menu?: RestaurantMenu;
  features?: string[];
  minimumOrder?: number;
  deliveryRadius?: number;
  preparationTime?: string;
  acceptedPayments?: string[];
}

export interface Category {
  name: string;
  icon: React.ReactElement;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  allergens?: string[];
}

export interface RestaurantMenu {
  categories: string[];
  items: MenuItem[];
}
