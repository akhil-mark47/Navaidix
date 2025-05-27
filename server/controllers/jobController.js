import Job from '../models/Job.js';
import JobApplication from '../models/JobApplication.js';
import User from '../models/User.js';
import { catchAsync, AppError } from '../middlewares/errorMiddleware.js';
import path from 'path';
import fs from 'fs';

// Create a new job (Admin only)
export const createJob = catchAsync(async (req, res) => {
  // Add the creator (admin) to the job data
  const job = await Job.create({
    ...req.body,
    createdBy: req.user.id
  });

  res.status(201).json({
    status: 'success',
    data: {
      job
    }
  });
});

// Get all jobs with filtering, sorting, and pagination
export const getAllJobs = catchAsync(async (req, res) => {
  // BUILD QUERY
  const queryObj = { ...req.query };
  // Fields to exclude from filtering
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(field => delete queryObj[field]);

  // Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  
  // Handle search query
  let query = Job.find(JSON.parse(queryStr));
  
  // If search term is provided, use text search
  if (req.query.search) {
    query = Job.find(
      { $text: { $search: req.query.search } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
  }
  
  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt'); // Default sort by newest
  }
  
  // Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }
  
  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  
  query = query.skip(skip).limit(limit);
  
  // Execute query
  const jobs = await query;
  
  // Count total jobs for pagination
  const totalJobs = await Job.countDocuments(JSON.parse(queryStr));
  
  res.status(200).json({
    status: 'success',
    results: jobs.length,
    total: totalJobs,
    pages: Math.ceil(totalJobs / limit),
    data: {
      jobs
    }
  });
});

// Get a single job
export const getJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  
  if (!job) {
    return next(new AppError('No job found with that ID', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      job
    }
  });
});

// Update a job (Admin only)
export const updateJob = catchAsync(async (req, res, next) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!job) {
    return next(new AppError('No job found with that ID', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      job
    }
  });
});

// Delete a job (Admin only)
export const deleteJob = catchAsync(async (req, res, next) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  
  if (!job) {
    return next(new AppError('No job found with that ID', 404));
  }
  
  // Also delete all applications for this job (cleanup)
  await JobApplication.deleteMany({ job: req.params.id });
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Apply for a job
export const applyForJob = catchAsync(async (req, res, next) => {
  // Check if job exists
  const job = await Job.findById(req.params.id);
  if (!job) {
    return next(new AppError('No job found with that ID', 404));
  }
  
  // Check if user already applied
  const existingApplication = await JobApplication.findOne({
    job: req.params.id,
    applicant: req.user.id
  });
  
  if (existingApplication) {
    return next(new AppError('You have already applied for this job', 400));
  }
  
  // Create application
  const applicationData = {
    job: req.params.id,
    applicant: req.user.id,
    coverletter: req.body.coverletter,
    status: 'pending'
  };
  
  // Handle resume upload
  if (req.file) {
    // Save file info
    applicationData.resume = {
      filename: req.file.filename,
      path: req.file.path,
      originalname: req.file.originalname
    };
  } else if (req.user.resume && req.user.resume.url) {
    // Use existing resume from user profile
    applicationData.resume = {
      filename: req.user.resume.filename,
      path: req.user.resume.url,
      originalname: req.user.resume.filename
    };
  }
  
  const application = await JobApplication.create(applicationData);
  
  // Update user's applications array
  await User.findByIdAndUpdate(
    req.user.id,
    { $push: { applications: application._id } }
  );
  
  res.status(201).json({
    status: 'success',
    data: {
      application
    }
  });
});

// Get user applications
export const getUserApplications = catchAsync(async (req, res) => {
  const applications = await JobApplication.find({ applicant: req.user.id })
    .populate('job')
    .sort('-createdAt');
  
  res.status(200).json({
    status: 'success',
    results: applications.length,
    data: {
      applications
    }
  });
});

// Get a specific application
export const getApplication = catchAsync(async (req, res, next) => {
  const application = await JobApplication.findById(req.params.id)
    .populate('job')
    .populate('applicant', 'firstName lastName email');
  
  if (!application) {
    return next(new AppError('No application found with that ID', 404));
  }
  
  // Check if user is authorized (applicant or admin)
  if (
    application.applicant._id.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    return next(new AppError('You are not authorized to view this application', 403));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      application
    }
  });
});

// Save job to favorites
export const saveJob = catchAsync(async (req, res, next) => {
  // Check if job exists
  const job = await Job.findById(req.params.id);
  if (!job) {
    return next(new AppError('No job found with that ID', 404));
  }
  
  // Add to user's saved jobs (if not already saved)
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { savedJobs: req.params.id } },
    { new: true }
  );
  
  res.status(200).json({
    status: 'success',
    data: {
      savedJobs: user.savedJobs
    }
  });
});

// Remove job from favorites
export const unsaveJob = catchAsync(async (req, res, next) => {
  // Remove from user's saved jobs
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { savedJobs: req.params.id } },
    { new: true }
  );
  
  res.status(200).json({
    status: 'success',
    data: {
      savedJobs: user.savedJobs
    }
  });
});

// Get user's saved jobs
export const getSavedJobs = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).populate('savedJobs');
  
  res.status(200).json({
    status: 'success',
    results: user.savedJobs.length,
    data: {
      jobs: user.savedJobs
    }
  });
});

export default {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  applyForJob,
  getUserApplications,
  getApplication,
  saveJob,
  unsaveJob,
  getSavedJobs
};