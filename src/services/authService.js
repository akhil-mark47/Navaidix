import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Demo users for dry run login (no server needed)
const demoUsers = {
  admin: {
    _id: '123456789012345678901234',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@navaidix.com',
    password: 'Admin@123',
    role: 'admin',
    accountType: 'admin',
    lastLogin: new Date()
  },
  user: {
    _id: '123456789012345678901235',
    firstName: 'Demo',
    lastName: 'User',
    email: 'user@navaidix.com',
    password: 'User@123',
    role: 'candidate',
    accountType: 'candidate',
    lastLogin: new Date()
  }
};

// Create mock token (in a real app this would be a JWT)
const createMockToken = (userId) => {
  return `mock-token-${userId}-${Date.now()}`;
};

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Register a new user (candidate)
export const register = async (userData) => {
  try {
    // In dry run mode, we just create a new user locally
    const newUser = {
      _id: `demo-${Date.now()}`,
      firstName: userData.name.split(' ')[0],
      lastName: userData.name.split(' ').slice(1).join(' ') || '',
      email: userData.email,
      role: 'candidate',
      accountType: 'candidate',
      lastLogin: new Date()
    };
    
    const token = createMockToken(newUser._id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    console.log('Dry run register successful:', newUser);
    return { data: { user: newUser } };
  } catch (error) {
    console.error('Dry run register error:', error);
    throw { message: error.message || 'Registration failed' };
  }
};

// Login user
export const login = async (email, password) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check for the demo user credentials
    if (email === demoUsers.user.email && password === demoUsers.user.password) {
      const user = { ...demoUsers.user };
      delete user.password; // Don't include password in user object
      
      const token = createMockToken(user._id);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      console.log('Dry run login successful (user):', user);
      return user;
    } else if (email === demoUsers.admin.email && password === demoUsers.admin.password) {
      const user = { ...demoUsers.admin };
      delete user.password; // Don't include password in user object
      
      const token = createMockToken(user._id);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      console.log('Dry run login successful (admin):', user);
      return user;
    }
    
    throw { message: 'Incorrect email or password' };
  } catch (error) {
    console.error('Dry run login error:', error);
    throw error.response?.data || { message: error.message || 'Login failed' };
  }
};

// Admin login
export const adminLogin = async (email, password) => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if this is the admin account
    if (email === demoUsers.admin.email && password === demoUsers.admin.password) {
      const user = { ...demoUsers.admin };
      delete user.password; // Don't include password in user object
      
      const token = createMockToken(user._id);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      console.log('Dry run admin login successful:', user);
      return user;
    } else if (email === demoUsers.user.email && password === demoUsers.user.password) {
      // Regular user trying to access admin area
      throw { message: 'Unauthorized access. Not an admin account.' };
    } else {
      throw { message: 'Incorrect email or password' };
    }
  } catch (error) {
    console.error('Dry run admin login error:', error);
    throw error.response?.data || { message: error.message || 'Admin login failed' };
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  console.log('Dry run logout successful');
};

// Get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Check if user is admin
export const isAdmin = () => {
  const user = getCurrentUser();
  return user && (user.role === 'admin' || user.role === 'recruiter');
};

// Get user profile
export const getUserProfile = async () => {
  try {
    // In dry run, just return the stored user
    const user = getCurrentUser();
    if (!user) {
      throw { message: 'User not found' };
    }
    console.log('Dry run get profile successful:', user);
    return { data: { user } };
  } catch (error) {
    console.error('Dry run get profile error:', error);
    throw error.response?.data || { message: error.message || 'Failed to get profile' };
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    // In dry run mode, we just update the local storage
    const currentUser = getCurrentUser();
    const updatedUser = { ...currentUser, ...userData };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    console.log('Dry run update profile successful:', updatedUser);
    
    return { data: { user: updatedUser } };
  } catch (error) {
    console.error('Dry run update profile error:', error);
    throw error.response?.data || { message: error.message || 'Failed to update profile' };
  }
};

export default {
  register,
  login,
  adminLogin,
  logout,
  getCurrentUser,
  isAuthenticated,
  getUserProfile,
  updateUserProfile,
  api
};