import React from 'react';
import { Check } from 'lucide-react';

export default function PartnerPage() {
  const benefits = [
    "Increase your revenue",
    "Reach new customers",
    "Flexible delivery options",
    "Real-time order tracking",
    "24/7 support",
    "Marketing assistance"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Become a Partner</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Partner With Us?</h2>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Get Started</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Restaurant Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 