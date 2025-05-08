import React, { useState, useEffect } from 'react';
import { Heart, Search, Clock, LayoutGrid, List, Trash2, Filter, ChevronDown, XCircle, Star, ShoppingCart, Utensils, Store } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../data/restaurants';
import { Restaurant, MenuItem } from '../types';
import { useNotification } from '../contexts/NotificationContext';
import { useCart } from '../contexts/CartContext';
import { menuItems } from '../data/menuItems';

interface FavoriteDish extends MenuItem {
  restaurantId: string;
  restaurantName: string;
}

export default function FavoritesPage() {
  // State for UI controls
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'deliveryTime'>('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [cuisineFilter, setCuisineFilter] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'restaurants' | 'dishes'>('restaurants');

  // State for favorite items
  const [favoriteDishes, setFavoriteDishes] = useState<FavoriteDish[]>([]);

  const { showNotification } = useNotification();
  const { addItem } = useCart();

  // Load sample favorite dishes for demonstration
  useEffect(() => {
    // In a real app, this would be loaded from backend or local storage
    const sampleFavoriteDishes: FavoriteDish[] = [];

    // Get some random menu items from different restaurants for demonstration
    Object.entries(menuItems).forEach(([restaurantId, items], index) => {
      if (index < 3 && items.length > 0) {
        const restaurant = restaurants.find(r => r.id === restaurantId || r.name.toLowerCase().replace(/\s+/g, '-') === restaurantId);

        if (restaurant) {
          // Add 1-2 random dishes from each restaurant
          const randomDishes = items.slice(0, Math.min(2, items.length));
          randomDishes.forEach(dish => {
            sampleFavoriteDishes.push({
              ...dish,
              restaurantId: restaurant.id,
              restaurantName: restaurant.name
            });
          });
        }
      }
    });

    setFavoriteDishes(sampleFavoriteDishes);
  }, []);

  // Get unique cuisines from the data (alternative approach to avoid spread operator with Set)
  const allCuisines: string[] = restaurants
    .map(r => r.cuisine)
    .filter((cuisine, index, self) => self.indexOf(cuisine) === index);

  // Filter restaurants that are marked as favorite
  let favoriteRestaurants = restaurants.filter(restaurant => restaurant.isFavorite);

  // Apply search filter
  if (searchTerm) {
    favoriteRestaurants = favoriteRestaurants.filter(
      restaurant => restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Also filter favorite dishes
    if (activeTab === 'dishes') {
      setFavoriteDishes(prevDishes =>
        prevDishes.filter(dish =>
          dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dish.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dish.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }

  // Apply cuisine filter
  if (cuisineFilter.length > 0) {
    favoriteRestaurants = favoriteRestaurants.filter(
      restaurant => cuisineFilter.includes(restaurant.cuisine)
    );
  }

  // Apply sorting
  favoriteRestaurants = [...favoriteRestaurants].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else {
      // Sort by delivery time (assume format: "XX-YY min")
      const getMinutes = (time: string) => parseInt(time.split('-')[0]);
      return getMinutes(a.deliveryTime) - getMinutes(b.deliveryTime);
    }
  });

  const handleToggleFavorite = (restaurant: Restaurant) => {
    // In a real app, this would update the state/backend
    showNotification(`Removed ${restaurant.name} from favorites`, 'success');
  };

  const handleToggleFavoriteDish = (dish: FavoriteDish) => {
    setFavoriteDishes(prevDishes => prevDishes.filter(d => d.id !== dish.id));
    showNotification(`Removed ${dish.name} from favorites`, 'success');
  };

  const handleAddToCart = (dish: FavoriteDish) => {
    addItem({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: 1,
      image: dish.image,
      restaurant: dish.restaurantName
    });
    showNotification('Item added to cart!', 'success');
  };

  const handleCuisineFilter = (cuisine: string) => {
    if (cuisineFilter.includes(cuisine)) {
      setCuisineFilter(cuisineFilter.filter(c => c !== cuisine));
    } else {
      setCuisineFilter([...cuisineFilter, cuisine]);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCuisineFilter([]);
  };

  const hasActiveFilters = searchTerm || cuisineFilter.length > 0;

  return (
    <PageLayout className="bg-white" fullWidth={true}>
      <div className="w-full">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 py-8 mb-6 rounded-xl shadow-sm">
          <div className="container mx-auto px-4 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h1 className="text-3xl font-bold mb-2">Favorites</h1>
                <p className="text-white/80">
                  {activeTab === 'restaurants'
                    ? `${favoriteRestaurants.length} restaurants you love`
                    : `${favoriteDishes.length} dishes you love`
                  }
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white fill-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="container mx-auto px-4 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`py-3 px-4 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'restaurants'
                ? 'border-orange-500 text-orange-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              <Store className="w-4 h-4" />
              Restaurants
            </button>
            <button
              onClick={() => setActiveTab('dishes')}
              className={`py-3 px-4 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'dishes'
                ? 'border-orange-500 text-orange-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              <Utensils className="w-4 h-4" />
              Dishes
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="container mx-auto px-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search favorite ${activeTab}...`}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm('')}
                >
                  <XCircle className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              {activeTab === 'restaurants' && (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl flex items-center gap-2 hover:bg-gray-50"
                >
                  <Filter className="h-5 w-5 text-gray-500" />
                  <span>Filters</span>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              )}

              <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                >
                  <LayoutGrid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Filters - Only shown for Restaurants tab */}
          {activeTab === 'restaurants' && showFilters && (
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-4 transition-all">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">Sort by</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1 rounded-full text-sm ${sortBy === 'rating' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setSortBy('rating')}
                  >
                    Highest Rated
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-sm ${sortBy === 'deliveryTime' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setSortBy('deliveryTime')}
                  >
                    Fastest Delivery
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-sm ${sortBy === 'name' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => setSortBy('name')}
                  >
                    Alphabetical
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-2">Cuisine</h3>
                <div className="flex flex-wrap gap-2">
                  {allCuisines.map(cuisine => (
                    <button
                      key={cuisine}
                      className={`px-3 py-1 rounded-full text-sm ${cuisineFilter.includes(cuisine) ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      onClick={() => handleCuisineFilter(cuisine)}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between bg-white p-3 rounded-xl mb-4 border border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500">Active filters:</span>
                {searchTerm && (
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    Search: {searchTerm}
                    <XCircle
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => setSearchTerm('')}
                    />
                  </span>
                )}
                {cuisineFilter.map(cuisine => (
                  <span key={cuisine} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    {cuisine}
                    <XCircle
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleCuisineFilter(cuisine)}
                    />
                  </span>
                ))}
              </div>
              <button
                className="text-sm text-orange-500 hover:text-orange-600"
                onClick={clearFilters}
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="container mx-auto px-4">
        {/* Stats Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 rounded-lg">
                <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                  {activeTab === 'restaurants' ? favoriteRestaurants.length : favoriteDishes.length}
                </div>
                <div className="text-sm text-gray-600">
                  {activeTab === 'restaurants' ? 'Favorite Places' : 'Favorite Dishes'}
              </div>
            </div>
          </div>
        </div>

          {/* Favorite Restaurants */}
          {activeTab === 'restaurants' && (
            <>
              {viewMode === 'grid' ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoriteRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
              ) : (
                <div className="space-y-4">
                  {favoriteRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row border border-gray-100">
                      <div className="sm:w-48 h-48 sm:h-auto">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-gray-900">{restaurant.name}</h3>
                            <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                              <Star className="w-4 h-4 text-green-600 fill-green-600 mr-1" />
                              <span className="text-green-600 font-medium">{restaurant.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{restaurant.cuisine}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {restaurant.deliveryTime}
                            </div>
                            <div className="flex items-center">
                              <span className={restaurant.fee.includes('Free') ? 'text-green-500' : ''}>
                                {restaurant.fee}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleFavorite(restaurant);
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove</span>
                          </button>
                          <button
                            className="flex-1 px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                          >
                            Order Again
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State for Restaurants */}
        {favoriteRestaurants.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {hasActiveFilters ? 'No matches found' : 'No favorite restaurants yet'}
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    {hasActiveFilters ?
                      'Try adjusting your filters or search terms to find what you\'re looking for.' :
                      'Start adding restaurants to your favorites to see them here'}
                  </p>
                  {hasActiveFilters && (
                    <button
                      className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                      onClick={clearFilters}
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {/* Favorite Dishes */}
          {activeTab === 'dishes' && (
            <>
              {viewMode === 'grid' ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {favoriteDishes.map((dish) => (
                    <div key={dish.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                      <div className="relative">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-48 object-cover"
                        />
                        <button
                          onClick={() => handleToggleFavoriteDish(dish)}
                          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:bg-gray-50"
                        >
                          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900">{dish.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{dish.restaurantName}</p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{dish.description}</p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="font-bold text-lg">${dish.price.toFixed(2)}</span>
                          <button
                            onClick={() => handleAddToCart(dish)}
                            className="bg-orange-500 text-white py-1.5 px-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {favoriteDishes.map((dish) => (
                    <div key={dish.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row border border-gray-100">
                      <div className="sm:w-48 h-48 sm:h-auto">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{dish.name}</h3>
                              <p className="text-sm text-gray-500">{dish.restaurantName}</p>
                            </div>
                            <span className="font-bold text-orange-500">${dish.price.toFixed(2)}</span>
                          </div>
                          <p className="text-gray-600 text-sm mt-2">{dish.description}</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => handleToggleFavoriteDish(dish)}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-50 text-red-500 rounded-lg hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove</span>
                          </button>
                          <button
                            onClick={() => handleAddToCart(dish)}
                            className="flex-1 px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center justify-center gap-1"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty State for Dishes */}
              {favoriteDishes.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchTerm ? 'No matches found' : 'No favorite dishes yet'}
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    {searchTerm ?
                      'Try adjusting your search term to find what you\'re looking for.' :
                      'Start adding dishes to your favorites to see them here'}
                  </p>
                  {searchTerm && (
                    <button
                      className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                      onClick={() => setSearchTerm('')}
                    >
                      Clear Search
                    </button>
                  )}
          </div>
        )}
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
