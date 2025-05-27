import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaUsers, FaTachometerAlt, FaSignOutAlt, FaUserPlus, 
  FaBars, FaTimes, FaUserCircle, FaEnvelope, FaSms 
} from 'react-icons/fa';

const AdminLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div 
        className={`${
          sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'
        } transform fixed lg:relative lg:translate-x-0 lg:w-64 h-screen bg-gray-800 text-white transition-all duration-300 z-20`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between">
          <Link to="/admin/dashboard" className="text-xl font-bold">
            Navaidix Admin
          </Link>
          <button 
            className="lg:hidden text-white focus:outline-none" 
            onClick={toggleSidebar}
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
              <FaUserCircle size={30} />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{currentUser?.name}</p>
              <p className="text-xs text-gray-400">{currentUser?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-5">
          <div className="px-2">
            <Link 
              to="/admin/dashboard" 
              className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mb-1 transition-colors duration-200"
            >
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </Link>

            <Link 
              to="/admin/candidates" 
              className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mb-1 transition-colors duration-200"
            >
              <FaUsers className="mr-3" />
              Candidates
            </Link>

            <Link 
              to="/admin/candidates/new" 
              className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mb-1 transition-colors duration-200"
            >
              <FaUserPlus className="mr-3" />
              Add Candidate
            </Link>

            <Link 
              to="/admin/notifications/email" 
              className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mb-1 transition-colors duration-200"
            >
              <FaEnvelope className="mr-3" />
              Email Notifications
            </Link>

            <Link 
              to="/admin/notifications/sms" 
              className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mb-1 transition-colors duration-200"
            >
              <FaSms className="mr-3" />
              SMS Notifications
            </Link>

            {currentUser?.role === 'admin' && (
              <Link 
                to="/admin/users" 
                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mb-1 transition-colors duration-200"
              >
                <FaUserCircle className="mr-3" />
                User Management
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mb-1 transition-colors duration-200 w-full text-left"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto">
        {/* Top bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button 
              className="lg:hidden text-gray-600 focus:outline-none" 
              onClick={toggleSidebar}
            >
              <FaBars size={24} />
            </button>
            <div className="font-semibold text-lg">Navaidix Solutions Admin</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;