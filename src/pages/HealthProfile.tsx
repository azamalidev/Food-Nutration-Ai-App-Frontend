import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dietaryPreferances = [
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
  const navigate = useNavigate();
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


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { apiService } = await import('../api/api');
        const response = await apiService.getUserProfile();
        if (response?.data) {
          setFormData({
            name: response.data.name || '',
            age: response.data.age || '',
            gender: response.data.gender || '',
            weight: response.data.weight || '',
            height: response.data.height || '',
            dietaryPreferance: response.data.dietaryPreferance || '',
            healthGoal: response.data.healthGoal || '',
            activityLevel: response.data.activityLevel || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call your PATCH API
      const { apiService } = await import('../api/api');
      const response = await apiService.updateUserProfile(formData);

      // Store locally if needed
      localStorage.setItem('userProfile', JSON.stringify(formData));
      console.log("res", response)
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Create Your Health Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                required
                min="1"
                max="120"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
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
              <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                required
                min="20"
                max="300"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
              <input
                type="number"
                name="height"
                required
                min="100"
                max="250"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                value={formData.height}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dietary Preference
              </label>
              <select
                name="dietaryPreferance"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                value={formData.dietaryPreferance}
                onChange={handleChange}
              >
                <option value="">Select preference</option>
                {dietaryPreferances.map((pref) => (
                  <option key={pref} value={pref.toLowerCase()}>
                    {pref}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Health Goal</label>
              <select
                name="healthGoal"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
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
              <label className="block text-sm font-medium text-gray-700">
                Activity Level
              </label>
              <select
                name="activityLevel"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
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

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-emerald-700 transition-colors"
            >
              Continue to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HealthProfile;