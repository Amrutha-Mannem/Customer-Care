import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Dynamic API URL: Uses Render URL in production, localhost in development
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:8000/api' 
  : 'https://customer-care-c92g.onrender.com/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      const { token, ...userDetails } = response.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userDetails));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userDetails);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (formData) => {
    try {
      // Changed parameter name to formData to avoid conflict
      const response = await axios.post(`${API_URL}/auth/register`, formData);
      
      // Fixed variable shadowing: use userDetails instead of userData
      const { token, ...userDetails } = response.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userDetails));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userDetails);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);