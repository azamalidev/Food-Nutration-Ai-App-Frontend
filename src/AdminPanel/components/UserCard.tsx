import { useState } from 'react';
import { Eye, Edit, Trash2, X, User, Mail, Calendar, Target, Activity, Shield } from 'lucide-react';
import ProfileUpdateModal from '../pages/UserUpdateModal';

export default function AdminUserCard({
    user,
    onDelete,
    onUpdate // Add this prop to handle user updates
}) {
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [profileData, setProfileData] = useState(user);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            onDelete(user._id);
        }
    };

    const handleEdit = () => {
        setProfileData(user);
        setShowModal(true);
    };

    const handleView = () => {
        setShowViewModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setProfileData(user); // Reset to original data
    };

    const closeViewModal = () => {
        setShowViewModal(false);
    };

    const handleSubmit = async (formData) => {
        setUpdating(true);
        try {
            // Call the parent component's update handler if provided
            if (onUpdate) {
                onUpdate(user._id, formData);
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setUpdating(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                                {(user.name || user.email).charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.name || 'No Name'}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {user.email}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        }`}>
                        {user.role}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.healthGoal ? user.healthGoal.replace('_', ' ') : 'Not set'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.activityLevel || 'Not set'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                        <button
                            onClick={handleView}
                            className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
                        >
                            <Eye className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleEdit}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            <Edit className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </td>
            </tr>

            {/* View User Details Modal */}
            {showViewModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                User Details
                            </h3>
                            <button
                                onClick={closeViewModal}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Profile Header */}
                            <div className="flex items-center space-x-4">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center">
                                    <span className="text-white font-medium text-xl">
                                        {(user.name || user.email).charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {user.name || 'No Name'}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                                </div>
                            </div>

                            {/* User Information Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <Shield className="h-5 w-5 text-purple-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Role</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                {user.role}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <User className="h-5 w-5 text-blue-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">User ID</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                                                {user._id}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Calendar className="h-5 w-5 text-green-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Created Date</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {formatDate(user.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Calendar className="h-5 w-5 text-orange-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Last Updated</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {formatDate(user.updatedAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <Target className="h-5 w-5 text-red-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Health Goal</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                {user.healthGoal ? user.healthGoal.replace('_', ' ') : 'Not set'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Activity className="h-5 w-5 text-emerald-500" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">Activity Level</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                {user.activityLevel || 'Not set'}
                                            </p>
                                        </div>
                                    </div>

                                    {user.age && (
                                        <div className="flex items-center space-x-3">
                                            <User className="h-5 w-5 text-indigo-500" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Age</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {user.age} years
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {user.gender && (
                                        <div className="flex items-center space-x-3">
                                            <User className="h-5 w-5 text-pink-500" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Gender</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                    {user.gender}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Additional Information */}
                            {(user.weight || user.height || user.dietaryPreferences) && (
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                    <h5 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                        Additional Information
                                    </h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {user.weight && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Weight</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {user.weight} kg
                                                </p>
                                            </div>
                                        )}
                                        {user.height && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Height</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {user.height} cm
                                                </p>
                                            </div>
                                        )}
                                        {user.dietaryPreferences && (
                                            <div className="md:col-span-2">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Dietary Preferences</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                    {Array.isArray(user.dietaryPreferences)
                                                        ? user.dietaryPreferences.join(', ')
                                                        : user.dietaryPreferences}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={closeViewModal}
                                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Profile Modal */}
            <ProfileUpdateModal
                isOpen={showModal}
                onClose={closeModal}
                onSubmit={handleSubmit}
                initialData={profileData}
                isLoading={updating}
                title="Update Profile"
                subtitle="Keep your health profile up to date for better recommendations."
            />
        </>
    );
}