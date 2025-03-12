import React from 'react';
import { Order } from '../types'; // Assuming you have a types file for TypeScript interfaces

export default function OrderCard({ order }: { order: Order }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
        <div className="text-gray-600 text-sm mb-2">
          <span>{order.date}</span>
        </div>
        <div className="text-gray-600 text-sm">
          <span>{order.total}</span>
        </div>
      </div>
    </div>
  );
}
