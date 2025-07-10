import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, User as UserIcon } from 'lucide-react';
import Table from '../components/UI/Table';
import Modal from '../components/UI/Modal';
import { User as UserType } from '../types';
import { mockUsers as initialUsers } from '../data/mockData';

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'staff' as 'admin' | 'staff',
    status: 'active' as 'active' | 'inactive'
  });

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('allUsers');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(initialUsers);
      localStorage.setItem('allUsers', JSON.stringify(initialUsers));
    }
  }, []);

  // Update localStorage whenever users change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('allUsers', JSON.stringify(users));
    }
  }, [users]);

  const columns = [
    {
      key: 'avatar' as keyof UserType,
      label: 'Avatar',
      render: (value: string, user: UserType) => (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <UserIcon className="w-5 h-5 text-white" />
          )}
        </div>
      )
    },
    {
      key: 'name' as keyof UserType,
      label: 'Name'
    },
    {
      key: 'email' as keyof UserType,
      label: 'Email'
    },
    {
      key: 'role' as keyof UserType,
      label: 'Role',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'admin' 
            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'status' as keyof UserType,
      label: 'Status',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'lastLogin' as keyof UserType,
      label: 'Last Login',
      render: (value: string) => value ? new Date(value).toLocaleDateString() : 'Never'
    },
    {
      key: 'id' as keyof UserType,
      label: 'Actions',
      render: (value: string, user: UserType) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(user);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(user.id);
            }}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const handleAdd = () => {
    setModalMode('add');
    setFormData({
      name: '',
      email: '',
      role: 'staff',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (user: UserType) => {
    setModalMode('edit');
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (modalMode === 'add') {
      const newUser: UserType = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        createdAt: new Date().toISOString()
      };
      setUsers([...users, newUser]);
    } else if (selectedUser) {
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...formData }
          : user
      );
      setUsers(updatedUsers);
    }
    
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Users
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your users and their permissions
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Users Table */}
      <Table
        data={users}
        columns={columns}
        onRowClick={(user) => {
          setSelectedUser(user);
          // Handle row click if needed
        }}
      />

      {/* User Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Add New User' : 'Edit User'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'staff' })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
            >
              {modalMode === 'add' ? 'Add User' : 'Update User'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Users;