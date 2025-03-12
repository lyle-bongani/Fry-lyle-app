import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, Bike, Heart, ChevronLeft, MapPin, Phone, Package, DollarSign, Utensils, Coffee, Search, Plus } from 'lucide-react';
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

    const items: MenuItem[] = menuItems[id || ''] || [];

    return (
        <div className="min-h-screen bg-gray-50">
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
                        <button className="p-2 hover:bg-red-50 rounded-full transition-colors">
                            <Heart className={`w-6 h-6 ${restaurant.isFavorite ? 'fill-red-500' : ''} text-red-500`} />
                        </button>
                    </div>

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
                        <div className="bg-white p-6 rounded-xl shadow-sm">
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
                        <div className="bg-white p-6 rounded-xl shadow-sm">
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
                            {['Popular', 'Main Course', 'Appetizers', 'Desserts', 'Drinks'].map((category) => (
                                <button
                                    key={category}
                                    className="px-4 py-2 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white transition-colors whitespace-nowrap"
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
                        {items.map((item: MenuItem) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                                <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-t-lg" />
                                <h2 className="text-lg font-bold mt-2">{item.name}</h2>
                                <p className="text-gray-600">{item.description}</p>
                                <p className="text-gray-900 font-bold">${item.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetail; 