import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.use(authController.protect); // All routes below this middleware are protected

// User routes that require authentication
router.get('/me', authController.getCurrentUser);
router.patch('/update-me', authController.updateCurrentUser);
router.patch('/update-password', authController.updatePassword);

export default router;