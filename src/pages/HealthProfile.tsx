
// import React, { useEffect, useState } from 'react';
// import { Edit2, User, Target, Activity, Utensils, BookOpen, ShoppingCart, X, Calendar, Clock, Flame, ArrowLeft } from 'lucide-react';
// import MealsComponent from '../components/mealsProfile';
// import RecipeComponent from '../components/recipeProfile';
// import Navbar from '../components/navbar';

// const dietaryPreferences = [
//   'Vegetarian',
//   'Vegan',
//   'Pescatarian',
//   'Keto',
//   'Paleo',
//   'Gluten-Free',
//   'No Restrictions',
// ];

// const healthGoals = [
//   'Weight Loss',
//   'Muscle Gain',
//   'Maintain Weight',
//   'Better Energy',
//   'Improve Health',
//   'Diabetic-Friendly',
// ];

// const activityLevels = [
//   'Sedentary',
//   'Lightly Active',
//   'Moderately Active',
//   'Very Active',
//   'Extra Active',
// ];





// function HealthProfile() {
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [mealsData, setMealsData] = useState([]);
//   const [recipeData, setRecipeData] = useState([]);
//   const [showMealsComponent, setShowMealsComponent] = useState(false);
//   const [showRecipeComponent, setShowRecipeComponent] = useState(false);

//   const [profileData, setProfileData] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     weight: '',
//     height: '',
//     dietaryPreferance: '',
//     healthGoal: '',
//     activityLevel: '',
//   });

//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     weight: '',
//     height: '',
//     dietaryPreferance: '',
//     healthGoal: '',
//     activityLevel: '',
//   });
//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const { apiService } = await import('../api/api');
//       const response = await apiService.getUserProfile();
//       console.log("response", response);

//       if (response?.data) {
//         const userData = {
//           name: response.data.data.name || '',
//           age: response.data.data.age || '',
//           gender: response.data.data.gender || '',
//           weight: response.data.data.weight || '',
//           height: response.data.data.height || '',
//           dietaryPreferance: response.data.data.dietaryPreferance || '',
//           healthGoal: response.data.data.healthGoal || '',
//           activityLevel: response.data.data.activityLevel || '',
//         };
//         setProfileData(userData);
//         setFormData(userData);

//         // Set meals data if available
//         if (response.data.meals?.data) {
//           setMealsData(response.data.meals.data);
//         }
//         if (response.data.dish?.data) {
//           setRecipeData(response.data.dish.data);
//         }
//       }
//     } catch (error) {
//       console.error('Failed to fetch user profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {

//     fetchProfile();
//   }, []);


//   async function handleDeleteDish(dishId: string) {
//     try {
//       const { apiService } = await import('../api/api');
//       const result = await apiService.deleteDish(dishId);

//       if (result) {
//         fetchProfile();
//         handleBackToProfile();
//         console.log("Dish deleted successfully:", result.data);
//         // Remove deleted dish from local state (optional if data comes from props)
//       } else {
//         console.error("Failed to delete dish:", result.message);
//       }
//     } catch (error) {
//       console.error("Error deleting dish:", error);
//     }
//   }
//   const handleSubmit = async () => {
//     setUpdating(true);

//     try {
//       const { apiService } = await import('../api/api');
//       const response = await apiService.updateUserProfile(formData);

//       setProfileData(formData);
//       setShowModal(false);

//     } catch (error) {
//       console.error('Failed to update profile:', error);
//       alert('Something went wrong. Please try again.');
//     } finally {
//       setUpdating(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const openModal = () => {
//     setFormData(profileData);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setFormData(profileData);
//   };

//   const navigateToMeals = () => {
//     setShowMealsComponent(true);
//   };
//   const navigateToRecipes = () => {
//     setShowRecipeComponent(true);
//   };

//   const handleBackToProfile = () => {
//     setShowMealsComponent(false);
//     setShowRecipeComponent(false);

//   };

//   const formatValue = (value) => {
//     return value.split(' ').map(word =>
//       word.charAt(0).toUpperCase() + word.slice(1)
//     ).join(' ');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
//       </div>
//     );
//   }

//   // Show MealsComponent if state is true
//   if (showMealsComponent) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto">
//           {/* Back Button */}
//           <div className="mb-6">
//             <button
//               onClick={handleBackToProfile}
//               className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Profile
//             </button>
//           </div>

