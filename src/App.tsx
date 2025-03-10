import React, { useState } from 'react';
import {
  Search, UserCircle, Star, Clock, Bike, Pizza,
  Utensils, Sandwich, Salad, ChevronRight, Bird,
  ChefHat, Home, Heart, ShoppingCart, Menu, ChevronLeft
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Define the restaurants array
const restaurants: Restaurant[] = [
  {
    name: 'Burger Palace',
    cuisine: 'American',
    rating: 4.5,
    deliveryTime: '20-30 min',
    promo: '20% OFF',
    fee: 'Free delivery',
    image: 'https://via.placeholder.com/300x150/FFD700/000000?text=Burger'
  },
  {
    name: 'Sushi Master',
    cuisine: 'Japanese',
    rating: 4.8,
    deliveryTime: '25-35 min',
    promo: 'Free Sushi',
    fee: '$1.99 delivery',
    image: 'https://via.placeholder.com/300x150/FF6347/FFFFFF?text=Sushi'
  },
  {
    name: 'Pizza Heaven',
    cuisine: 'Italian',
    rating: 4.7,
    deliveryTime: '30-40 min',
    promo: '30% OFF',
    fee: 'Free delivery',
    image: 'https://via.placeholder.com/300x150/9370DB/FFFFFF?text=Pizza'
  },
];

// Define TypeScript interfaces
interface Restaurant {
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  promo?: string;
  fee: string;
  image: string;
}

interface Category {
  name: string;
  icon: React.ReactElement;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const categories: Category[] = [
    { name: 'Burgers', icon: <Sandwich className="w-6 h-6" /> },
    { name: 'Pizza', icon: <Pizza className="w-6 h-6" /> },
    { name: 'Sushi', icon: <Utensils className="w-6 h-6" /> },
    { name: 'Salads', icon: <Salad className="w-6 h-6" /> },
    { name: 'Desserts', icon: <Utensils className="w-6 h-6" /> },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Desktop Header */}
        <header className="hidden md:block bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Logo and Navigation */}
              <div className="flex items-center gap-6">
                <Link to="/" className="flex items-center gap-2">
                  <div className="bg-orange-500 p-2 rounded-full relative">
                    <ChefHat className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    FLY LYLE
                    <span className="text-sm text-orange-500 block">Food Delivery</span>
                  </span>
                </Link>
                <nav className="hidden lg:flex gap-6">
                  <Link to="/" className="hover:text-orange-500">Home</Link>
                  <Link to="/favorites" className="hover:text-orange-500">Favorites</Link>
                  <Link to="/orders" className="hover:text-orange-500">Orders</Link>
                </nav>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search restaurants or dishes..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Desktop Navigation Icons */}
              <div className="flex items-center gap-4">
                <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
                  <ShoppingCart className="w-6 h-6 text-gray-600" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <UserCircle className="w-7 h-7 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-sm fixed w-full top-0 z-50">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                <Menu className="w-6 h-6 text-gray-600" />
              </button>

              <Link to="/" className="flex items-center gap-2">
                <div className="bg-orange-500 p-2 rounded-full">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">FLY LYLE</span>
              </Link>

              <Link to="/cart" className="relative p-2">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Search Bar */}
            <div className="mt-3">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="bg-white w-3/4 h-full p-4">
              <nav className="space-y-4">
                <Link to="/" className="block p-2 hover:bg-gray-100 rounded">Home</Link>
                <Link to="/favorites" className="block p-2 hover:bg-gray-100 rounded">Favorites</Link>
                <Link to="/orders" className="block p-2 hover:bg-gray-100 rounded">Orders</Link>
                <Link to="/profile" className="block p-2 hover:bg-gray-100 rounded">Profile</Link>
              </nav>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200">
          <div className="grid grid-cols-4 gap-2 p-2">
            <Link to="/" className="flex flex-col items-center p-2 text-orange-500">
              <Home className="w-6 h-6" />
              <span className="text-xs">Home</span>
            </Link>
            <Link to="/favorites" className="flex flex-col items-center p-2 text-gray-600">
              <Heart className="w-6 h-6" />
              <span className="text-xs">Favorites</span>
            </Link>
            <Link to="/orders" className="flex flex-col items-center p-2 text-gray-600">
              <Clock className="w-6 h-6" />
              <span className="text-xs">Orders</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center p-2 text-gray-600">
              <UserCircle className="w-6 h-6" />
              <span className="text-xs">Profile</span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 pt-20 md:pt-6 pb-16 md:pb-6">
          <Routes>
            <Route path="/" element={
              <>
                {/* Categories */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">Categories</h2>
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        className="flex flex-col items-center bg-white px-6 py-4 rounded-xl shadow-sm hover:shadow-md transition-shadow min-w-[120px]"
                      >
                        <div className="text-orange-500 mb-2">{category.icon}</div>
                        <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Restaurants */}
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Popular Restaurants</h2>
                    <button className="flex items-center text-orange-500 font-medium">
                      See all <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Restaurant Grid */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {restaurants.map((restaurant) => (
                      <RestaurantCard key={restaurant.name} restaurant={restaurant} />
                    ))}
                  </div>
                </section>
              </>
            } />

            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/cart" element={<CartScreen items={cartItems} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Responsive Restaurant Card Component
function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="relative aspect-video">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        {restaurant.promo && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
            {restaurant.promo}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
          <span className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
            <Star className="w-4 h-4 mr-1 fill-green-800 text-green-800" />
            {restaurant.rating}
          </span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <span className="mr-4">{restaurant.cuisine}</span>
          <span className="flex items-center">
            <Bike className="w-4 h-4 mr-1" />
            {restaurant.fee}
          </span>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <Clock className="w-4 h-4 mr-1" />
          {restaurant.deliveryTime}
        </div>
      </div>
    </div>
  );
}

// Mobile-optimized Restaurant Detail Component
function RestaurantDetail() {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="md:hidden sticky top-16 bg-white py-4">
        <button className="flex items-center text-gray-600">
          <ChevronLeft className="w-5 h-5 mr-1" /> Back
        </button>
      </div>
      {/* Detailed restaurant content */}
    </div>
  );
}

// Cart Component with different layouts
function CartScreen({ items }: { items: CartItem[] }) {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="md:flex gap-8">
        <div className="md:w-2/3">
          {/* Cart items list */}
        </div>
        <div className="md:w-1/3 md:sticky md:top-20">
          {/* Order summary */}
        </div>
      </div>
    </div>
  );
}