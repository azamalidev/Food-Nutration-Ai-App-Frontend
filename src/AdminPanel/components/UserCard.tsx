

import { useState } from 'react';
import { Eye, Edit, Trash2, X, User, Calendar, Target, Activity, Shield } from 'lucide-react';
import ProfileUpdateModal from './UserUpdateModal';
import { DeleteConfirmationModal } from './DeleteModal';

export default function AdminUserCard({
    user,
    onDelete,
    onUpdate // Add this prop to handle user updates
}) {
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [profileData, setProfileData] = useState(user);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        onDelete(user._id);
        setShowDeleteModal(false);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
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
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                userName={user.name}
            />

            {/* Mobile Card View */}
            <div className="block md:hidden bg-gray-800 rounded-lg p-4 mb-4 hover:bg-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-medium text-sm">
                                {(user.name || user.email).charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium text-white truncate">
                                {user.name || 'No Name'}
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                                {user.email}
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-2 flex-shrink-0">
                        <button
                            onClick={handleView}
                            className="text-emerald-400 hover:text-emerald-300 p-1"
                        >
                            <Eye className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleEdit}
                            className="text-blue-400 hover:text-blue-300 p-1"
                        >
                            <Edit className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-red-400 hover:text-red-300 p-1"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                        <span className="text-gray-400">Role:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin'
                            ? 'bg-purple-900/20 text-purple-400'
                            : 'bg-green-900/20 text-green-400'
                            }`}>
                            {user.role}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-400">Goal:</span>
                        <span className="ml-2 text-white">
                            {user.healthGoal ? user.healthGoal.replace('_', ' ') : 'Not set'}
                        </span>
                    </div>
                    <div className="col-span-2">
                        <span className="text-gray-400">Activity:</span>
                        <span className="ml-2 text-white">
                            {user.activityLevel || 'Not set'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Desktop Table Row */}
            <tr className="hidden md:table-row hover:bg-gray-700">
                <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-medium text-sm">
                                {(user.name || user.email).charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="ml-3 lg:ml-4 min-w-0">
                            <div className="text-sm font-medium text-white truncate">
                                {user.name || 'No Name'}
                            </div>
                            <div className="text-sm text-gray-400 truncate">
                                {user.email}
                            </div>
                        </div>
                    </div>
                </td>
                <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin'
                        ? 'bg-purple-900/20 text-purple-400'
                        : 'bg-green-900/20 text-green-400'
                        }`}>
                        {user.role}
                    </span>
                </td>
                <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-white">
                    <span className="hidden lg:inline">
                        {user.healthGoal ? user.healthGoal.replace('_', ' ') : 'Not set'}
                    </span>
                    <span className="lg:hidden">
                        {user.healthGoal ? user.healthGoal.replace('_', ' ').split(' ')[0] : 'Not set'}
                    </span>
                </td>
                <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-white">
                    <span className="hidden lg:inline">
                        {user.activityLevel || 'Not set'}
                    </span>
                    <span className="lg:hidden">
                        {user.activityLevel ? user.activityLevel.split(' ')[0] : 'Not set'}
                    </span>
                </td>
                <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-1 lg:space-x-2">
                        <button
                            onClick={handleView}
                            className="text-emerald-400 hover:text-emerald-300 p-1"
                        >
                            <Eye className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleEdit}
                            className="text-blue-400 hover:text-blue-300 p-1"
                        >
                            <Edit className="h-4 w-4" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="text-red-400 hover:text-red-300 p-1"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </td>
            </tr>

            {/* View User Details Modal */}
            {showViewModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-700">
                            <h3 className="text-lg font-semibold text-white">
                                User Details
                            </h3>
                            <button
                                onClick={closeViewModal}
                                className="text-gray-400 hover:text-gray-300 p-1"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-4 lg:p-6 space-y-6">
                            {/* Profile Header */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-medium text-xl">
                                        {(user.name || user.email).charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h4 className="text-xl font-semibold text-white">
                                        {user.name || 'No Name'}
                                    </h4>
                                    <p className="text-gray-400 break-all">{user.email}</p>
                                </div>
                            </div>

                            {/* User Information Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <Shield className="h-5 w-5 text-purple-500 flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-white">Role</p>
                                            <p className="text-sm text-gray-400 capitalize">
                                                {user.role}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <User className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-white">User ID</p>
                                            <p className="text-sm text-gray-400 font-mono break-all">
                                                {user._id}
                                            </p>
                                        </div>
                                    </div>


                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <Target className="h-5 w-5 text-red-500 flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-white">Health Goal</p>
                                            <p className="text-sm text-gray-400 capitalize">
                                                {user.healthGoal ? user.healthGoal.replace('_', ' ') : 'Not set'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <Activity className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-white">Activity Level</p>
                                            <p className="text-sm text-gray-400 capitalize">
                                                {user.activityLevel || 'Not set'}
                                            </p>
                                        </div>
                                    </div>

                                    {user.age && (
                                        <div className="flex items-center space-x-3">
                                            <User className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-white">Age</p>
                                                <p className="text-sm text-gray-400">
                                                    {user.age} years
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {user.gender && (
                                        <div className="flex items-center space-x-3">
                                            <User className="h-5 w-5 text-pink-500 flex-shrink-0" />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-white">Gender</p>
                                                <p className="text-sm text-gray-400 capitalize">
                                                    {user.gender}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Additional Information */}
                            {(user.weight || user.height || user.dietaryPreferences) && (
                                <div className="border-t border-gray-700 pt-6">
                                    <h5 className="text-lg font-medium text-white mb-4">
                                        Additional Information
                                    </h5>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {user.weight && (
                                            <div>
                                                <p className="text-sm font-medium text-white">Weight</p>
                                                <p className="text-sm text-gray-400">
                                                    {user.weight} kg
                                                </p>
                                            </div>
                                        )}
                                        {user.height && (
                                            <div>
                                                <p className="text-sm font-medium text-white">Height</p>
                                                <p className="text-sm text-gray-400">
                                                    {user.height} cm
                                                </p>
                                            </div>
                                        )}
                                        {user.dietaryPreferences && (
                                            <div className="sm:col-span-2">
                                                <p className="text-sm font-medium text-white">Dietary Preferences</p>
                                                <p className="text-sm text-gray-400 capitalize">
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

                        <div className="flex justify-end p-4 lg:p-6 border-t border-gray-700">
                            <button
                                onClick={closeViewModal}
                                className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors"
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