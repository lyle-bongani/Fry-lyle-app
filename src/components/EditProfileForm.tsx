import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { User, Mail, Phone, Camera, X, Check, Loader2, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

interface EditProfileFormProps {
    onClose: () => void;
    onSuccess?: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ onClose, onSuccess }) => {
    const { currentUser, userData, updateUser, uploadProfilePicture } = useAuth();
    const [loading, setLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [profileImageURL, setProfileImageURL] = useState<string | null>(userData?.profileImage || null);
    const [formData, setFormData] = useState({
        fullName: userData?.fullName || '',
        email: currentUser?.email || '',
        phone: userData?.phone || ''
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size must be less than 5MB');
                return;
            }

            setProfileImage(file);

            // Create a preview URL
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setProfileImageURL(event.target.result as string);
                    toast.success('Image selected! Click Save Changes to upload.');
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setProfileImage(null);
        setProfileImageURL(userData?.profileImage || null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        toast.success('Image removed');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Prepare update data
            const updateData: any = {};

            // Only include fields that changed
            if (formData.fullName !== userData?.fullName) {
                updateData.fullName = formData.fullName;
            }

            if (formData.phone !== userData?.phone) {
                updateData.phone = formData.phone;
            }

            // Handle profile image upload if selected
            let profileImageURL = userData?.profileImage;
            if (profileImage) {
                setImageUploading(true);
                toast.loading('Uploading profile image...');

                try {
                    profileImageURL = await uploadProfilePicture(profileImage);
                    updateData.profileImage = profileImageURL;
                    toast.dismiss();
                    toast.success('Profile image uploaded!');
                } catch (error: any) {
                    toast.dismiss();
                    toast.error('Failed to upload image: ' + error.message);
                    throw error;
                } finally {
                    setImageUploading(false);
                }
            }

            // Only update if there are changes
            if (Object.keys(updateData).length > 0) {
                await updateUser(updateData);
                toast.success('Profile updated successfully');
                if (onSuccess) onSuccess();
            }

            onClose();
        } catch (error: any) {
            console.error('Error updating profile:', error);
            toast.error(error.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Profile Image */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                        {profileImageURL ? (
                            <div className="relative">
                                <img
                                    src={profileImageURL}
                                    alt="Profile Preview"
                                    className="w-24 h-24 rounded-full object-cover cursor-pointer transition-all duration-300 hover:opacity-80"
                                    onClick={handleImageClick}
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div
                                className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
                                onClick={handleImageClick}
                            >
                                <Camera className="w-8 h-8 text-gray-400" />
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <div
                            className="absolute bottom-0 right-0 bg-orange-500 text-white rounded-full p-1.5 cursor-pointer shadow-lg hover:bg-orange-600 transition-colors"
                            onClick={handleImageClick}
                        >
                            {profileImage ? (
                                <Upload size={16} className="animate-pulse" />
                            ) : (
                                <Camera size={16} />
                            )}
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        {profileImage
                            ? `Selected: ${profileImage.name.substring(0, 20)}${profileImage.name.length > 20 ? '...' : ''}`
                            : 'Click to change profile picture'
                        }
                    </p>
                    {profileImage && (
                        <span className="text-xs text-orange-500 mt-1">
                            ({(profileImage.size / (1024 * 1024)).toFixed(2)} MB)
                        </span>
                    )}
                </div>

                {/* Full Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                </div>

                {/* Email (Readonly) */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            readOnly
                            className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Contact support to change your email address</p>
                </div>

                {/* Phone */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="pl-10 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        disabled={loading || imageUploading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading || imageUploading}
                        className="flex-1 py-2.5 px-4 bg-orange-500 rounded-lg text-white font-medium hover:bg-orange-600 transition-colors disabled:bg-orange-300 flex justify-center items-center gap-2"
                    >
                        {loading || imageUploading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                {imageUploading ? 'Uploading...' : 'Saving...'}
                            </>
                        ) : (
                            <>
                                <Check className="h-5 w-5" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm; 