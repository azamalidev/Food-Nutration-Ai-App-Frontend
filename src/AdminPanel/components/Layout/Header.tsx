import React from 'react';
import { Menu, Bell, Search, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Search */}
          <div className="hidden sm:flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 min-w-96">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-gray-600 dark:text-gray-300 placeholder-gray-400 text-sm flex-1"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
              <span className="sr-only">3 notifications</span>
            </span>
          </button>

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {/* {user?.name} */}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {/* {user?.role} */}
              </p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {/* {user?.name.charAt(0)} */}
              </span>
            </div>
            <button
              // onClick={logout}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;