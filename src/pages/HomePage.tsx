import React from 'react';
import { Restaurant } from '../types';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../data/restaurants';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900">Welcome to Fry Lyle</h1>
      <p className="text-gray-600 mt-4">
        Discover the best food from over 1,000 restaurants and fast delivery to your doorstep.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {restaurants.map((restaurant: Restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default HomePage; 