//           <MealsComponent
//             data={mealsData}
//             loading={false}
//             onDelete={handleDeleteDish}
//             title="My Meal Plans"
//             subtitle="Track your daily nutrition"
//           />
//         </div>
//       </div>
//     );
//   }
//   if (showRecipeComponent) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto">
//           {/* Back Button */}
//           <div className="mb-6">
//             <button
//               onClick={handleBackToProfile}
//               className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back to Profile
//             </button>
//           </div>

//           <RecipeComponent
//             data={recipeData}
//             loading={false}
//             onDelete={handleDeleteDish}
//             title="My Recipies "
//             subtitle="My Generated Recipies "
//           />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <Navbar />
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
//                 <User className="w-8 h-8 text-emerald-600" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
//                 <p className="text-gray-600">Health Profile</p>
//               </div>
//             </div>
//             <button
//               onClick={openModal}
//               className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
//             >
//               <Edit2 className="w-4 h-4 mr-2" />
//               Update Profile
//             </button>
//           </div>
//         </div>

//         {/* Profile Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Weight</p>
//                 <p className="text-2xl font-bold text-gray-900">{profileData.weight} kg</p>
//                 <p className="text-sm text-gray-500">Height: {profileData.height} cm</p>
//               </div>
//               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                 <Target className="w-6 h-6 text-green-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Activity Level</p>
//                 <p className="text-lg font-semibold text-gray-900">{formatValue(profileData.activityLevel)}</p>
//                 <p className="text-sm text-gray-500">Age: {profileData.age} years</p>
//               </div>
//               <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                 <Activity className="w-6 h-6 text-purple-600" />
//               </div>
//             </div>
//           </div>


//           {/* Daily Nutrition Summary */}
//           {mealsData.length > 0 && (
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-gray-600">Daily Calories</p>
//                   <p className="text-2xl font-bold text-gray-900">{mealsData[0].total_calories}</p>
//                   <p className="text-sm text-gray-500">Total for today</p>
//                 </div>
//                 <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
//                   <Flame className="w-6 h-6 text-red-600" />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         {/* Profile Details */}
//         <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Details</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <p className="text-sm text-gray-600">Gender</p>
//               <p className="text-gray-900 font-medium">{formatValue(profileData.gender)}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Dietary Preference</p>
//               <p className="text-gray-900 font-medium">{formatValue(profileData.dietaryPreferance)}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Health Goal</p>
//               <p className="text-gray-900 font-medium">{formatValue(profileData.healthGoal)}</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Activity Level</p>
//               <p className="text-gray-900 font-medium">{formatValue(profileData.activityLevel)}</p>
//             </div>
//           </div>
//         </div>
//         {/* Action Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div
//             onClick={navigateToMeals}
//             className="bg-white rounded-xl shadow-xl p-6 cursor-pointer hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
//                 <Utensils className="w-6 h-6 text-orange-600" />
//               </div>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Meal Plans</h3>
//             <p className="text-gray-600 text-sm">View and manage your personalized meal plans</p>
//           </div>

//           <div
//             onClick={navigateToRecipes}
//             className="bg-white rounded-xl shadow-xl p-6 cursor-pointer hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
//                 <BookOpen className="w-6 h-6 text-red-600" />
//               </div>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Recipes</h3>
//             <p className="text-gray-600 text-sm">Discover recipes tailored to your preferences</p>
//           </div>


//         </div>


//         {/* Update Profile Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//               <div className="p-6 border-b border-gray-500">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-xl font-semibold text-gray-900">Update Profile</h2>
//                   <button
//                     onClick={closeModal}
//                     className="text-gray-400 hover:text-gray-600"
//                   >
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
//                     <input
//                       type="text"
//                       name="name"
//                       required
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       value={formData.name}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
//                     <input
//                       type="number"
//                       name="age"
//                       required
//                       min="1"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       value={formData.age}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
//                     <select
//                       name="gender"
//                       required
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       value={formData.gender}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select gender</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
//                     <input
//                       type="number"
//                       name="weight"
//                       required
//                       min="20"
//                       max="300"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       value={formData.weight}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
//                     <input
//                       type="number"
//                       name="height"
//                       required
//                       min="100"
//                       max="250"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       value={formData.height}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Preference</label>
//                     <select
//                       name="dietaryPreferance"
//                       required
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       value={formData.dietaryPreferance}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select preference</option>
//                       {dietaryPreferences.map((pref) => (
//                         <option key={pref} value={pref.toLowerCase()}>
//                           {pref}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Health Goal</label>
//                     <select
//                       name="healthGoal"
//                       required
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       value={formData.healthGoal}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select goal</option>
//                       {healthGoals.map((goal) => (
//                         <option key={goal} value={goal.toLowerCase()}>
//                           {goal}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
//                     <select
//                       name="activityLevel"
//                       required
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//                       value={formData.activityLevel}
//                       onChange={handleChange}
//                     >
//                       <option value="">Select level</option>
//                       {activityLevels.map((level) => (
//                         <option key={level} value={level.toLowerCase()}>
//                           {level}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="flex justify-end space-x-4 mt-8">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleSubmit}
//                     disabled={updating}
//                     className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {updating ? 'Updating...' : 'Update Profile'}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default HealthProfile;



