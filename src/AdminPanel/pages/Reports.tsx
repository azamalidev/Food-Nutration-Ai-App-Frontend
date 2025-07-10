import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/UI/Card';
import StatsCard from '../components/Dashboard/StatsCard';

const Reports: React.FC = () => {
  const salesData = [
    { name: 'Jan', sales: 4000, profit: 2400 },
    { name: 'Feb', sales: 3000, profit: 1398 },
    { name: 'Mar', sales: 2000, profit: 9800 },
    { name: 'Apr', sales: 2780, profit: 3908 },
    { name: 'May', sales: 1890, profit: 4800 },
    { name: 'Jun', sales: 2390, profit: 3800 },
    { name: 'Jul', sales: 3490, profit: 4300 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 45, color: '#4F46E5' },
    { name: 'Furniture', value: 25, color: '#10B981' },
    { name: 'Clothing', value: 20, color: '#F59E0B' },
    { name: 'Books', value: 10, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Reports
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Analyze your business performance and trends
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Monthly Sales"
          value="$45,231"
          icon={DollarSign}
          change="+18% from last month"
          changeType="positive"
          color="bg-gradient-to-r from-green-500 to-green-600"
        />
        <StatsCard
          title="Total Orders"
          value="1,234"
          icon={ShoppingBag}
          change="+12% from last month"
          changeType="positive"
          color="bg-gradient-to-r from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Conversion Rate"
          value="3.2%"
          icon={TrendingUp}
          change="+0.5% from last month"
          changeType="positive"
          color="bg-gradient-to-r from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Refund Rate"
          value="1.8%"
          icon={TrendingDown}
          change="-0.3% from last month"
          changeType="positive"
          color="bg-gradient-to-r from-orange-500 to-orange-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Sales & Profit Trend" description="Monthly sales and profit comparison">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stackId="1" 
                stroke="#4F46E5" 
                fill="#4F46E5" 
                fillOpacity={0.6}
              />
              <Area 
                type="monotone" 
                dataKey="profit" 
                stackId="1" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Sales by Category" description="Product category distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Top Performing Products" description="Best selling products this month">
          <div className="space-y-4">
            {[
              { name: 'Wireless Headphones', sales: 1234, revenue: '$37,020' },
              { name: 'Smartphone', sales: 856, revenue: '$59,912' },
              { name: 'Laptop', sales: 543, revenue: '$70,587' },
              { name: 'Office Chair', sales: 234, revenue: '$4,680' }
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.sales} units sold
                  </p>
                </div>
                <span className="font-bold text-green-600 dark:text-green-400">
                  {product.revenue}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent Transactions" description="Latest customer transactions">
          <div className="space-y-4">
            {[
              { customer: 'John Doe', amount: '$299.99', status: 'completed', time: '2 hours ago' },
              { customer: 'Jane Smith', amount: '$1,299.99', status: 'completed', time: '4 hours ago' },
              { customer: 'Mike Johnson', amount: '$199.99', status: 'pending', time: '6 hours ago' },
              { customer: 'Sarah Wilson', amount: '$699.99', status: 'completed', time: '8 hours ago' }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {transaction.customer}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {transaction.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {transaction.amount}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === 'completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;