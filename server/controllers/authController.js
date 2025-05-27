import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/User.js';

// Helper function to create JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Helper function to create and send token response
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  
  // Remove password from output
  user.password = undefined;
  
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

// Register new user
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, accountType = 'candidate', role = 'candidate' } = req.body;
    
    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email already in use'
      });
    }
    
    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      accountType,
      role,
      lastLogin: Date.now()
    });
    
    // Generate JWT token and send response
    createSendToken(newUser, 201, res);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong during registration'
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      });
    }
    
    // Static demo credentials for admin
    if (email === 'admin@navaidix.com' && password === 'Admin@123') {
      const adminUser = {
        _id: '123456789012345678901234', // Mock MongoDB ID
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@navaidix.com',
        role: 'admin',
        accountType: 'admin',
        lastLogin: Date.now()
      };
      
      return createSendToken(adminUser, 200, res);
    }
    
    // Static demo credentials for candidate
    if (email === 'user@navaidix.com' && password === 'User@123') {
      const regularUser = {
        _id: '123456789012345678901235', // Mock MongoDB ID
        firstName: 'Demo',
        lastName: 'User',
        email: 'user@navaidix.com',
        role: 'candidate',
        accountType: 'candidate',
        lastLogin: Date.now()
      };
      
      return createSendToken(regularUser, 200, res);
    }
    
    // Check if user exists & password is correct for non-static users
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }
    
    // Update last login time
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });
    
    // Send token to client
    createSendToken(user, 200, res);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong during login'
    });
  }
};

// Middleware to protect routes - requires authentication
export const protect = async (req, res, next) => {
  try {
    // 1) Get token and check if it exists
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to get access'
      });
    }
    
    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    
    // 3) Check if user still exists - or use static user for demo
    if (decoded.id === '123456789012345678901234') {
      // For admin static user
      req.user = {
        _id: '123456789012345678901234',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@navaidix.com',
        role: 'admin',
        accountType: 'admin'
      };
      return next();
    } 
    
    if (decoded.id === '123456789012345678901235') {
      // For regular static user
      req.user = {
        _id: '123456789012345678901235',
        firstName: 'Demo',
        lastName: 'User',
        email: 'user@navaidix.com',
        role: 'candidate',
        accountType: 'candidate'
      };
      return next();
    }
    
    // For database users
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token no longer exists'
      });
    }
    
    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter && currentUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: 'fail',
        message: 'User recently changed password! Please log in again'
      });
    }
    
    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: error.message || 'Authentication failed'
    });
  }
};

// Middleware to restrict access to certain roles
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Roles is an array e.g., ['admin', 'recruiter']
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

// Middleware for candidate-only routes
export const isCandidate = (req, res, next) => {
  if (req.user.role !== 'candidate') {
    return res.status(403).json({
      status: 'fail',
      message: 'This route is only accessible to candidates'
    });
  }
  next();
};

// Middleware for employer/admin-only routes
export const isEmployer = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'recruiter') {
    return res.status(403).json({
      status: 'fail',
      message: 'This route is only accessible to employers or admins'
    });
  }
  next();
};

// Get current user profile
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error retrieving user profile'
    });
  }
};

// Update user profile
export const updateCurrentUser = async (req, res) => {
  try {
    // Check if user is trying to update password
    if (req.body.password) {
      return res.status(400).json({
        status: 'fail',
        message: 'This route is not for password updates. Please use /update-password'
      });
    }
    
    // Filter out unwanted fields that should not be updated
    const filteredBody = filterObj(req.body, 'firstName', 'lastName', 'email', 'phone');
    
    // Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error updating user profile'
    });
  }
};

// Helper function to filter object
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Update password
export const updatePassword = async (req, res) => {
  try {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password');
    
    // 2) Check if posted current password is correct
    if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Your current password is incorrect'
      });
    }
    
    // 3) If so, update password
    user.password = req.body.newPassword;
    await user.save();
    
    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message || 'Error updating password'
    });
  }
};