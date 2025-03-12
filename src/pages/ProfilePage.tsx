import React from 'react';
import { UserCircle, MapPin, Clock, CreditCard, Settings, ChevronRight, Heart, Package, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

interface MenuItem {
  icon: React.ReactElement;
  title: string;
  description: string;
  link: string;
  color?: string;
}

export default function ProfilePage() {
  const menuItems: MenuItem[] = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Favorites',
      description: 'View your favorite restaurants',
      link: '/favorites',
      color: 'text-red-500 bg-red-50'
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Orders',
      description: 'Track your current and past orders',
      link: '/orders',
      color: 'text-orange-500 bg-orange-50'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Addresses',
      description: 'Manage your delivery addresses',
      link: '/addresses',
      color: 'text-green-500 bg-green-50'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Payment Methods',
      description: 'Manage your payment options',
      link: '/payment',
      color: 'text-blue-500 bg-blue-50'
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Notifications',
      description: 'Set your notification preferences',
      link: '/notifications',
      color: 'text-purple-500 bg-purple-50'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Privacy',
      description: 'Manage your privacy settings',
      link: '/privacy',
      color: 'text-indigo-500 bg-indigo-50'
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: 'Help & Support',
      description: 'Get help with your orders',
      link: '/help',
      color: 'text-teal-500 bg-teal-50'
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: 'Settings',
      description: 'App preferences and account settings',
      link: '/settings',
      color: 'text-gray-500 bg-gray-50'
    }
  ];

  return (
    <PageLayout className="bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center">
                <UserCircle className="w-20 h-20 text-orange-500" />
              </div>
              <button
                className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors shadow-lg"
                aria-label="Edit profile"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
              <p className="text-gray-600">john.doe@example.com</p>
              <p className="text-gray-500 text-sm mt-1">Member since March 2024</p>
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  View Activity
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-5 h-5 text-orange-500" />
              <span className="text-xs text-gray-500">This Month</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Orders</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">5</div>
            <div className="text-sm text-gray-600">Favorites</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <MapPin className="w-5 h-5 text-green-500" />
              <span className="text-xs text-gray-500">Saved</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-sm text-gray-600">Addresses</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-5 h-5 text-blue-500" />
              <span className="text-xs text-gray-500">Active</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">2</div>
            <div className="text-sm text-gray-600">Cards</div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid gap-4 sm:grid-cols-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex items-center gap-4"
            >
              <div className={`p-3 rounded-lg ${item.color}`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button className="w-full sm:w-auto px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
