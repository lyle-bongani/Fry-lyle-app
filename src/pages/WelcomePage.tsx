import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, ArrowRight, Timer, ThumbsUp, Check } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Background graphic */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-orange-500 to-orange-400 rounded-bl-[80px] rounded-br-[80px]" />
        <div className="absolute bottom-0 w-full h-24 bg-orange-500 opacity-5 transform skew-y-[-3deg]" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="px-6 pt-10 pb-8 text-center">
          <div className="inline-flex items-center justify-center bg-white p-3 rounded-full shadow-lg mb-6">
            <ChefHat className="w-10 h-10 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">FLY FOODS</h1>
          <p className="text-white/90 text-lg">Food Delivery Service</p>
        </div>

        {/* Features Carousel */}
        <div className="w-full py-10">
          <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center mb-12">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                alt="Food Delivery"
                className="w-64 h-64 object-cover rounded-full shadow-xl mb-8"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Delicious Food Delivered</h2>
              <p className="text-gray-600 text-center max-w-xs">
                Order your favorite dishes from the best restaurants in your area.
              </p>
            </div>

            {/* Feature Benefits */}
            <div className="px-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                  <Timer className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Fast Delivery</h3>
                <p className="text-center text-gray-600 text-sm">
                  Get your food delivered in minutes
                </p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                  <ThumbsUp className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Top Quality</h3>
                <p className="text-center text-gray-600 text-sm">
                  The best restaurants in your area
                </p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                  <Check className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Easy Tracking</h3>
                <p className="text-center text-gray-600 text-sm">
                  Track your order in real-time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="mt-auto px-6 pb-10 space-y-4">
          <Link
            to="/signup"
            className="w-full bg-orange-500 text-white rounded-full py-4 px-6 font-semibold flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors"
          >
            Create an Account
          </Link>
          <Link
            to="/signin"
            className="w-full bg-white text-orange-500 border border-orange-500 rounded-full py-4 px-6 font-semibold flex items-center justify-center hover:bg-orange-50 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/home"
            className="w-full flex items-center justify-center py-4 text-gray-600 hover:text-orange-500 transition-colors"
          >
            <span>Continue as Guest</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
} 