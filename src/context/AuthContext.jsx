import React, { createContext, useState, useEffect, useContext } from 'react';
import * as authService from '../services/authService';

// Create context
export const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // On load, check if user is already logged in
  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  // Sign up function - connects to MongoDB
  const signUp = async (userData) => {
    try {
      setError(null);
      const response = await authService.register(userData);
      setCurrentUser(response.data.user);
      return response;
    } catch (error) {
      setError(error.message || 'Failed to register');
      throw error;
    }
  };

  // Sign in function - validates with MongoDB
  const signIn = async (credentials) => {
    try {
      setError(null);
      const user = await authService.login(credentials.email, credentials.password);
      setCurrentUser(user);
      return user;
    } catch (error) {
      setError(error.message || 'Failed to login');
      throw error;
    }
  };

  // Sign out function
  const signOut = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    signUp,
    signIn,
    signOut,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;