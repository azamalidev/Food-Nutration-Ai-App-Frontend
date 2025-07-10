

import { Eye, Edit, Trash2, Utensils, X, Clock, Users, Flame } from 'lucide-react';
import { useState } from 'react';


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
                        <h2 className="text-2xl font-bold text-white dark:text-white">{dish.name}</h2>
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
                                    <h3 className="text-lg font-semibold text-white dark:text-white mb-2">Description</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{dish.description}</p>
                                </div>

                                {/* Tags */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white dark:text-white mb-3">Tags</h3>
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
                                    <h3 className="text-lg font-semibold text-white dark:text-white mb-3">
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
                                        <h3 className="text-lg font-semibold text-white dark:text-white mb-3">Instructions</h3>
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
                                    <h3 className="text-lg font-semibold text-white dark:text-white mb-4">Quick Info</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Servings:</span>
                                            <span className="font-medium text-white dark:text-white">{dish.servings}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Prep Time:</span>
                                            <span className="font-medium text-white dark:text-white">{dish.prep_time || 'N/A'} min</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Cook Time:</span>
                                            <span className="font-medium text-white dark:text-white">{dish.cookTime} min</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Total Time:</span>
                                            <span className="font-medium text-white dark:text-white">{dish.total_time || dish.cookTime} min</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Nutrition */}
                                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-white dark:text-white mb-4">Nutrition (per serving)</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Calories:</span>
                                            <span className="font-medium text-white dark:text-white">{dish.calories}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Protein:</span>
                                            <span className="font-medium text-white dark:text-white">{dish.protein}g</span>
                                        </div>
                                        {dish.nutritional_info && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">Carbs:</span>
                                                    <span className="font-medium text-white dark:text-white">{dish.nutritional_info.carbs}g</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">Fat:</span>
                                                    <span className="font-medium text-white dark:text-white">{dish.nutritional_info.fat}g</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">Fiber:</span>
                                                    <span className="font-medium text-white dark:text-white">{dish.nutritional_info.fiber}g</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600 dark:text-gray-400">Sodium:</span>
                                                    <span className="font-medium text-white dark:text-white">{dish.nutritional_info.sodium}mg</span>
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

export default function AdminMealsCard({
    meal,
    onDelete
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDishModalOpen, setIsDishModalOpen] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);

    const handleViewDishDetails = (dish) => {
        setSelectedDish(dish);
        setIsDishModalOpen(true);
    };

    const closeDishModal = () => {
        setIsDishModalOpen(false);
        setSelectedDish(null);
    };
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this meal? This action cannot be undone.')) {
            onDelete(meal._id);
        }
    };

    const handleViewDetails = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };



    const MealDetailSection = ({ title, dish, bgColor, borderColor, iconColor, onViewDetails }) => (
        <div className={`${bgColor} rounded-lg p-6 border ${borderColor}`}>

            <div className="flex items-center mb-4">
                <div className={`bg-opacity-20 p-3 rounded-full mr-4 ${iconColor.replace('text-', 'bg-')}`}>
                    <Utensils className={`h-5 w-5 ${iconColor}`} />
                </div>
                <h3 className={`text-lg font-semibold ${iconColor.replace('text-', 'text-').replace('-400', '-900').replace('-300', '-800')}`}>
                    {title}
                </h3>
                <button
                    onClick={() => onViewDetails(dish)}
                    className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="View details"
                >
                    <Eye className="h-4 w-4" />
                </button>
            </div>

            {dish ? (
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-white dark:text-white text-lg mb-2">
                            {dish.name}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {dish.description}
                        </p>

                    </div>
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="text-gray-400 dark:text-gray-500 mb-2">
                        <Utensils className="h-8 w-8 mx-auto" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">No {title.toLowerCase()} planned</p>
                </div>
            )}
        </div>
    );

    return (
        <>

            <div key={meal._id} className="bg-white text-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-white dark:text-white mb-2">
                                Meal Plan - {new Date(meal.plan_date).toLocaleDateString()}
                            </h3>
                            <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                <span>Total Calories: <span className="font-medium text-white dark:text-white">{meal.total_calories}</span></span>
                                <span>Protein: <span className="font-medium text-white dark:text-white">{meal.total_protein}g</span></span>
                                <span>Carbs: <span className="font-medium text-white dark:text-white">{meal.total_carbs}g</span></span>
                                <span>Fat: <span className="font-medium text-white dark:text-white">{meal.total_fat}g</span></span>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
                                onClick={handleViewDetails}
                                title="View Details"
                            >
                                <Eye className="h-4 w-4" />
                            </button>

                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                onClick={handleDelete}
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Breakfast */}
                        <div className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                            <div className="flex items-center mb-3">
                                <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-full mr-3">
                                    <Utensils className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                </div>
                                <h4 className="font-medium text-orange-900 dark:text-orange-300">Breakfast</h4>
                            </div>
                            <h5 className="font-medium text-white dark:text-white mb-2">{meal.breakfast_dish_id?.name || 'No breakfast'}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                {meal.breakfast_dish_id?.description || 'No description'}
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                    <span className="text-gray-100 dark:text-gray-400">Calories:</span>
                                    <span className="ml-1 font-medium">{meal.breakfast_dish_id?.calories || 0}</span>
                                </div>
                                <div>
                                    <span className="text-gray-100 dark:text-gray-400">Protein:</span>
                                    <span className="ml-1 font-medium">{meal.breakfast_dish_id?.protein || 0}g</span>
                                </div>

                                <div>
                                    <span className="text-gray-100 dark:text-gray-400">Servings:</span>
                                    <span className="ml-1 font-medium">{meal.breakfast_dish_id?.servings || 0}</span>
                                </div>
                            </div>
                        </div>

                        {/* Lunch */}
                        <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center mb-3">
                                <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full mr-3">
                                    <Utensils className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h4 className="font-medium text-blue-900 dark:text-blue-300">Lunch</h4>
                            </div>
                            <h5 className="font-medium text-white dark:text-white mb-2">{meal.lunch_dish_id?.name || 'No lunch'}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                {meal.lunch_dish_id?.description || 'No description'}
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                    <span className="text-gray-100 dark:text-gray-400">Calories:</span>
                                    <span className="ml-1 font-medium">{meal.lunch_dish_id?.calories || 0}</span>
                                </div>
                                <div>
                                    <span className="text-gray-100 dark:text-gray-400">Protein:</span>
                                    <span className="ml-1 font-medium">{meal.lunch_dish_id?.protein || 0}g</span>
                                </div>

                                <div>
                                    <span className="text-gray-100 dark:text-gray-400">Servings:</span>
                                    <span className="ml-1 font-medium">{meal.lunch_dish_id?.servings || 0}</span>
                                </div>
                            </div>
                        </div>

                        {/* Dinner */}
                        <div className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                            <div className="flex items-center mb-3">
                                <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full mr-3">
                                    <Utensils className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h4 className="font-medium text-purple-900 dark:text-purple-300">Dinner</h4>
                            </div>
                            <h5 className="font-medium text-white dark:text-white mb-2">{meal.dinner_dish_id?.name || 'No dinner'}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                {meal.dinner_dish_id?.description || 'No description'}
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                    <span className="text-gray-100 dark:text-gray-400">Calories:</span>
                                    <span className="ml-1 font-medium">{meal.dinner_dish_id?.calories || 0}</span>
                                </div>
                                <div>
                                    <span className="text-gray-100 dark:text-gray-400">Protein:</span>
                                    <span className="ml-1 font-medium ">{meal.dinner_dish_id?.protein || 0}g</span>
                                </div>

                                <div>
                                    <span className="text-gray-100 dark:text-gray-400">Servings:</span>
                                    <span className="ml-1 font-medium">{meal.dinner_dish_id?.servings || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-white dark:text-white">
                                        Meal Plan Details
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                                        {new Date(meal.plan_date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Total Nutrition Summary */}
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-red-50 dark:bg-red-900/10 rounded-lg p-3 text-center">
                                    <Flame className="h-5 w-5 text-red-500 mx-auto mb-1" />
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Calories</div>
                                    <div className="font-semibold text-white dark:text-white">{meal.total_calories}</div>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-3 text-center">
                                    <div className="w-5 h-5 bg-green-500 rounded-full mx-auto mb-1"></div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Protein</div>
                                    <div className="font-semibold text-white dark:text-white">{meal.total_protein}g</div>
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-lg p-3 text-center">
                                    <div className="w-5 h-5 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Carbs</div>
                                    <div className="font-semibold text-white dark:text-white">{meal.total_carbs}g</div>
                                </div>
                                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3 text-center">
                                    <div className="w-5 h-5 bg-blue-500 rounded-full mx-auto mb-1"></div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Fat</div>
                                    <div className="font-semibold text-white dark:text-white">{meal.total_fat}g</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-8">
                            <MealDetailSection
                                title="Breakfast"
                                dish={meal.breakfast_dish_id}
                                bgColor="bg-orange-50 dark:bg-orange-900/10"
                                borderColor="border-orange-200 dark:border-orange-800"
                                iconColor="text-orange-600 dark:text-orange-400"
                                onViewDetails={handleViewDishDetails}
                            />

                            <MealDetailSection
                                title="Lunch"
                                dish={meal.lunch_dish_id}
                                bgColor="bg-blue-50 dark:bg-blue-900/10"
                                borderColor="border-blue-200 dark:border-blue-800"
                                iconColor="text-blue-600 dark:text-blue-400"
                                onViewDetails={handleViewDishDetails}
                            />

                            <MealDetailSection
                                title="Dinner"
                                dish={meal.dinner_dish_id}
                                bgColor="bg-purple-50 dark:bg-purple-900/10"
                                borderColor="border-purple-200 dark:border-purple-800"
                                iconColor="text-purple-600 dark:text-purple-400"
                                onViewDetails={handleViewDishDetails}
                            />
                        </div>
                        <DishDetailModal
                            dish={selectedDish}
                            isOpen={isDishModalOpen}
                            onClose={closeDishModal}
                        />

                    </div>
                </div>
            )}
        </>
    );
}