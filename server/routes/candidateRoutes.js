import express from 'express';
import * as candidateController from '../controllers/candidateController.js';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// GET all candidates (with filtering, sorting, pagination)
router.get('/', candidateController.getAllCandidates);

// GET single candidate
router.get('/:id', candidateController.getCandidate);

// POST create new candidate (with resume upload)
router.post(
  '/',
  candidateController.uploadResume,
  candidateController.createCandidate
);

// PATCH update candidate
router.patch(
  '/:id',
  candidateController.uploadResume,
  candidateController.updateCandidate
);

// DELETE candidate
router.delete('/:id', candidateController.deleteCandidate);

// POST add note to candidate
router.post('/:id/notes', candidateController.addCandidateNote);

// PATCH update candidate status
router.patch('/:id/status', candidateController.updateCandidateStatus);

// POST send email notification to multiple candidates
router.post(
  '/notify/email',
  authController.restrictTo('admin', 'recruiter'),
  candidateController.sendEmailNotification
);

// POST send SMS notification to multiple candidates
router.post(
  '/notify/sms',
  authController.restrictTo('admin', 'recruiter'),
  candidateController.sendSmsNotification
);

export default router;