import React from 'react';
import { Heart } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../data/restaurants';

export default function FavoritesPage() {
  // Filter restaurants that are marked as favorite
  const favoriteRestaurants = restaurants.filter(restaurant => restaurant.isFavorite);

  return (
    <PageLayout className="bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Stats Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {favoriteRestaurants.length}
              </div>
              <div className="text-sm text-gray-600">Favorite Places</div>
            </div>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favoriteRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        {/* Empty State */}
        {favoriteRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-600">
              Start adding restaurants to your favorites to see them here
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
