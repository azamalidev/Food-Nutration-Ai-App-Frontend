export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
  status: 'active' | 'inactive';
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  description: string;
  image?: string;
  createdAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
  avatar?: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalRevenue: number;
  activeSessions: number;
}

export interface ChartData {
  name: string;
  value: number;
}