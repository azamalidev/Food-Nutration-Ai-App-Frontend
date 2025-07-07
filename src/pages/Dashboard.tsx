
import React, { useState, useEffect } from 'react';
import { Brain, Camera, ShoppingCart, Utensils, Video, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  apiService,
  MealPlan,
  GenerateMeal,
  RecipeRecommendation,
  RecipeRecommendationRequest,
  GroceryItem,
  GroceryListRequest
} from '../api/api';

const Dashboard = () => {
  const [selectedFeature, setSelectedFeature] = useState('meal-planning');
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [recipes, setRecipes] = useState<RecipeRecommendation[]>([]);
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [availableIngredients, setAvailableIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuth();
  const navigate = useNavigate();

  const generateMealPlan = async () => {
    if (!user) {
      setError('Please log in to generate a meal plan');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userProfile: GenerateMeal = {
        age: user.age,
        gender: user.gender,
        weight: user.weight,
        height: user.height,
        activityLevel: user.activityLevel,
        dietaryPreferance: user.dietaryPreferance,
        healthGoal: user.healthGoal,
      };

      const response = await apiService.generateMealPlan(userProfile);
      setMealPlan(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate meal plan');
    } finally {
      setLoading(false);
    }
  };

  const getRecipeRecommendations = async () => {
    if (availableIngredients.length === 0) {
      setError('Please add some ingredients first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const requestData: RecipeRecommendationRequest = {
        availableIngredients,
        dietaryPreferences: user?.dietaryPreferance ? [user.dietaryPreferance] : [],
        maxPrepTime: 60,
        cuisineType: 'any'
      };

      const response = await apiService.getRecipeRecommendations(requestData);
      setRecipes(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get recipe recommendations');
    } finally {
      setLoading(false);
    }
  };

  const generateGroceryList = async () => {
    if (!mealPlan) {
      setError('Please generate a meal plan first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const requestData: GroceryListRequest = {
        mealPlan
      };

      const response = await apiService.generateGroceryList(requestData);
      setGroceryList(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate grocery list');
    } finally {
      setLoading(false);
    }
  };

  const addIngredient = () => {
    if (newIngredient.trim() && !availableIngredients.includes(newIngredient.trim())) {
      setAvailableIngredients([...availableIngredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setAvailableIngredients(availableIngredients.filter(item => item !== ingredient));
  };

  const MealPlanningComponent = () => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">AI Meal Planning</h3>
        <button
          onClick={generateMealPlan}
          disabled={loading}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate New Plan'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      )}

      {mealPlan && !loading && (
        <div className="space-y-6">
          <div className="bg-emerald-50 p-4 rounded-lg">
            <h4 className="font-semibold text-emerald-800 mb-2">Daily Nutrition Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-emerald-600">{mealPlan.totalCalories}</div>
                <div className="text-gray-600">Calories</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-emerald-600">{mealPlan.totalProtein}g</div>
                <div className="text-gray-600">Protein</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-emerald-600">{mealPlan.totalCarbs}g</div>
                <div className="text-gray-600">Carbs</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-emerald-600">{mealPlan.totalFat}g</div>
                <div className="text-gray-600">Fat</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Breakfast */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-orange-600 mb-2">🌅 Breakfast</h4>
              <h5 className="font-medium mb-2">{mealPlan.breakfast.name}</h5>
              <p className="text-sm text-gray-600 mb-3">{mealPlan.breakfast.description}</p>

              <div className="text-xs text-gray-500 mb-3">
                <span className="mr-4">⏱️ {mealPlan.breakfast.prepTime} min</span>
                <span>{mealPlan.breakfast.calories} cal</span>
              </div>

              <details className="text-sm">
                <summary className="cursor-pointer text-emerald-600 hover:text-emerald-700">
                  View Details
                </summary>
                <div className="mt-2 space-y-2">
                  <div>
                    <strong>Ingredients:</strong>
                    <ul className="list-disc list-inside text-xs mt-1">
                      {mealPlan.breakfast.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Instructions:</strong>
                    <ol className="list-decimal list-inside text-xs mt-1">
                      {mealPlan.breakfast.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </details>
            </div>

            {/* Lunch */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-yellow-600 mb-2">☀️ Lunch</h4>
              <h5 className="font-medium mb-2">{mealPlan.lunch.name}</h5>
              <p className="text-sm text-gray-600 mb-3">{mealPlan.lunch.description}</p>

              <div className="text-xs text-gray-500 mb-3">
                <span className="mr-4">⏱️ {mealPlan.lunch.prepTime} min</span>
                <span>{mealPlan.lunch.calories} cal</span>
              </div>

              <details className="text-sm">
                <summary className="cursor-pointer text-emerald-600 hover:text-emerald-700">
                  View Details
                </summary>
                <div className="mt-2 space-y-2">
                  <div>
                    <strong>Ingredients:</strong>
                    <ul className="list-disc list-inside text-xs mt-1">
                      {mealPlan.lunch.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Instructions:</strong>
                    <ol className="list-decimal list-inside text-xs mt-1">
                      {mealPlan.lunch.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </details>
            </div>

            {/* Dinner */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold text-purple-600 mb-2">🌙 Dinner</h4>
              <h5 className="font-medium mb-2">{mealPlan.dinner.name}</h5>
              <p className="text-sm text-gray-600 mb-3">{mealPlan.dinner.description}</p>

              <div className="text-xs text-gray-500 mb-3">
                <span className="mr-4">⏱️ {mealPlan.dinner.prepTime} min</span>
                <span>{mealPlan.dinner.calories} cal</span>
              </div>

              <details className="text-sm">
                <summary className="cursor-pointer text-emerald-600 hover:text-emerald-700">
                  View Details
                </summary>
                <div className="mt-2 space-y-2">
                  <div>
                    <strong>Ingredients:</strong>
                    <ul className="list-disc list-inside text-xs mt-1">
                      {mealPlan.dinner.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Instructions:</strong>
                    <ol className="list-decimal list-inside text-xs mt-1">
                      {mealPlan.dinner.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      )}

      {!mealPlan && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Generate your personalized meal plan based on your profile
          </p>
          <button
            onClick={generateMealPlan}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Generate My Meal Plan
          </button>
        </div>
      )}
    </div>
  );

  const RecipesComponent = () => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Recipe Recommendations</h3>
        <button
          onClick={getRecipeRecommendations}
          disabled={loading || availableIngredients.length === 0}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Finding Recipes...' : 'Get Recommendations'}
        </button>
      </div>

      {/* Ingredient Input */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Available Ingredients</h4>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="Add an ingredient..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
          />
          <button
            onClick={addIngredient}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {availableIngredients.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {availableIngredients.map((ingredient, index) => (
              <span
                key={index}
                className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-40 bg-gray-200 rounded-lg"></div>
              <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="mt-1 h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {recipes.length > 0 && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipes.map((recipe, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">{recipe.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <span>⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                <span>🍽️ {recipe.servings} servings</span>
                <span>🔥 {recipe.calories} cal</span>
                <span className={`px-2 py-1 rounded-full ${recipe.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  recipe.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                  {recipe.difficulty}
                </span>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {recipe.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <details className="text-sm">
                <summary className="cursor-pointer text-emerald-600 hover:text-emerald-700">
                  View Recipe
                </summary>
                <div className="mt-2 space-y-2">
                  <div>
                    <strong>Ingredients:</strong>
                    <ul className="list-disc list-inside text-xs mt-1">
                      {recipe.ingredients.map((ingredient, ingredientIndex) => (
                        <li key={ingredientIndex}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Instructions:</strong>
                    <ol className="list-decimal list-inside text-xs mt-1">
                      {recipe.instructions.map((instruction, instructionIndex) => (
                        <li key={instructionIndex}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>
      )}

      {recipes.length === 0 && !loading && availableIngredients.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Add some ingredients to get personalized recipe recommendations
          </p>
        </div>
      )}
    </div>
  );

  const GroceryListComponent = () => (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Smart Shopping List</h3>
        <button
          onClick={generateGroceryList}
          disabled={loading || !mealPlan}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate List'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="animate-pulse space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      )}

      {groceryList.length > 0 && !loading && (
        <div className="space-y-4">
          {Object.entries(
            groceryList.reduce((acc, item) => {
              if (!acc[item.category]) acc[item.category] = [];
              acc[item.category].push(item);
              return acc;
            }, {} as Record<string, GroceryItem[]>)
          ).map(([category, items]) => (
            <div key={category} className="border rounded-lg p-4">
              <h4 className="font-semibold text-emerald-700 mb-3 capitalize">{category}</h4>
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-3 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span className="flex-1">{item.name}</span>
                    <span className="text-sm text-gray-500">{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {groceryList.length === 0 && !loading && !mealPlan && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Generate a meal plan first to create your shopping list
          </p>
          <button
            onClick={() => setSelectedFeature('meal-planning')}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Go to Meal Planning
          </button>
        </div>
      )}

      {groceryList.length === 0 && !loading && mealPlan && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Generate your shopping list based on your meal plan
          </p>
          <button
            onClick={generateGroceryList}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Generate Shopping List
          </button>
        </div>
      )}
    </div>
  );

  const features = [
    {
      id: 'meal-planning',
      icon: Brain,
      title: 'AI Meal Planning',
      component: MealPlanningComponent,
    },
    {
      id: 'nutrition-analysis',
      icon: Camera,
      title: 'Nutrition Analysis',
      component: () => (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Food Analysis</h3>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Upload a food image or scan a barcode to analyze
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'grocery-list',
      icon: ShoppingCart,
      title: 'Grocery List',
      component: GroceryListComponent,
    },
    {
      id: 'recipes',
      icon: Utensils,
      title: 'Recipes',
      component: RecipesComponent,
    },
    {
      id: 'consultation',
      icon: Video,
      title: 'Video Consultation',
      component: () => (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Book a Consultation</h3>
          <div className="space-y-4">
            <p className="text-gray-600">
              Schedule a video call with a certified nutritionist
            </p>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
              Book Appointment
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <Brain className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">NutriAI</span>
            </div>
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/profile')}>
              <span className="text-gray-600">Welcome, {user?.email || 'User'}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedFeature === feature.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span>{feature.title}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          {features.find((f) => f.id === selectedFeature)?.component()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;