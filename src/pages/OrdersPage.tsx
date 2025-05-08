import React, { useState, useEffect } from 'react';
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

  // Get current step index
  const getCurrentStepIndex = () => {
    if (status === 'delivered') return 3;
    if (status === 'delivering') return 2;
    if (status === 'preparing') return 1;
    return 0;
  };

  return (
    <div className="mt-4">
      {/* Mobile active step indicator - Only visible on very small screens */}
      <div className="flex justify-center items-center mb-2 xs:hidden">
        <span className="text-sm font-medium text-orange-500">
          {steps[getCurrentStepIndex()].label}
        </span>
      </div>

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
                  } hidden xs:block`}>
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
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.restaurant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <PageLayout className="bg-white">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="text-sm text-gray-600">Active Orders</div>
            <div className="text-2xl font-bold text-orange-500 mt-1">
              {orders.filter(o => o.status !== 'delivered').length}
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="text-sm text-gray-600">Delivered Today</div>
            <div className="text-2xl font-bold text-green-500 mt-1">
              {orders.filter(o => o.status === 'delivered').length}
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm col-span-1 sm:col-span-2 lg:col-span-1">
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
              <div key={order.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <img
                    src={order.image}
                    alt={order.restaurant}
                    className="w-full sm:w-24 h-36 sm:h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                      <div className="mb-3 sm:mb-0">
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
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <span className="text-xl text-orange-500 font-semibold block mb-2">
                          {order.total}
                        </span>
                        <div className="inline-flex sm:block px-3 py-1 rounded-full text-xs font-medium mb-2 mr-2 sm:mr-0 sm:mb-3 whitespace-nowrap"
                          style={{
                            color: order.status === 'preparing' ? '#3B82F6' :
                              order.status === 'delivering' ? '#F97316' : '#10B981',
                            backgroundColor: order.status === 'preparing' ? '#EFF6FF' :
                              order.status === 'delivering' ? '#FFF7ED' : '#ECFDF5'
                          }}>
                          <span className="capitalize">{order.status}</span>
                        </div>
                        <div className="flex flex-col xs:flex-row gap-2">
                          <button
                            className="px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors w-full"
                          >
                            Reorder
                          </button>
                          <button
                            onClick={() => toggleOrderExpand(order.id)}
                            className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors w-full block sm:hidden"
                          >
                            {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={`${expandedOrderId === order.id || windowWidth >= 640 ? 'block' : 'hidden'}`}>
                      <OrderProgress status={order.status} progress={order.progress} />
                    </div>

                    {expandedOrderId === order.id && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg block sm:hidden">
                        <h4 className="font-medium text-sm mb-2">Order Details:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="flex justify-between">
                              <span>{item.quantity}x {item.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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
