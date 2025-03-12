import React from 'react';
import { Restaurant } from '../types';
import { Star, Bike, Clock, Heart, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { addItem } = useCart();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: `${restaurant.name}-special`,
      name: `${restaurant.name} Special`,
      price: 12.99,
      quantity: 1,
      image: restaurant.image,
      restaurant: restaurant.name
    });
    showNotification('Item added to cart!', 'success');
  };

  return (
    <div
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-sm font-medium">View Menu</p>
            <div className="flex items-center gap-1 text-xs">
              <span>{restaurant.menu?.items.length || 0} items</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
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
        <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {restaurant.deliveryTime}
          </div>
          <div className="flex items-center">
            <Bike className="w-4 h-4 mr-1" />
            {restaurant.fee}
          </div>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full bg-orange-500 text-white py-2 hover:bg-orange-600 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}
