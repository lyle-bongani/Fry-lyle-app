import React, { useState, useRef, useEffect } from 'react';
import {
  Search, UserCircle, Star, Clock, Bike, Pizza,
  Utensils, Sandwich, Salad, ChevronRight, Bird,
  ChefHat, Home, Heart, ShoppingCart, Menu, ChevronLeft, X,
  Settings as SettingsIcon,
  HelpCircle, Package
} from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import FavoritesPage from './pages/FavoritesPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import { CartProvider, useCart } from './contexts/CartContext';
import { NotificationProvider, useNotification } from './contexts/NotificationContext';
import HelpCenter from './pages/HelpCenter';
import Settings from './pages/Settings';
import SearchResults from './components/SearchResults';
import FilterBar from './components/FilterBar';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import BlogPage from './pages/BlogPage';
import PartnerPage from './pages/PartnerPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';
import FAQPage from './pages/FAQPage';
import PaymentScreen from './components/PaymentScreen';
import CartScreen from './components/CartScreen';
import RestaurantDetail from './components/RestaurantDetail';
import { restaurants } from './data/restaurants';
import { Restaurant } from './types';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import HomePage from './pages/HomePage';


// Define TypeScript interfaces
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

// Add the Filters type
interface Filters {
  freeDelivery: boolean;
  promo: boolean;
  rating4Plus: boolean;
}

