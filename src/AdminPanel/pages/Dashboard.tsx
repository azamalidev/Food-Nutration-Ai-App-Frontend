import React, { useState, useEffect } from 'react';
import { Users, Package, DollarSign, Activity, TrendingUp, Calendar, Clock, BarChart3, AlertCircle, CheckCircle, UserCheck, Settings, Bell, Search, Filter, Download, Eye, Edit, Trash2, Plus, ChevronDown, ChevronUp, RefreshCw, Utensils, ChefHat } from 'lucide-react';
import AdminMealsCard from '../components/MealCard';
import AdminDishCard from '../components/DishCard';
import AdminUserCard from '../components/UserCard';

// Define User type based on API response
interface User {
  _id: string;
  email: string;
  password: string;
  role: string;
  __v: number;
  name?: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  activityLevel?: string;
  dietaryPreferance?: string;
  healthGoal?: string;
}

// Define API response structure
interface ApiResponse {
  meta: {
    status: number;
    response: string;
    message: string;
  };
  data: User[];
}

interface Activity {
  action: string;
  user: string;
  time: string;
  type: string;
  status?: string;
}

interface Dish {
  _id?: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookTime: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal_type: string;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_keto: boolean;
  cuisine_type: string;
  difficulty_level: string;
  tags: string[];
}

interface MealInfo {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servings: number;
}

interface MealPlan {
  _id?: string;
  date: string;
  breakfast_dish_id: MealInfo;
  lunch_dish_id: MealInfo;
  dinner_dish_id: MealInfo;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  userId?: string;
}

const Dash: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [meals, setMeals] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterMealType, setFilterMealType] = useState('all');
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);

  // Dashboard stats with real data
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalDishes: 0,
    totalMeals: 0,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { apiService } = await import('../../api/api');
      const response: ApiResponse = await apiService.getAllUsers();

      if (response.meta.status === 200 && response.data) {
        setUsers(response.data);
        setDashboardStats(prev => ({
          ...prev,
          totalUsers: response.data.length
        }));

        // Generate real activity from users
        const userActivity = response.data.slice(-4).map((user, index) => ({
          action: `User ${user.name || user.email} registered`,
          user: user.name || user.email,
          time: `${index + 1} ${index === 0 ? 'minute' : 'minutes'} ago`,
          type: 'user',
          status: 'success'
        }));
        setRecentActivity(prev => [...prev, ...userActivity]);
      } else {
        setError(response.meta.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Error fetching users');
      console.error('Error fetching users:', err);
    }
  };

  const fetchDishes = async () => {
    try {
      const { apiService } = await import('../../api/api');
      const response: ApiResponse = await apiService.getAllDishes();

      if (response.meta.status === 200 && response.data) {
        setDishes(response.data);
        setDashboardStats(prev => ({
          ...prev,
          totalDishes: response.data.length
        }));
      } else {
        setError(response.meta.message || 'Failed to fetch dishes');
      }
    } catch (err) {
      setError('Error fetching dishes');
      console.error('Error fetching dishes:', err);
    }
  };

  const fetchMeals = async () => {
    try {
      const { apiService } = await import('../../api/api');
      const response: ApiResponse = await apiService.getAllMeals();

      if (response && response.data) {
        setMeals(response.data);
        setDashboardStats(prev => ({
          ...prev,
          totalMeals: response.data.length
        }));
      } else {
        setError(response.meta.message || 'Failed to fetch meals');
      }
    } catch (err) {
      setError('Error fetching meals');
      console.error('Error fetching meals:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUsers = async (id) => {
    try {
      setLoading(true);
      const { apiService } = await import('../../api/api');
      const response: ApiResponse = await apiService.deleteUser(id);

      if (response.meta.status === 200 && response.data) {
        refreshData()
        setLoading(false)

      } else {
        setError(response.meta.message || 'Failed to delete users');
      }
    } catch (err) {
      setError('Error delete users');
      console.error('Error delete users:', err);
    }
  };
  const deleteMeals = async (id) => {
    try {
      setLoading(true);
      const { apiService } = await import('../../api/api');
      const response: ApiResponse = await apiService.deleteMealPlan(id);

      if (response.meta.status === 200 && response.data) {
        refreshData()
        setLoading(false)

      } else {
        setError(response.meta.message || 'Failed to delete users');
      }
    } catch (err) {
      setError('Error delete users');
      console.error('Error delete users:', err);
    }
  };
  const deleteDishes = async (id) => {
    try {
      setLoading(true);
      const { apiService } = await import('../../api/api');
      const response: ApiResponse = await apiService.deleteDish(id);

      if (response.meta.status === 200 && response.data) {
        refreshData()
        setLoading(false)

      } else {
        setError(response.meta.message || 'Failed to delete users');
      }
    } catch (err) {
      setError('Error delete users');
      console.error('Error delete users:', err);
    }
  };

  const updateUser = async (id, formData) => {

    try {
      const { apiService } = await import('../../api/api');
      const response = await apiService.updateUserAdmin(id, formData);
      if (response) {
        refreshData()
      }

    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Something went wrong. Please try again.');
    } finally {
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchUsers(), fetchDishes(), fetchMeals()]);
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMealType = filterMealType === 'all' || dish.meal_type === filterMealType;
    return matchesSearch && matchesMealType;
  });

  const filteredMeals = meals.filter(meal => {
    { console.log("mm", meals) }
    const matchesSearch = meal.breakfast_dish_id?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.lunch_dish_id?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.dinner_dish_id?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    { console.log("filteredMeals", matchesSearch) }
    return matchesSearch;
  });

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    await Promise.all([fetchUsers(), fetchDishes(), fetchMeals()]);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600"></div>
            <div className="text-xl text-gray-600 dark:text-gray-400">Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
            <div className="text-xl text-red-600 dark:text-red-400 mb-4">Error Loading Dashboard</div>
            <div className="text-gray-600 dark:text-gray-400 mb-6">{error}</div>
            <button
              onClick={refreshData}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your nutrition platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshData}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'meals', label: 'Meals', icon: Utensils },
              { id: 'dishes', label: 'Dishes', icon: ChefHat },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalUsers}</p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Dishes</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalDishes}</p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                    <ChefHat className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Meals</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardStats.totalMeals}</p>
                  </div>
                  <div className="bg-orange-100 dark:bg-orange-900/20 p-3 rounded-full">
                    <Utensils className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </div>


            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Management Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                <Plus className="h-4 w-4" />
                <span>Add User</span>
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="all">All Roles</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Health Goal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Activity Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredUsers.map((data) => (
                      <AdminUserCard user={data} onDelete={deleteUsers} onUpdate={updateUser} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dishes' && (
          <div className="space-y-6">
            {/* Dishes Management Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dishes Management</h2>

            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search dishes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={filterMealType}
                    onChange={(e) => setFilterMealType(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="all">All Meal Types</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Dishes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((data) => (
                <AdminDishCard dish={data} onDelete={deleteDishes} />
              ))}
            </div>

            {filteredDishes.length === 0 && (
              <div className="text-center py-12">
                <ChefHat className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No dishes found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'meals' && (
          <div className="space-y-6">
            {/* Meals Management Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Meal Plans Management</h2>

            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search meal plans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Meals List */}
            <div className="space-y-6">

              {filteredMeals.map((data) => (
                <AdminMealsCard meal={data} onDelete={deleteMeals} />
              ))}
            </div>

            {filteredMeals.length === 0 && (
              <div className="text-center py-12">
                <Utensils className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No meal plans found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or create a new meal plan</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dash;