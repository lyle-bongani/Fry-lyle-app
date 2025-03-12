import React from 'react';
import { Restaurant } from '../types';
import RestaurantCard from './RestaurantCard';
import { Search, X } from 'lucide-react';

interface SearchResultsProps {
    searchTerm: string;
    restaurants: Restaurant[];
    onClose: () => void;
}

export default function SearchResults({ searchTerm, restaurants, onClose }: SearchResultsProps) {
    if (!searchTerm) return null;

    const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="bg-white h-[calc(100%-4rem)] mt-16 md:h-auto md:max-h-[80vh] md:mt-20 md:mx-auto md:max-w-4xl md:rounded-xl overflow-auto">
                <div className="sticky top-0 bg-white p-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Search className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">Results for "{searchTerm}"</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    {filteredRestaurants.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600">No results found for "{searchTerm}"</p>
                            <p className="text-sm text-gray-500 mt-2">Try searching for something else</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2">
                            {filteredRestaurants.map(restaurant => (
                                <RestaurantCard key={restaurant.name} restaurant={restaurant} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 