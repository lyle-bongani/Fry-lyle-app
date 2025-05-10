import React, { useState } from 'react';
import { MapPin, Plus, Home, Briefcase, Building, Edit, Trash, Check } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import AddressForm from '../components/AddressForm';

interface Address {
    id: string;
    type: 'home' | 'work' | 'other';
    label?: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault?: boolean;
    instructions?: string;
}

export default function AddressesPage() {
    const { userData, updateUser } = useAuth();
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const addresses: Address[] = userData?.addresses || [];

    const getAddressTypeIcon = (type: string) => {
        switch (type) {
            case 'home':
                return <Home className="h-5 w-5" />;
            case 'work':
                return <Briefcase className="h-5 w-5" />;
            default:
                return <Building className="h-5 w-5" />;
        }
    };

    const getAddressLabel = (address: Address) => {
        if (address.type === 'home') return 'Home';
        if (address.type === 'work') return 'Work';
        return address.label || 'Other';
    };

    const handleEdit = (address: Address) => {
        setEditingAddress(address);
        setShowAddressForm(true);
    };

    const handleDeleteConfirm = (id: string) => {
        setConfirmDelete(id);
    };

    const handleDeleteCancel = () => {
        setConfirmDelete(null);
    };

    const handleDelete = async (id: string) => {
        try {
            const updatedAddresses = addresses.filter(address => address.id !== id);
            await updateUser({ addresses: updatedAddresses });
            toast.success('Address deleted');
            setConfirmDelete(null);
        } catch (error) {
            console.error('Error deleting address:', error);
            toast.error('Failed to delete address');
        }
    };

    const handleSetDefault = async (id: string) => {
        try {
            const updatedAddresses = addresses.map(address => ({
                ...address,
                isDefault: address.id === id
            }));

            await updateUser({ addresses: updatedAddresses });
            toast.success('Default address updated');
        } catch (error) {
            console.error('Error updating default address:', error);
            toast.error('Failed to update default address');
        }
    };

    const handleFormClose = () => {
        setShowAddressForm(false);
        setEditingAddress(null);
    };

    return (
        <PageLayout className="bg-white">
            {(showAddressForm || editingAddress) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <AddressForm
                        address={editingAddress || undefined}
                        onClose={handleFormClose}
                        onSuccess={handleFormClose}
                    />
                </div>
            )}

            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Addresses</h1>
                        <p className="text-gray-600">Manage your delivery addresses</p>
                    </div>
                    <button
                        onClick={() => setShowAddressForm(true)}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors"
                    >
                        <Plus size={18} />
                        <span>Add New</span>
                    </button>
                </div>

                {addresses.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <MapPin className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses yet</h3>
                        <p className="text-gray-600 mb-6">Add your first delivery address</p>
                        <button
                            onClick={() => setShowAddressForm(true)}
                            className="px-6 py-2.5 bg-orange-500 text-white rounded-lg inline-flex items-center gap-2 hover:bg-orange-600 transition-colors"
                        >
                            <Plus size={18} />
                            <span>Add Address</span>
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {addresses.map((address) => (
                            <div
                                key={address.id}
                                className={`border rounded-lg overflow-hidden ${address.isDefault ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
                            >
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`p-2 rounded-lg ${address.isDefault ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}`}>
                                                {getAddressTypeIcon(address.type)}
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">
                                                    {getAddressLabel(address)}
                                                    {address.isDefault && (
                                                        <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded">
                                                            Default
                                                        </span>
                                                    )}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(address)}
                                                className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                                                aria-label="Edit address"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteConfirm(address.id)}
                                                className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full"
                                                aria-label="Delete address"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-2 text-gray-700">
                                        <p>{address.street}</p>
                                        <p>{address.city}, {address.state} {address.zipCode}</p>
                                    </div>

                                    {address.instructions && (
                                        <div className="mt-2 text-sm text-gray-600">
                                            <p className="font-medium">Instructions:</p>
                                            <p>{address.instructions}</p>
                                        </div>
                                    )}

                                    {confirmDelete === address.id ? (
                                        <div className="mt-4 flex gap-2">
                                            <button
                                                onClick={() => handleDelete(address.id)}
                                                className="flex-1 py-2 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                            >
                                                Confirm Delete
                                            </button>
                                            <button
                                                onClick={handleDeleteCancel}
                                                className="flex-1 py-2 px-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : !address.isDefault && (
                                        <button
                                            onClick={() => handleSetDefault(address.id)}
                                            className="mt-4 w-full py-2 px-3 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Check size={16} />
                                            <span>Set as Default</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
} 