import React, { useState } from 'react';
import { UserCircle, MapPin, Clock, CreditCard, Settings, ChevronRight, Heart, Package, Bell, Shield, HelpCircle, LogOut, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import EditProfileForm from '../components/EditProfileForm';

interface MenuItem {
  icon: React.ReactElement;
  title: string;
  description: string;
  link: string;
  color?: string;
}

export default function ProfilePage() {
  const { currentUser, userData, logout } = useAuth();
  const navigate = useNavigate();
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/welcome');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Format the registration date if available
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Recently';

    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return format(date, 'MMMM yyyy');
    } catch (error) {
      console.error('Error formatting date', error);
      return 'Recently';
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (userData?.fullName) {
      const names = userData.fullName.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      } else if (names.length === 1) {
        return names[0][0].toUpperCase();
      }
    }

    if (currentUser?.email) {
      return currentUser.email[0].toUpperCase();
    }

    return 'U';
  };

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

  // Calculate stats
  const orderCount = userData?.orders?.length || 0;
  const favoritesCount = userData?.favorites?.length || 0;
  const addressesCount = userData?.addresses?.length || 0;
  const paymentMethodsCount = 0; // Placeholder, add real implementation when available

  return (
    <PageLayout className="bg-white">
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <EditProfileForm
            onClose={() => setShowEditProfile(false)}
            onSuccess={() => setShowEditProfile(false)}
          />
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="border-b border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              {userData?.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt={userData.fullName || 'Profile'}
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center">
                  {userData?.fullName ? (
                    <span className="text-3xl font-bold text-orange-500">{getUserInitials()}</span>
                  ) : (
                    <UserCircle className="w-20 h-20 text-orange-500" />
                  )}
                </div>
              )}
              <button
                className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors shadow-lg"
                aria-label="Edit profile"
                onClick={() => setShowEditProfile(true)}
              >
                <Pencil className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {userData?.fullName || 'Welcome'}
              </h2>
              <p className="text-gray-600">{currentUser?.email}</p>
              <p className="text-gray-500 text-sm mt-1">
                Member since {formatDate(userData?.createdAt)}
              </p>
              {userData?.phone && (
                <p className="text-gray-500 text-sm">Phone: {userData.phone}</p>
              )}
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  onClick={() => setShowEditProfile(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => navigate('/settings')}
                >
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 border-b border-gray-100 pb-6">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-5 h-5 text-orange-500" />
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{orderCount}</div>
            <div className="text-sm text-gray-600">Orders</div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-xs text-gray-500">Total</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{favoritesCount}</div>
            <div className="text-sm text-gray-600">Favorites</div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <MapPin className="w-5 h-5 text-green-500" />
              <span className="text-xs text-gray-500">Saved</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{addressesCount}</div>
            <div className="text-sm text-gray-600">Addresses</div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-5 h-5 text-blue-500" />
              <span className="text-xs text-gray-500">Active</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{paymentMethodsCount}</div>
            <div className="text-sm text-gray-600">Cards</div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid gap-4 sm:grid-cols-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="border-b border-gray-100 p-4 hover:bg-gray-50 transition-all flex items-center gap-4"
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
          <button
            className="w-full sm:w-auto px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
