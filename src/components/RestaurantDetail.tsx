import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Bike, Heart, ChevronLeft, MapPin, Phone, Package, DollarSign, Utensils, Coffee, Search, Plus, ShoppingCart, Award, Flame } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';
import { restaurants } from '../data/restaurants';
import { Restaurant, MenuItem } from '../types';
import { menuItems } from '../data/menuItems';

const RestaurantDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addItem } = useCart();
    const { showNotification } = useNotification();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Featured');
    const [favoriteDishes, setFavoriteDishes] = useState<string[]>([]);

    // Find the restaurant from the restaurants array
    const restaurant = restaurants.find((r: Restaurant) =>
        r.name.toLowerCase().replace(/\s+/g, '-') === id
    );

    if (!restaurant) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurant not found</h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-orange-500 hover:text-orange-600"
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    const allItems: MenuItem[] = menuItems[id || ''] || [];

    // Set some items as popular/featured if not already set
    const items = allItems.map(item => {
        if (!item.hasOwnProperty('popular') && Math.random() > 0.7) {
            return { ...item, popular: true };
        }
        return item;
    });

    const filteredItems = searchTerm
        ? items.filter(item =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        : selectedCategory === 'Featured'
            ? items.filter(item => item.popular)
            : selectedCategory === 'All'
                ? items
                : items.filter(item => item.category === selectedCategory);

    // Get unique categories without using Set spread operator
    const allCategories: string[] = items
        .map(item => item.category || 'Other')
        .filter((category, index, self) => self.indexOf(category) === index);

    const categories = ['Featured', 'All', ...allCategories];

    const toggleFavorite = (restaurant: Restaurant) => {
        // In a real app, this would update some global state/backend
        showNotification(`${restaurant.isFavorite ? 'Removed from' : 'Added to'} favorites`, 'success');
    };

    const toggleFavoriteDish = (itemId: string) => {
        setFavoriteDishes(prevFavorites => {
            if (prevFavorites.includes(itemId)) {
                showNotification('Removed from favorites', 'success');
                return prevFavorites.filter(id => id !== itemId);
            } else {
                showNotification('Added to favorites', 'success');
                return [...prevFavorites, itemId];
            }
        });
    };

    const handleAddToCart = (item: MenuItem) => {
        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
            restaurant: restaurant.name
        });
        showNotification('Item added to cart!', 'success');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header Image */}
            <div className="relative h-64 md:h-96">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Restaurant Info */}
            <div className="relative -mt-20 bg-white rounded-t-3xl">
                <div className="container mx-auto px-4 py-6">
                    {/* Restaurant Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
                            <p className="text-gray-600 mb-4">{restaurant.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                                    <span>{restaurant.rating} (500+ reviews)</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>{restaurant.deliveryTime}</span>
                                </div>
                                <div className="flex items-center">
                                    <Bike className="w-4 h-4 mr-1" />
                                    <span>{restaurant.fee}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleFavorite(restaurant)}
                            className="p-2 hover:bg-red-50 rounded-full transition-colors"
                        >
                            <Heart className={`w-6 h-6 ${restaurant.isFavorite ? 'fill-red-500' : ''} text-red-500`} />
                        </button>
                    </div>

                    {/* Featured Dishes Section */}
                    {items.filter(item => item.popular).length > 0 && (
                        <div className="mb-10">
                            <div className="flex items-center mb-4">
                                <Award className="w-5 h-5 text-orange-500 mr-2" />
                                <h2 className="text-xl font-bold text-gray-900">Featured Dishes</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {items.filter(item => item.popular).slice(0, 3).map((item) => (
                                    <div key={item.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                                        <div className="relative">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute top-2 right-2 z-10">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleFavoriteDish(item.id);
                                                    }}
                                                    className="p-1.5 bg-white rounded-full shadow"
                                                >
                                                    <Heart className={`w-5 h-5 ${favoriteDishes.includes(item.id) ? 'fill-red-500' : ''} text-red-500`} />
                                                </button>
                                            </div>
                                            <div className="absolute top-2 left-2">
                                                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                                                    <Flame className="w-3 h-3 mr-1" />
                                                    Featured
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                                            <div className="flex justify-between items-center mt-4">
                                                <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddToCart(item);
                                                    }}
                                                    className="bg-orange-500 text-white py-1.5 px-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center"
                                                >
                                                    <ShoppingCart className="w-4 h-4 mr-1" />
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Restaurant Features */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-orange-50 p-4 rounded-lg">
                            <Clock className="w-6 h-6 text-orange-500 mb-2" />
                            <h3 className="font-semibold">Prep Time</h3>
                            <p className="text-sm text-gray-600">{restaurant.preparationTime}</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <DollarSign className="w-6 h-6 text-blue-500 mb-2" />
                            <h3 className="font-semibold">Min. Order</h3>
                            <p className="text-sm text-gray-600">${restaurant.minimumOrder}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <MapPin className="w-6 h-6 text-green-500 mb-2" />
                            <h3 className="font-semibold">Distance</h3>
                            <p className="text-sm text-gray-600">{restaurant.deliveryRadius}km radius</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <Utensils className="w-6 h-6 text-purple-500 mb-2" />
                            <h3 className="font-semibold">Cuisine</h3>
                            <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                        </div>
                    </div>

                    {/* Contact & Hours */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center text-gray-600">
                                    <MapPin className="w-5 h-5 mr-3" />
                                    <span>{restaurant.address}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Phone className="w-5 h-5 mr-3" />
                                    <span>{restaurant.phone}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
                            <div className="space-y-3">
                                <div className="flex items-center text-gray-600">
                                    <Clock className="w-5 h-5 mr-3" />
                                    <span>{restaurant.openingHours}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Coffee className="w-5 h-5 mr-3" />
                                    <span>{restaurant.isOpen ? 'Open Now' : 'Closed'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Menu Categories */}
                    <div className="mb-6 overflow-x-auto">
                        <div className="flex gap-2 pb-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-orange-100 text-gray-700'} transition-colors whitespace-nowrap`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search menu items..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Menu Items */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-40 object-cover"
                                    />
                                    {item.popular && (
                                        <div className="absolute top-2 left-2">
                                            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                                                <Flame className="w-3 h-3 mr-1" />
                                                Popular
                                            </span>
                                        </div>
                                    )}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavoriteDish(item.id);
                                        }}
                                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
                                    >
                                        <Heart className={`w-5 h-5 ${favoriteDishes.includes(item.id) ? 'fill-red-500' : ''} text-red-500`} />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-bold">{item.name}</h3>
                                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-gray-900 font-bold">${item.price.toFixed(2)}</span>
                                        <button
                                            onClick={() => handleAddToCart(item)}
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

                    {filteredItems.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No items found. Try adjusting your search or category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetail; 