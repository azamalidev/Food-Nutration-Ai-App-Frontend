import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';
import Table from '../components/UI/Table';
import Modal from '../components/UI/Modal';
import { Product } from '../types';
import { mockProducts as initialProducts } from '../data/mockData';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'active' as 'active' | 'inactive',
    description: ''
  });

  const columns = [
    {
      key: 'image' as keyof Product,
      label: 'Image',
      render: (value: string, product: Product) => (
        <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <Package className="w-6 h-6 text-gray-400" />
          )}
        </div>
      )
    },
    {
      key: 'name' as keyof Product,
      label: 'Name'
    },
    {
      key: 'category' as keyof Product,
      label: 'Category'
    },
    {
      key: 'price' as keyof Product,
      label: 'Price',
      render: (value: number) => `$${value.toFixed(2)}`
    },
    {
      key: 'stock' as keyof Product,
      label: 'Stock',
      render: (value: number) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value > 50 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
            : value > 0 
            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'status' as keyof Product,
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
      key: 'id' as keyof Product,
      label: 'Actions',
      render: (value: string, product: Product) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(product);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(product.id);
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
      category: '',
      price: '',
      stock: '',
      status: 'active',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setModalMode('edit');
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status,
      description: product.description
    });
    setIsModalOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (modalMode === 'add') {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        status: formData.status,
        description: formData.description,
        createdAt: new Date().toISOString()
      };
      setProducts([...products, newProduct]);
    } else if (selectedProduct) {
      setProducts(products.map(product => 
        product.id === selectedProduct.id 
          ? { 
              ...product, 
              name: formData.name,
              category: formData.category,
              price: parseFloat(formData.price),
              stock: parseInt(formData.stock),
              status: formData.status,
              description: formData.description
            }
          : product
      ));
    }
    
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your product inventory and details
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Table */}
      <Table
        data={products}
        columns={columns}
        onRowClick={(product) => {
          setSelectedProduct(product);
          // Handle row click if needed
        }}
      />

      {/* Product Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'Add New Product' : 'Edit Product'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stock
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
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
              {modalMode === 'add' ? 'Add Product' : 'Update Product'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Products;