import React, { useEffect, useState } from 'react';
import { Edit2, User, Target, Activity, Utensils, BookOpen, X, ArrowLeft, Flame, Heart, TrendingUp, Calendar } from 'lucide-react';
import MealsComponent from '../components/mealsProfile';
import RecipeComponent from '../components/recipeProfile';
import Navbar from '../components/navbar';

const dietaryPreferences = [
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Keto',
  'Paleo',
  'Gluten-Free',
  'No Restrictions',
];

const healthGoals = [
  'Weight Loss',
  'Muscle Gain',
  'Maintain Weight',
  'Better Energy',
  'Improve Health',
  'Diabetic-Friendly',
];

const activityLevels = [
  'Sedentary',
  'Lightly Active',
  'Moderately Active',
  'Very Active',
  'Extra Active',
];

function HealthProfile() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [mealsData, setMealsData] = useState([]);
  const [recipeData, setRecipeData] = useState([]);
  const [showMealsComponent, setShowMealsComponent] = useState(false);
  const [showRecipeComponent, setShowRecipeComponent] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    dietaryPreferance: '',
    healthGoal: '',
    activityLevel: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    dietaryPreferance: '',
    healthGoal: '',
    activityLevel: '',
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { apiService } = await import('../api/api');
      const response = await apiService.getUserProfile();
      console.log("response", response);

      if (response?.data) {
        const userData = {
          name: response.data.data.name || '',
          age: response.data.data.age || '',
          gender: response.data.data.gender || '',
          weight: response.data.data.weight || '',
          height: response.data.data.height || '',
          dietaryPreferance: response.data.data.dietaryPreferance || '',
          healthGoal: response.data.data.healthGoal || '',
          activityLevel: response.data.data.activityLevel || '',
        };
        setProfileData(userData);
        setFormData(userData);

        if (response.data.meals?.data) {
          setMealsData(response.data.meals.data);
        }
        if (response.data.dish?.data) {
          setRecipeData(response.data.dish.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  async function handleDeleteDish(dishId) {
    try {
      const { apiService } = await import('../api/api');
      const result = await apiService.deleteDish(dishId);

      if (result) {
        fetchProfile();
        handleBackToProfile();
        console.log("Dish deleted successfully:", result.data);
      } else {
        console.error("Failed to delete dish:", result.message);
      }
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  }

  const handleSubmit = async () => {
    setUpdating(true);
    try {
      const { apiService } = await import('../api/api');
      const response = await apiService.updateUserProfile(formData);
      setProfileData(formData);
      setShowModal(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openModal = () => {
    setFormData(profileData);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(profileData);
  };

  const navigateToMeals = () => {
    setShowMealsComponent(true);
  };

  const navigateToRecipes = () => {
    setShowRecipeComponent(true);
  };

  const handleBackToProfile = () => {
    setShowMealsComponent(false);
    setShowRecipeComponent(false);
  };

  const formatValue = (value) => {
    if (!value) return 'Not set';
    return value.split(' ').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-200 border-t-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (showMealsComponent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <button
              onClick={handleBackToProfile}
              className="inline-flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-all duration-200 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Profile
            </button>
          </div>
          <MealsComponent
            data={mealsData}
            loading={false}
            onDelete={handleDeleteDish}
            title="My Meal Plans"
            subtitle="Track your daily nutrition"
          />
        </div>
      </div>
    );
  }

  if (showRecipeComponent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <button
              onClick={handleBackToProfile}
              className="inline-flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-all duration-200 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Profile
            </button>
          </div>
          <RecipeComponent
            data={recipeData}
            loading={false}
            onDelete={handleDeleteDish}
            title="My Recipes"
            subtitle="My Generated Recipes"
          />
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <Navbar />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-8 border border-emerald-100">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 w-full lg:w-auto">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    {profileData.name || 'Welcome'}
                  </h1>
                  <p className="text-gray-600 text-base sm:text-lg">Health Profile Dashboard</p>
                  <div className="flex items-center justify-center sm:justify-start mt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                      <Heart className="w-4 h-4 mr-1" />
                      {formatValue(profileData.healthGoal)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={openModal}
                className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base w-full sm:w-auto lg:w-auto"
              >
                <Edit2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Update Profile
              </button>
            </div>
          </div>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">


            {/* Weight & Height Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Weight</p>
                <p className="text-2xl font-bold text-gray-900">
                  {profileData.weight ? `${profileData.weight} kg` : '--'}
                </p>
                <p className="text-sm text-gray-500">
                  Height: {profileData.height ? `${profileData.height} cm` : '--'}
                </p>
              </div>
            </div>

            {/* Activity Level Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Activity Level</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatValue(profileData.activityLevel)}
                </p>
                <p className="text-sm text-gray-500">
                  Age: {profileData.age ? `${profileData.age} years` : '--'}
                </p>
              </div>
            </div>

            {/* Daily Calories Card */}
            {mealsData.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <Flame className="w-6 h-6 text-red-600" />
                  </div>
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Daily Calories</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mealsData[0].total_calories}
                  </p>
                  <p className="text-sm text-gray-500">Total for today</p>
                </div>
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Gender</p>
                  <p className="text-lg text-gray-900 font-medium">
                    {formatValue(profileData.gender)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Health Goal</p>
                  <p className="text-lg text-gray-900 font-medium">
                    {formatValue(profileData.healthGoal)}
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Dietary Preference</p>
                  <p className="text-lg text-gray-900 font-medium">
                    {formatValue(profileData.dietaryPreferance)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Activity Level</p>
                  <p className="text-lg text-gray-900 font-medium">
                    {formatValue(profileData.activityLevel)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              onClick={navigateToMeals}
              className="group bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <div className="text-orange-200 group-hover:text-orange-400 transition-colors">
                  <ArrowLeft className="w-6 h-6 rotate-180" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Meal Plans</h3>
              <p className="text-gray-600 leading-relaxed">
                View and manage your personalized meal plans tailored to your health goals and dietary preferences.
              </p>
              <div className="mt-4 text-sm text-orange-600 font-medium">
                {mealsData.length} meal plans available
              </div>
            </div>

            <div
              onClick={navigateToRecipes}
              className="group bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-red-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="text-red-200 group-hover:text-red-400 transition-colors">
                  <ArrowLeft className="w-6 h-6 rotate-180" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Recipes</h3>
              <p className="text-gray-600 leading-relaxed">
                Discover delicious recipes tailored to your dietary preferences and nutritional requirements.
              </p>
              <div className="mt-4 text-sm text-red-600 font-medium">
                {recipeData.length} recipes available
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Update Profile</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-600 mt-2">Keep your health profile up to date for better recommendations.</p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    required
                    min="1"
                    max="120"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    required
                    min="20"
                    max="300"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Enter weight in kg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    required
                    min="100"
                    max="250"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Enter height in cm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Dietary Preference</label>
                  <select
                    name="dietaryPreferance"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    value={formData.dietaryPreferance}
                    onChange={handleChange}
                  >
                    <option value="">Select preference</option>
                    {dietaryPreferences.map((pref) => (
                      <option key={pref} value={pref.toLowerCase()}>
                        {pref}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Health Goal</label>
                  <select
                    name="healthGoal"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    value={formData.healthGoal}
                    onChange={handleChange}
                  >
                    <option value="">Select goal</option>
                    {healthGoals.map((goal) => (
                      <option key={goal} value={goal.toLowerCase()}>
                        {goal}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Activity Level</label>
                  <select
                    name="activityLevel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    value={formData.activityLevel}
                    onChange={handleChange}
                  >
                    <option value="">Select level</option>
                    {activityLevels.map((level) => (
                      <option key={level} value={level.toLowerCase()}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={updating}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg"
                >
                  {updating ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Updating...
                    </span>
                  ) : (
                    'Update Profile'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthProfile;