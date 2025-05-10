import React, { useState, ChangeEvent, FormEvent } from 'react';
import { MapPin, Home, Building, Briefcase, X, Check, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

interface Address {
    id?: string;
    type: 'home' | 'work' | 'other';
    label?: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault?: boolean;
    instructions?: string;
}

interface AddressFormProps {
    address?: Address;
    onClose: () => void;
    onSuccess?: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, onClose, onSuccess }) => {
    const { addAddress, updateUser, userData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Address>(
        address || {
            type: 'home',
            street: '',
            city: '',
            state: '',
            zipCode: '',
            isDefault: false,
            instructions: ''
        }
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleTypeSelect = (type: 'home' | 'work' | 'other') => {
        setFormData(prev => ({ ...prev, type }));
    };

    const validateForm = () => {
        if (!formData.street.trim()) return 'Street address is required';
        if (!formData.city.trim()) return 'City is required';
        if (!formData.state.trim()) return 'State is required';
        if (!formData.zipCode.trim()) return 'ZIP code is required';
        return null;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const error = validateForm();
        if (error) {
            toast.error(error);
            return;
        }

        setLoading(true);
        try {
            const newAddress = {
                ...formData,
                id: address?.id || `address_${Date.now()}`
            };

            if (address) {
                // Update existing address
                const updatedAddresses = userData?.addresses?.map((addr: Address) =>
                    addr.id === address.id ? newAddress : addr
                ) || [newAddress];

                await updateUser({ addresses: updatedAddresses });
            } else {
                // Add new address
                await addAddress(newAddress);
            }

            toast.success(address ? 'Address updated' : 'Address added');
            if (onSuccess) onSuccess();
            onClose();
        } catch (error: any) {
            console.error('Error saving address:', error);
            toast.error(error.message || 'Failed to save address');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                    {address ? 'Edit Address' : 'Add New Address'}
                </h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Address Type */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Type
                    </label>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            className={`flex-1 py-2 px-3 rounded-lg border ${formData.type === 'home'
                                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                                    : 'border-gray-300 text-gray-600'
                                } flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors`}
                            onClick={() => handleTypeSelect('home')}
                        >
                            <Home size={18} />
                            <span>Home</span>
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-2 px-3 rounded-lg border ${formData.type === 'work'
                                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                                    : 'border-gray-300 text-gray-600'
                                } flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors`}
                            onClick={() => handleTypeSelect('work')}
                        >
                            <Briefcase size={18} />
                            <span>Work</span>
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-2 px-3 rounded-lg border ${formData.type === 'other'
                                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                                    : 'border-gray-300 text-gray-600'
                                } flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors`}
                            onClick={() => handleTypeSelect('other')}
                        >
                            <Building size={18} />
                            <span>Other</span>
                        </button>
                    </div>
                </div>

                {/* Label (optional for 'other' type) */}
                {formData.type === 'other' && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Label (optional)
                        </label>
                        <input
                            type="text"
                            name="label"
                            value={formData.label || ''}
                            onChange={handleChange}
                            placeholder="E.g., Mom's house, Gym"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                )}

                {/* Street Address */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address*
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            placeholder="123 Main St, Apt 4B"
                            className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            required
                        />
                    </div>
                </div>

                {/* City, State, ZIP */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            City*
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            State*
                        </label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="State"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            required
                        />
                    </div>
                </div>

                {/* ZIP Code */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code*
                    </label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="ZIP Code"
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        required
                    />
                </div>

                {/* Delivery Instructions */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Instructions (optional)
                    </label>
                    <textarea
                        name="instructions"
                        value={formData.instructions || ''}
                        onChange={handleChange}
                        placeholder="E.g., Ring doorbell, leave at front door, etc."
                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 min-h-[80px]"
                    />
                </div>

                {/* Set as Default */}
                <div className="mb-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleCheckboxChange}
                            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 h-4 w-4"
                        />
                        <span className="ml-2 text-sm text-gray-700">Set as default address</span>
                    </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-2.5 px-4 bg-orange-500 rounded-lg text-white font-medium hover:bg-orange-600 transition-colors disabled:bg-orange-300 flex justify-center items-center"
                    >
                        {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <>
                                <Check className="h-5 w-5 mr-1" />
                                {address ? 'Update Address' : 'Save Address'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddressForm; 