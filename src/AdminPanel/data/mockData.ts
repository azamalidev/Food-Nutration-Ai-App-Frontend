import { User, Product, DashboardStats, ChartData } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'staff',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastLogin: '2024-01-14T16:45:00Z',
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'staff',
    status: 'inactive',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastLogin: '2024-01-10T09:15:00Z',
    createdAt: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastLogin: '2024-01-15T14:20:00Z',
    createdAt: '2024-01-04T00:00:00Z'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 299.99,
    stock: 150,
    status: 'active',
    description: 'High-quality wireless headphones with noise cancellation',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Smartphone',
    category: 'Electronics',
    price: 699.99,
    stock: 75,
    status: 'active',
    description: 'Latest smartphone with advanced features',
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Laptop',
    category: 'Electronics',
    price: 1299.99,
    stock: 45,
    status: 'active',
    description: 'High-performance laptop for professionals',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    name: 'Office Chair',
    category: 'Furniture',
    price: 199.99,
    stock: 0,
    status: 'inactive',
    description: 'Ergonomic office chair for comfortable working',
    image: 'https://images.pexels.com/photos/586960/pexels-photo-586960.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: '2024-01-04T00:00:00Z'
  }
];

export const dashboardStats: DashboardStats = {
  totalUsers: 1247,
  totalProducts: 89,
  totalRevenue: 124500,
  activeSessions: 23
};

export const chartData: ChartData[] = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 }
];