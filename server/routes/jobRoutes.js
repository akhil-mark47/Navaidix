import express from 'express';
import * as jobController from '../controllers/jobController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJob);

// Protected routes (require authentication)
router.use(authController.protect);

// Routes for all authenticated users
router.get('/my/applications', authController.isCandidate, jobController.getMyApplications);
router.get('/applications/:id', jobController.getApplicationDetails);

// Candidate routes
router.post('/:id/apply', authController.isCandidate, jobController.applyForJob);
router.patch('/applications/:id/withdraw', authController.isCandidate, jobController.withdrawApplication);

// Employer routes
router.get('/my/posted', authController.isEmployer, jobController.getMyJobs);
router.post('/', authController.isEmployer, jobController.createJob);
router.patch('/:id', authController.isEmployer, jobController.updateJob);
router.delete('/:id', authController.isEmployer, jobController.deleteJob);
router.get('/:id/applications', authController.isEmployer, jobController.getJobApplications);
router.patch('/applications/:id/status', authController.isEmployer, jobController.updateApplicationStatus);

export default router;