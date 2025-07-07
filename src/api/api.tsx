



// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:2022';

// Types for API responses
interface ApiResponse {
    success: boolean;
    data: any;
    message?: string;
}

interface RegisterData {
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface UserProfile {
    _id: string;
    role: string;
    email: string;
}

interface GenerateMeal {
    healthGoal: string;
    dietaryPreferance: string;
    activityLevel: string;
    height: number;
    weight: number;
    gender: string;
    age: number;
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
    date: string;
    breakfast: MealInfo;
    lunch: MealInfo;
    dinner: MealInfo;
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
}

// New interfaces for recipe recommendations
interface RecipeRecommendationRequest {
    availableIngredients: string[];
    dietaryPreferences?: string[];
    maxPrepTime?: number;
    cuisineType?: string;
}

interface RecipeRecommendation {
    name: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    prepTime: number;
    cookTime: number;
    servings: number;
    calories: number;
    protein: number;
    tags: string[];
    difficulty: 'easy' | 'medium' | 'hard';
}

// New interface for grocery list
interface GroceryListRequest {
    mealPlan: MealPlan;
}

interface GroceryItem {
    name: string;
    quantity: string;
    category: string;
}

// API utility functions
const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};

const handleResponse = async (response: Response): Promise<ApiResponse> => {
    const json = await response.json().catch(() => ({
        meta: { message: 'Network error' },
        data: null,
    }));

    if (!response.ok) {
        // Prefer `data` if it's a string message like "User already exist"
        const errorMessage = typeof json.data === 'string'
            ? json.data
            : json?.meta?.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
    }

    return json;
};

// API service class
class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    // Register user
    async register(userData: RegisterData): Promise<ApiResponse> {
        const response = await fetch(`${this.baseUrl}/register`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(userData),
        });

        return handleResponse(response);
    }

    // Login user
    async login(credentials: LoginData): Promise<ApiResponse> {
        const response = await fetch(`${this.baseUrl}/login`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(credentials),
        });

        const result = await handleResponse(response);

        // Store token in localStorage if login successful
        if (result) {
            localStorage.setItem('authToken', result.data.token);
            console.log("toktok")
        }

        return result;
    }

    // Get user profile
    async getUserProfile(): Promise<ApiResponse> {
        const response = await fetch(`${this.baseUrl}/profile`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        return handleResponse(response);
    }

    // Update user profile
    async updateUserProfile(userData: any): Promise<ApiResponse> {
        const response = await fetch(`${this.baseUrl}/profile/update`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(userData),
        });

        return handleResponse(response);
    }

    // Logout user
    logout(): void {
        localStorage.removeItem('authToken');
    }

    // Generate meal plan
    async generateMealPlan(userProfile: GenerateMeal): Promise<ApiResponse> {
        const response = await fetch(`${this.baseUrl}/meal`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(userProfile),
        });
        return handleResponse(response);
    }

    // Get recipe recommendations based on available ingredients
    async getRecipeRecommendations(requestData: RecipeRecommendationRequest): Promise<ApiResponse> {
        const response = await fetch(`${this.baseUrl}/recipe`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(requestData),
        });
        return handleResponse(response);
    }

    // Generate grocery list from meal plan
    async generateGroceryList(requestData: GroceryListRequest): Promise<ApiResponse> {
        const response = await fetch(`${this.baseUrl}/grocery`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(requestData),
        });
        return handleResponse(response);
    }

    // Check if user is authenticated
    isAuthenticated(): boolean {
        return !!localStorage.getItem('authToken');
    }

    // Get stored token
    getToken(): string | null {
        return localStorage.getItem('authToken');
    }
}

// Export singleton instance
export const apiService = new ApiService();

// Export types for use in components
export type {
    RegisterData,
    LoginData,
    UserProfile,
    ApiResponse,
    GenerateMeal,
    MealPlan,
    RecipeRecommendationRequest,
    RecipeRecommendation,
    GroceryListRequest,
    GroceryItem
};