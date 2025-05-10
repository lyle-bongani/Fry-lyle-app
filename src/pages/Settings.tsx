import React, { useState } from 'react';
import { Bell, Shield, Moon, Globe, HelpCircle, Info, Mail, Phone, ChevronRight, User, CreditCard, Gift, Map, LogOut } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface SettingSection {
    title: string;
    items: {
        icon: React.ReactElement;
        label: string;
        description?: string;
        value?: string;
        toggle?: boolean;
        action?: () => void;
    }[];
}

export default function Settings() {
    const { currentUser, userData, logout } = useAuth();
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

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

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/welcome');
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    const accountSettingsSections: SettingSection[] = [
        {
            title: 'Account Settings',
            items: [
                {
                    icon: <User className="w-5 h-5 text-blue-500" />,
                    label: 'Personal Information',
                    description: 'Edit your name, email and profile',
                    value: userData?.fullName || currentUser?.email?.split('@')[0] || 'User',
                    action: () => navigate('/profile')
                },
                {
                    icon: <Mail className="w-5 h-5 text-indigo-500" />,
                    label: 'Email Address',
                    description: 'Your account email',
                    value: currentUser?.email || 'Not set'
                },
                {
                    icon: <Phone className="w-5 h-5 text-green-500" />,
                    label: 'Phone Number',
                    description: 'Manage your contact details',
                    value: userData?.phone || 'Not set'
                },
                {
                    icon: <CreditCard className="w-5 h-5 text-indigo-500" />,
                    label: 'Payment Methods',
                    description: 'Add and manage payment methods',
                    action: () => navigate('/payment')
                },
                {
                    icon: <Map className="w-5 h-5 text-pink-500" />,
                    label: 'Addresses',
                    description: 'Add and manage delivery addresses',
                    value: userData?.addresses?.length ? `${userData.addresses.length} saved` : 'None saved',
                    action: () => navigate('/addresses')
                },
                {
                    icon: <Gift className="w-5 h-5 text-yellow-500" />,
                    label: 'Rewards',
                    description: 'Check your rewards and offers',
                    value: '0 points'
                },
                {
                    icon: <LogOut className="w-5 h-5 text-red-500" />,
                    label: 'Log Out',
                    description: 'Sign out of your account',
                    action: handleLogout
                }
            ]
        }
    ];

    const appSettingsSections: SettingSection[] = [
        {
            title: 'App Preferences',
            items: [
                {
                    icon: <Bell className="w-5 h-5 text-orange-500" />,
                    label: 'Notifications',
                    description: 'Manage your notification preferences',
                    toggle: true,
                    action: () => setNotifications(!notifications)
                },
                {
                    icon: <Moon className="w-5 h-5 text-purple-500" />,
                    label: 'Dark Mode',
                    description: 'Toggle dark mode on/off',
                    toggle: true,
                    action: () => setDarkMode(!darkMode)
                },
                {
                    icon: <Globe className="w-5 h-5 text-blue-500" />,
                    label: 'Language',
                    description: 'Choose your preferred language',
                    value: 'English'
                }
            ]
        },
        {
            title: 'Privacy & Security',
            items: [
                {
                    icon: <Shield className="w-5 h-5 text-green-500" />,
                    label: 'Privacy Settings',
                    description: 'Manage your privacy preferences',
                    action: () => navigate('/privacy')
                },
                {
                    icon: <Mail className="w-5 h-5 text-red-500" />,
                    label: 'Email Preferences',
                    description: 'Manage email notifications'
                }
            ]
        },
        {
            title: 'Support',
            items: [
                {
                    icon: <HelpCircle className="w-5 h-5 text-blue-500" />,
                    label: 'Help Center',
                    description: 'Get help with your orders',
                    action: () => navigate('/help')
                },
                {
                    icon: <Phone className="w-5 h-5 text-green-500" />,
                    label: 'Contact Support',
                    description: '24/7 customer service'
                },
                {
                    icon: <Info className="w-5 h-5 text-orange-500" />,
                    label: 'About',
                    description: 'App version and information',
                    action: () => navigate('/about')
                }
            ]
        }
    ];

    const renderSettingSection = (section: SettingSection, index: number, totalSections: number) => (
        <div
            key={section.title}
            className={`border-b border-gray-100 ${index !== totalSections - 1 ? 'mb-6' : ''}`}
        >
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
            </div>
            <div className="divide-y divide-gray-100">
                {section.items.map((item) => (
                    <div
                        key={item.label}
                        className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={item.action}
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-50 rounded-lg">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">{item.label}</h3>
                                {item.description && (
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {item.value && (
                                <span className="text-sm text-gray-600">{item.value}</span>
                            )}
                            {item.toggle ? (
                                <button
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${item.label === 'Dark Mode' ?
                                            (darkMode ? 'bg-orange-500' : 'bg-gray-200') :
                                            (notifications ? 'bg-orange-500' : 'bg-gray-200')
                                        }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (item.action) item.action();
                                    }}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.label === 'Dark Mode' ?
                                                (darkMode ? 'translate-x-6' : 'translate-x-1') :
                                                (notifications ? 'translate-x-6' : 'translate-x-1')
                                            }`}
                                    />
                                </button>
                            ) : item.action ? (
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <PageLayout className="bg-white" fullWidth={true}>
            <div className="w-full">
                {/* User Profile Summary */}
                <div className="border-b border-gray-100 mb-6 p-6">
                    <div className="flex items-center gap-6">
                        {userData?.profileImage ? (
                            <img
                                src={userData.profileImage}
                                alt={userData.fullName || 'Profile'}
                                className="w-20 h-20 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-2xl">
                                {getUserInitials()}
                            </div>
                        )}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {userData?.fullName || currentUser?.email?.split('@')[0] || 'User'}
                            </h2>
                            <p className="text-gray-600">{currentUser?.email}</p>
                            <p className="text-sm text-gray-500 mt-1">Member since {formatDate(userData?.createdAt)}</p>
                        </div>
                    </div>
                </div>

                {/* Two column layout for desktop */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column - Account Settings */}
                    <div className="lg:w-1/3">
                        {accountSettingsSections.map((section, index) =>
                            renderSettingSection(section, index, accountSettingsSections.length)
                        )}
                    </div>

                    {/* Right Column - App Settings and Support */}
                    <div className="lg:w-2/3">
                        {appSettingsSections.map((section, index) =>
                            renderSettingSection(section, index, appSettingsSections.length)
                        )}
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    App Version 1.0.0
                </div>
            </div>
        </PageLayout>
    );
} 