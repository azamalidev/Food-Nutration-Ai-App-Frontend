import { useState } from 'react';
import { Users, Package, DollarSign, Activity, TrendingUp, Calendar, Clock, BarChart3, AlertCircle, CheckCircle, UserCheck, Settings, Bell, Search, Filter, Download, Eye, Edit, Trash2, Plus, ChevronDown, ChevronUp, RefreshCw, Utensils, ChefHat, X } from 'lucide-react';

// Sample dish data for demonstration


function DishDetailModal({ dish, isOpen, onClose }) {
    if (!isOpen) return null;

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'hard':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const getMealTypeColor = (mealType) => {
        switch (mealType?.toLowerCase()) {
            case 'breakfast':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
            case 'lunch':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            case 'dinner':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
            case 'snack':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{dish.name}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 max-h-[80vh] overflow-y-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column - Main Info */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Description */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{dish.description}</p>
                                </div>

                                {/* Tags */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getMealTypeColor(dish.meal_type)}`}>
                                            {dish.meal_type}
                                        </span>
                                        <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(dish.difficulty_level)}`}>
                                            {dish.difficulty_level}
                                        </span>
                                        {dish.is_vegetarian && (
                                            <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                                Vegetarian
                                            </span>
                                        )}
                                        {dish.is_vegan && (
                                            <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
                                                Vegan
                                            </span>
                                        )}
                                        {dish.cuisine && (
                                            <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400">
                                                {dish.cuisine}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Ingredients */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        Ingredients ({dish.ingredients?.length || 0})
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {dish.ingredients?.map((ingredient, index) => (
                                            <div key={index} className="flex items-center">
                                                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                                                <span className="text-gray-700 dark:text-gray-300 capitalize">{ingredient}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Instructions */}
                                {dish.instructions && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Instructions</h3>
                                        <ol className="space-y-2">
                                            {dish.instructions.map((instruction, index) => (
                                                <li key={index} className="flex">
                                                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white text-sm font-medium rounded-full flex items-center justify-center mr-3">
                                                        {index + 1}
                                                    </span>
                                                    <span className="text-gray-700 dark:text-gray-300">{instruction}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    </div>
                                )}
                            </div>

                            {/* Right Column - Stats */}
                            <div className="space-y-6">
                                {/* Basic Stats */}
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Info</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Servings:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{dish.servings}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Prep Time:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{dish.prep_time || 'N/A'} min</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Cook Time:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{dish.cookTime} min</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Total Time:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{dish.total_time || dish.cookTime} min</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Nutrition */}
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Nutrition (per serving)</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Calories:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{dish.calories}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Protein:</span>
                                            <span className="font-medium text-gray-900 dark:text-white">{dish.protein}g</span>
                                        </div>
                                        {dish.nutritional_info && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">Carbs:</span>
                                                    <span className="font-medium text-gray-900 dark:text-white">{dish.nutritional_info.carbs}g</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">Fat:</span>
                                                    <span className="font-medium text-gray-900 dark:text-white">{dish.nutritional_info.fat}g</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">Fiber:</span>
                                                    <span className="font-medium text-gray-900 dark:text-white">{dish.nutritional_info.fiber}g</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">Sodium:</span>
                                                    <span className="font-medium text-gray-900 dark:text-white">{dish.nutritional_info.sodium}mg</span>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Allergens */}
                                {dish.allergens && dish.allergens.length > 0 && (
                                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                                        <h3 className="text-lg font-semibold text-red-900 dark:text-red-400 mb-2">Allergens</h3>
                                        <div className="flex flex-wrap gap-1">
                                            {dish.allergens.map((allergen, index) => (
                                                <span key={index} className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400 rounded">
                                                    {allergen}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AdminDishCard({ dish = sampleDish, onDelete }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this dish? This action cannot be undone.')) {
            onDelete(dish._id);
        }
    };

    const handleViewDetails = () => {
        setIsModalOpen(true);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
            case 'hard':
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    const getMealTypeColor = (mealType) => {
        switch (mealType?.toLowerCase()) {
            case 'breakfast':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
            case 'lunch':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
            case 'dinner':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
            case 'snack':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
        }
    };

    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{dish.name}</h3>
                        <div className="flex space-x-1">
                            <button
                                onClick={handleViewDetails}
                                className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                title="View details"
                            >
                                <Eye className="h-4 w-4" />
                            </button>
                            <button
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={handleDelete}
                                title="Delete dish"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{dish.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMealTypeColor(dish.meal_type)}`}>
                            {dish.meal_type}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(dish.difficulty_level)}`}>
                            {dish.difficulty_level}
                        </span>
                        {dish.is_vegetarian && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                Vegetarian
                            </span>
                        )}
                        {dish.is_vegan && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
                                Vegan
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-500 dark:text-gray-400">Calories:</span>
                            <span className="ml-1 font-medium text-gray-900 dark:text-white">{dish.calories}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 dark:text-gray-400">Cook Time:</span>
                            <span className="ml-1 font-medium text-gray-900 dark:text-white">{dish.cookTime}min</span>
                        </div>
                        <div>
                            <span className="text-gray-500 dark:text-gray-400">Protein:</span>
                            <span className="ml-1 font-medium text-gray-900 dark:text-white">{dish.protein}g</span>
                        </div>
                        <div>
                            <span className="text-gray-500 dark:text-gray-400">Servings:</span>
                            <span className="ml-1 font-medium text-gray-900 dark:text-white">{dish.servings}</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Ingredients ({dish.ingredients?.length || 0}):</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                            {dish.ingredients?.slice(0, 3).join(', ')}{dish.ingredients?.length > 3 ? '...' : ''}
                        </p>
                    </div>
                </div>
            </div>

            <DishDetailModal
                dish={dish}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}