import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface Filters {
    freeDelivery: boolean;
    promo: boolean;
    rating4Plus: boolean;
}

interface FilterBarProps {
    sortBy: string;
    onSortChange: (value: string) => void;
    filters: Filters;
    onFilterChange: (key: keyof Filters) => void;
}

export default function FilterBar({ sortBy, onSortChange, filters, onFilterChange }: FilterBarProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700 font-medium">Filters:</span>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => onFilterChange('freeDelivery')}
                        className={`px-4 py-2 rounded-full text-sm ${filters.freeDelivery
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Free Delivery
                    </button>

                    <button
                        onClick={() => onFilterChange('promo')}
                        className={`px-4 py-2 rounded-full text-sm ${filters.promo
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Promotions
                    </button>

                    <button
                        onClick={() => onFilterChange('rating4Plus')}
                        className={`px-4 py-2 rounded-full text-sm ${filters.rating4Plus
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        4.0+ Rating
                    </button>
                </div>

                <div className="ml-auto">
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-gray-100 border-none text-sm text-gray-700 focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="recommended">Recommended</option>
                        <option value="rating">Highest Rated</option>
                        <option value="delivery">Fastest Delivery</option>
                    </select>
                </div>
            </div>
        </div>
    );
} 