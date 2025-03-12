import React, { useState } from 'react';
import { Clock, Package, Truck, Check, Search, ChevronDown, Store } from 'lucide-react';
import PageLayout from '../components/PageLayout';

interface Order {
  id: string;
  restaurant: string;
  items: { name: string; quantity: number }[];
  status: 'preparing' | 'delivering' | 'delivered';
  date: string;
  total: string;
  image: string;
  estimatedTime?: string;
  progress: number; // 0-100
}

const orders: Order[] = [
  {
    id: '1',
    restaurant: 'Burger Palace',
    items: [
      { name: 'Classic Burger', quantity: 2 },
      { name: 'Fries', quantity: 1 }
    ],
    status: 'preparing',
    date: '2024-03-15',
    total: '$25.99',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
    estimatedTime: '15-20 min',
    progress: 30
  },
  {
    id: '2',
    restaurant: 'Pizza Heaven',
    items: [
      { name: 'Margherita Pizza', quantity: 1 },
      { name: 'Pepperoni Pizza', quantity: 1 }
    ],
    status: 'delivering',
    date: '2024-03-12',
    total: '$42.50',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    estimatedTime: '5-10 min',
    progress: 75
  },
  {
    id: '3',
    restaurant: 'Sushi Master',
    items: [
      { name: 'California Roll', quantity: 2 },
      { name: 'Miso Soup', quantity: 1 }
    ],
    status: 'delivered',
    date: '2024-03-10',
    total: '$38.99',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    progress: 100
  }
];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'preparing':
      return 'text-blue-500 bg-blue-50';
    case 'delivering':
      return 'text-orange-500 bg-orange-50';
    case 'delivered':
      return 'text-green-500 bg-green-50';
    default:
      return 'text-gray-500 bg-gray-50';
  }
};

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'preparing':
      return <Package className="w-5 h-5" />;
    case 'delivering':
      return <Truck className="w-5 h-5" />;
    case 'delivered':
      return <Check className="w-5 h-5" />;
    default:
      return null;
  }
};

const OrderProgress = ({ status, progress }: { status: Order['status']; progress: number }) => {
  const steps = [
    { icon: <Store className="w-5 h-5" />, label: 'Confirmed' },
    { icon: <Package className="w-5 h-5" />, label: 'Preparing' },
    { icon: <Truck className="w-5 h-5" />, label: 'Delivering' },
    { icon: <Check className="w-5 h-5" />, label: 'Delivered' }
  ];

  return (
    <div className="mt-4">
      <div className="relative">
        {/* Progress bar background */}
        <div className="h-1 bg-gray-200 rounded-full">
          <div
            className="h-full bg-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="flex justify-between -mt-2">
          {steps.map((step, index) => {
            const isActive = (progress >= (index + 1) * 25) ||
              (status === 'preparing' && index <= 1) ||
              (status === 'delivering' && index <= 2) ||
              (status === 'delivered');
            return (
              <div key={index} className="relative">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${isActive ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'
                    }`}
                >
                  {step.icon}
                </div>
                <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs ${isActive ? 'text-orange-500 font-medium' : 'text-gray-400'
                  }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<Order['status'] | 'all'>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <PageLayout className="bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-sm text-gray-600">Active Orders</div>
            <div className="text-2xl font-bold text-orange-500 mt-1">
              {orders.filter(o => o.status !== 'delivered').length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-sm text-gray-600">Delivered Today</div>
            <div className="text-2xl font-bold text-green-500 mt-1">
              {orders.filter(o => o.status === 'delivered').length}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-sm text-gray-600">Total Spent</div>
            <div className="text-2xl font-bold text-blue-500 mt-1">
              ${orders.reduce((sum, order) => sum + parseFloat(order.total.replace('$', '')), 0).toFixed(2)}
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sm:w-48">
            <select
              className="w-full appearance-none bg-white px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as Order['status'] | 'all')}
            >
              <option value="all">All Status</option>
              <option value="preparing">Preparing</option>
              <option value="delivering">Delivering</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-100">
            {filteredOrders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex gap-6">
                  <img
                    src={order.image}
                    alt={order.restaurant}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{order.restaurant}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-500">{order.date}</span>
                          {order.estimatedTime && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="text-sm text-orange-500">
                                Est. {order.estimatedTime}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xl text-orange-500 font-semibold block mb-2">
                          {order.total}
                        </span>
                        <button className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                          Reorder
                        </button>
                      </div>
                    </div>
                    <OrderProgress status={order.status} progress={order.progress} />
                  </div>
                </div>
              </div>
            ))}

            {filteredOrders.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-gray-500">No orders found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