// First, create a new AppContent component that will contain all the content
function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items: cartItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState<Filters>({
    freeDelivery: false,
    promo: false,
    rating4Plus: false
  });
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Add handler to close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const categories: Category[] = [
    { name: 'Burgers', icon: <Sandwich className="w-6 h-6" /> },
    { name: 'Pizza', icon: <Pizza className="w-6 h-6" /> },
    { name: 'Sushi', icon: <Utensils className="w-6 h-6" /> },
    { name: 'Salads', icon: <Salad className="w-6 h-6" /> },
    { name: 'Mexican', icon: <Utensils className="w-6 h-6" /> },
    { name: 'Vietnamese', icon: <Utensils className="w-6 h-6" /> },
    { name: 'Healthy', icon: <Salad className="w-6 h-6" /> },
    { name: 'Desserts', icon: <Utensils className="w-6 h-6" /> },
  ];

  const filteredAndSortedRestaurants = React.useMemo(() => {
    let result = [...restaurants];

    // Apply filters
    if (filters.freeDelivery) {
      result = result.filter(r => r.fee.includes('Free'));
    }
    if (filters.promo) {
      result = result.filter(r => r.promo);
    }
    if (filters.rating4Plus) {
      result = result.filter(r => r.rating >= 4.0);
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'delivery':
        result.sort((a, b) => {
          const getMinutes = (time: string) => parseInt(time.split('-')[0]);
          return getMinutes(a.deliveryTime) - getMinutes(b.deliveryTime);
        });
        break;
      default:
        // 'recommended' - keep original order
        break;
    }

    return result;
  }, [restaurants, filters, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-40 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-orange-500 p-2 rounded-full relative">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  FRY LYLE
                  <span className="text-sm text-orange-500 block">Food Delivery</span>
                </span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for restaurants or dishes"
                  className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowSearch(true)}
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/favorites" className="p-2 hover:bg-gray-100 rounded-full">
                <Heart className="w-6 h-6 text-gray-600" />
              </Link>
              <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
              <Link to="/settings" className="p-2 hover:bg-gray-100 rounded-full">
                <SettingsIcon className="w-6 h-6 text-gray-600" />
              </Link>
              <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full">
                <UserCircle className="w-6 h-6 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed inset-y-0 left-0 w-80 bg-white shadow-lg transform transition-transform duration-200 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <div className="bg-white p-2 rounded-full">
                <ChefHat className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <span className="font-bold text-white">FRY LYLE</span>
                <span className="text-xs text-white/80 block">Food Delivery</span>
              </div>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b">
          <Link
            to="/profile"
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="bg-gray-100 p-2 rounded-full">
              <UserCircle className="w-8 h-8 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-500">View your profile</p>
            </div>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav className="p-4 border-b">
          <div className="space-y-1">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/favorites"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Heart className="w-5 h-5" />
              <span>Favorites</span>
            </Link>
            <Link
              to="/orders"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Package className="w-5 h-5" />
              <span>Orders</span>
            </Link>
            <Link
              to="/cart"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="ml-auto bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Settings & Support */}
        <nav className="p-4 border-b">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
            Settings & Support
          </h3>
          <div className="space-y-1">
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <SettingsIcon className="w-5 h-5" />
              <span>Settings</span>
            </Link>
            <Link
              to="/help"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help Center</span>
            </Link>
          </div>
        </nav>

        {/* Legal Links */}
        <nav className="p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
            Legal
          </h3>
          <div className="space-y-1">
            <Link
              to="/privacy"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-colors text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 rounded-lg transition-colors text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Terms of Service
            </Link>
          </div>
        </nav>

        {/* Version Info */}
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <p className="text-xs text-gray-500">Version 1.0.0</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 pt-20 pb-24 md:pb-6">
        <Routes>
          <Route path="/" element={<HomePageComponent categories={categories} filteredRestaurants={filteredAndSortedRestaurants} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/restaurants" element={<AllRestaurants />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/pokemon" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </main>

      {/* Footer - Mobile Navigation */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around px-2 py-2">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center w-1/4 py-2 ${location.pathname === '/' ? 'text-orange-500' : 'text-gray-600'}`}
          >
            <Home className={`w-6 h-6 ${location.pathname === '/' ? 'fill-orange-500' : ''}`} />
            <span className="text-xs mt-1 font-medium">Home</span>
            {location.pathname === '/' && <div className="h-1 w-6 bg-orange-500 rounded-full mt-1"></div>}
          </Link>

          <Link
            to="/favorites"
            className={`flex flex-col items-center justify-center w-1/4 py-2 ${location.pathname === '/favorites' ? 'text-orange-500' : 'text-gray-600'}`}
          >
            <Heart className={`w-6 h-6 ${location.pathname === '/favorites' ? 'fill-orange-500' : ''}`} />
            <span className="text-xs mt-1 font-medium">Favorites</span>
            {location.pathname === '/favorites' && <div className="h-1 w-6 bg-orange-500 rounded-full mt-1"></div>}
          </Link>

          <Link
            to="/orders"
            className={`flex flex-col items-center justify-center w-1/4 py-2 ${location.pathname === '/orders' ? 'text-orange-500' : 'text-gray-600'}`}
          >
            <Package className={`w-6 h-6 ${location.pathname === '/orders' ? 'fill-orange-500' : ''}`} />
            <span className="text-xs mt-1 font-medium">Orders</span>
            {location.pathname === '/orders' && <div className="h-1 w-6 bg-orange-500 rounded-full mt-1"></div>}
          </Link>

          <Link
            to="/profile"
            className={`flex flex-col items-center justify-center w-1/4 py-2 ${location.pathname === '/profile' ? 'text-orange-500' : 'text-gray-600'}`}
          >
            <UserCircle className={`w-6 h-6 ${location.pathname === '/profile' ? 'fill-orange-500' : ''}`} />
            <span className="text-xs mt-1 font-medium">Profile</span>
            {location.pathname === '/profile' && <div className="h-1 w-6 bg-orange-500 rounded-full mt-1"></div>}
          </Link>
        </div>
      </footer>

      {/* Desktop Footer */}
      <Footer />

      {/* Search Results Overlay */}
      {showSearch && (
        <SearchResults
          searchTerm={searchTerm}
          restaurants={restaurants}
          onClose={() => {
            setShowSearch(false);
            setSearchTerm('');
          }}
        />
      )}

      {/* FilterBar should be inside the main content where needed */}
    </div>
  );
}

// Home Page Component
function HomePageComponent({ categories, filteredRestaurants, searchTerm, setSearchTerm }: { categories: Category[], filteredRestaurants: Restaurant[], searchTerm: string, setSearchTerm: React.Dispatch<React.SetStateAction<string>> }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { showNotification } = useNotification();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] mb-8 md:mb-12">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover brightness-50"
          >
            <source src="/images/food.mp4" type="video/mp4" />
          </video>
          {/* Add a darker overlay for better text readability on mobile */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
              Welcome to Fry Lyle!
            </h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-white/90 px-4">
              Get your favorite meals delivered to your door in minutes.
              <span className="hidden md:inline"><br /></span>
              From local delights to international cuisine, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/restaurants')}
                className="w-full sm:w-auto bg-orange-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                Order Now <ChevronRight className="w-5 h-5" />
              </button>
              {/* Stats - Hidden on mobile, shown on tablet and up */}
              <div className="hidden sm:flex items-center gap-4 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">30+</div>
                  <div className="text-sm">Restaurants</div>
                </div>
                <div className="h-8 w-px bg-white/30" />
                <div className="text-center">
                  <div className="text-2xl font-bold">45min</div>
                  <div className="text-sm">Avg. Delivery</div>
                </div>
                <div className="h-8 w-px bg-white/30" />
                <div className="text-center">
                  <div className="text-2xl font-bold">4.8</div>
                  <div className="text-sm">Rating</div>
                </div>
              </div>
            </div>

            {/* Mobile Stats - Shown only on mobile */}
            <div className="grid grid-cols-3 gap-4 mt-6 sm:hidden">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-xl font-bold text-white">30+</div>
                <div className="text-xs text-white/80">Restaurants</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-xl font-bold text-white">45min</div>
                <div className="text-xs text-white/80">Delivery</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="text-xl font-bold text-white">4.8</div>
                <div className="text-xs text-white/80">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features - Hidden on mobile */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent hidden md:block">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-3 gap-4 text-white">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>Top Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>Best Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Categories</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {categories.map((category: Category) => (
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

      {/* Featured Restaurants */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Featured Restaurants</h2>
          <button
            className="flex items-center text-orange-500 font-medium"
            onClick={() => navigate('/restaurants')}
          >
            See all <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.map((restaurant: Restaurant) => (
            <RestaurantCard key={restaurant.name} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Updated Trending Dishes section */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Trending Dishes</h2>
          <button className="flex items-center text-orange-500 font-medium">
            See all <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="relative aspect-video">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                alt="Grilled Salmon"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">Grilled Salmon</h3>
              <p className="text-gray-600 text-sm mb-2">Fresh Atlantic salmon with lemon herb butter</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <Star className="w-4 h-4 mr-1 fill-green-800 text-green-800" />
                  4.8
                </div>
                <span className="text-orange-500 font-semibold">$24.99</span>
              </div>
              <button
                onClick={() => {
                  addItem({
                    id: 'grilled-salmon',
                    name: 'Grilled Salmon',
                    price: 24.99,
                    quantity: 1,
                    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
                    restaurant: 'Seafood House'
                  });
                  showNotification('Added to cart!', 'success');
                }}
                className="group w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4 transform group-hover:rotate-12 transition-transform" />
                <span>$24.99</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="relative aspect-video">
              <img
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80"
                alt="Quinoa Buddha Bowl"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">Quinoa Buddha Bowl</h3>
              <p className="text-gray-600 text-sm mb-2">Healthy mix of quinoa, avocado, and roasted veggies</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600 text-sm">
                  <Star className="w-4 h-4 mr-1 fill-green-800 text-green-800" />
                  4.7
                </div>
                <span className="text-orange-500 font-semibold">$16.99</span>
              </div>
              <button
                onClick={() => {
                  addItem({
                    id: 'quinoa-bowl',
                    name: 'Quinoa Buddha Bowl',
                    price: 16.99,
                    quantity: 1,
                    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
                    restaurant: 'Green Bowl'
                  });
                  showNotification('Added to cart!', 'success');
                }}
                className="group w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4 transform group-hover:rotate-12 transition-transform" />
                <span>$16.99</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="relative aspect-video">
              <img
                src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1800&q=80"
                alt="Pasta Carbonara"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">Pasta Carbonara</h3>
              <p className="text-gray-600 text-sm mb-2">Classic Italian pasta with crispy pancetta</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600 text-sm">
                  <Star className="w-4 h-4 mr-1 fill-green-800 text-green-800" />
                  4.9
                </div>
                <span className="text-orange-500 font-semibold">$18.99</span>
              </div>
              <button
                onClick={() => {
                  addItem({
                    id: 'pasta-carbonara',
                    name: 'Pasta Carbonara',
                    price: 18.99,
                    quantity: 1,
                    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
                    restaurant: 'Italian Kitchen'
                  });
                  showNotification('Added to cart!', 'success');
                }}
                className="group w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4 transform group-hover:rotate-12 transition-transform" />
                <span>$18.99</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Add a Special Offers section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Special Offers</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">First Order</h3>
            <p className="mb-4">Get 50% off on your first order!</p>
            <button className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Claim Offer
            </button>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Free Delivery</h3>
            <p className="mb-4">On orders above $25</p>
            <button className="bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Order Now
            </button>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">Rewards</h3>
            <p className="mb-4">Earn points on every order!</p>
            <button className="bg-white text-green-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Join Now
            </button>
          </div>
        </div>
      </section>

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
          {restaurants.map((restaurant: Restaurant) => (
            <RestaurantCard key={restaurant.name} restaurant={restaurant} />
          ))}
        </div>
      </section>
    </>
  );
}

// Responsive Restaurant Card Component
function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/restaurant/${restaurant.name.toLowerCase().replace(/\s+/g, '-')}`)}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="relative aspect-video">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover rounded-t-xl"
        />
        {restaurant.promo && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {restaurant.promo}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-500 transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex items-center bg-green-50 px-2 py-1 rounded">
            <Star className="w-4 h-4 text-green-600 fill-green-600 mr-1" />
            <span className="text-green-600 font-medium">{restaurant.rating}</span>
          </div>
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

// All Restaurants Component
function AllRestaurants() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">All Restaurants</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.name} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

// Update the main App component to only handle the Router
export default function App() {
  return (
    <Router>
      <CartProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </CartProvider>
    </Router>
  );
}