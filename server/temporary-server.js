import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config({ path: path.resolve('./server/config.env') });

// Hardcoded configuration for the temporary server
// In a production environment, these would come from environment variables
const JWT_SECRET = 'navaidix-ultra-secure-jwt-secret-key-2025';
const JWT_EXPIRES_IN = '30d';

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Demo users - NOTE: In a real app, passwords would be hashed
const demoUsers = [
  {
    _id: '123456789012345678901234',
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@navaidix.com',
    password: 'Admin@123', // In a real app, this would be hashed
    role: 'admin',
    accountType: 'admin'
  },
  {
    _id: '123456789012345678901235',
    firstName: 'Demo',
    lastName: 'User',
    email: 'user@navaidix.com',
    password: 'User@123', // In a real app, this would be hashed
    role: 'candidate',
    accountType: 'candidate'
  }
];

// Helper function to create JWT token
const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

// Helper function to create and send token response
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  
  // Remove password from output
  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;
  
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: userWithoutPassword
    }
  });
};

// API Routes
app.post('/api/auth/register', (req, res) => {
  const { firstName, lastName, email, password, phone, accountType = 'candidate', role = 'candidate' } = req.body;
  
  // Check if user already exists
  const existingUser = demoUsers.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email already in use'
    });
  }
  
  // Create new demo user
  const newUser = {
    _id: Date.now().toString(),
    firstName,
    lastName,
    email,
    password,
    phone,
    accountType,
    role,
    lastLogin: new Date()
  };
  
  demoUsers.push(newUser);
  
  createSendToken(newUser, 201, res);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password'
    });
  }
  
  // Find user
  const user = demoUsers.find(user => user.email === email);
  
  // Check if user exists and password is correct
  if (!user || user.password !== password) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password'
    });
  }
  
  createSendToken(user, 200, res);
});

// Protected route middleware
const protect = (req, res, next) => {
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
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 3) Check if user still exists
    const currentUser = demoUsers.find(user => user._id === decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token no longer exists'
      });
    }
    
    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Authentication failed'
    });
  }
};

// Example protected route
app.get('/api/auth/me', protect, (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: {
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        role: req.user.role,
        accountType: req.user.accountType
      }
    }
  });
});

// Simple test route
app.get('/api/test', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running correctly',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Temporary server running on port ${PORT}`);
  console.log(`Using hardcoded JWT_SECRET: ${JWT_SECRET ? 'Loaded successfully' : 'NOT LOADED'}`);
  console.log(`Static login credentials available:`);
  console.log(`Admin: admin@navaidix.com / Admin@123`);
  console.log(`User: user@navaidix.com / User@123`);
});
