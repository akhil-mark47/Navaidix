import { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (localStorage)
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('navaidixUser');
      const token = localStorage.getItem('navaidixToken');
      
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Call this on sign in
  const signIn = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    
    // Store in localStorage for persistence
    localStorage.setItem('navaidixUser', JSON.stringify(userData));
    localStorage.setItem('navaidixToken', 'static-token-for-demo');
  };

  // Call this on sign out
  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    
    // Clear storage
    localStorage.removeItem('navaidixUser');
    localStorage.removeItem('navaidixToken');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};