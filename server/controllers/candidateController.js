import path from 'path';
import { fileURLToPath } from 'url';
import Candidate from '../models/Candidate.js';
import { AppError, catchAsync } from '../middlewares/errorMiddleware.js';
import { upload, parseResume, extractSkills } from '../utils/resumeParser.js';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all candidates with filtering, sorting, and pagination
export const getAllCandidates = catchAsync(async (req, res, next) => {
  // BUILD QUERY
  const queryObj = { ...req.query };
  
  // 1) Advanced filtering
  // Example: ?status=new&location.city=New York
  // Remove special fields from query object
  const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
  excludedFields.forEach(field => delete queryObj[field]);
  
  // Search functionality through text indexing
  let query = Candidate.find();
  if (req.query.search) {
    query = query.find({
      $text: { $search: req.query.search }
    });
  }
  
  // 1B) Filter by skills
  if (req.query.skills) {
    const skills = req.query.skills.split(',');
    query = query.find({ skills: { $in: skills } });
  }
  
  // 1C) Advanced filtering with operators (gte, gt, lte, lt)
  // Example: ?yearsOfExperience[gte]=5
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\\b(gte|gt|lte|lt)\\b/g, match => `$${match}`);
  
  query = query.find(JSON.parse(queryStr));

  // 2) Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt'); // Default sort by newest
  }

  // 3) Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v'); // Exclude version field by default
  }

  // 4) Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  // Execute query
  const candidates = await query;
  
  // Get total count for pagination info
  const totalCandidates = await Candidate.countDocuments(JSON.parse(queryStr));

  // Send response
  res.status(200).json({
    status: 'success',
    results: candidates.length,
    total: totalCandidates,
    page,
    pages: Math.ceil(totalCandidates / limit),
    data: {
      candidates
    }
  });
});

// Get a single candidate by ID
export const getCandidate = catchAsync(async (req, res, next) => {
  const candidate = await Candidate.findById(req.params.id);

  if (!candidate) {
    return next(new AppError('No candidate found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      candidate
    }
  });
});

// Single file upload middleware
export const uploadResume = upload.single('resume');

// Create a new candidate
export const createCandidate = catchAsync(async (req, res, next) => {
  // Handle form data
  const candidateData = { ...req.body };
  
  // Process file upload if present
  if (req.file) {
    // Save resume file path
    candidateData.resumePath = req.file.path;
    
    // Parse resume content
    const resumeText = await parseResume(req.file.path);
    candidateData.resumeText = resumeText;
    
    // Extract skills from resume if not provided
    if (!candidateData.skills || candidateData.skills.length === 0) {
      candidateData.skills = extractSkills(resumeText);
    } else if (typeof candidateData.skills === 'string') {
      // If skills came as comma-separated string from form data
      candidateData.skills = candidateData.skills.split(',').map(skill => skill.trim());
    }
  }
  
  // Process education and work experience if they came as strings
  if (candidateData.education && typeof candidateData.education === 'string') {
    try {
      candidateData.education = JSON.parse(candidateData.education);
    } catch (e) {
      candidateData.education = [];
    }
  }
  
  if (candidateData.workExperience && typeof candidateData.workExperience === 'string') {
    try {
      candidateData.workExperience = JSON.parse(candidateData.workExperience);
    } catch (e) {
      candidateData.workExperience = [];
    }
  }

  // Create new candidate
  const newCandidate = await Candidate.create(candidateData);

  res.status(201).json({
    status: 'success',
    data: {
      candidate: newCandidate
    }
  });
});

// Update a candidate
export const updateCandidate = catchAsync(async (req, res, next) => {
  const candidateData = { ...req.body };
  
  // Process file upload if present
  if (req.file) {
    // Save resume file path
    candidateData.resumePath = req.file.path;
    
    // Parse resume content
    const resumeText = await parseResume(req.file.path);
    candidateData.resumeText = resumeText;
    
    // Extract skills from resume if not provided
    if (!candidateData.skills) {
      candidateData.skills = extractSkills(resumeText);
    } else if (typeof candidateData.skills === 'string') {
      // If skills came as comma-separated string from form data
      candidateData.skills = candidateData.skills.split(',').map(skill => skill.trim());
    }
  }
  
  // Process education and work experience if they came as strings
  if (candidateData.education && typeof candidateData.education === 'string') {
    try {
      candidateData.education = JSON.parse(candidateData.education);
    } catch (e) {
      delete candidateData.education;
    }
  }
  
  if (candidateData.workExperience && typeof candidateData.workExperience === 'string') {
    try {
      candidateData.workExperience = JSON.parse(candidateData.workExperience);
    } catch (e) {
      delete candidateData.workExperience;
    }
  }

  // Find and update candidate
  const candidate = await Candidate.findByIdAndUpdate(
    req.params.id,
    candidateData,
    {
      new: true, // Return updated document
      runValidators: true // Run validators on update
    }
  );

  if (!candidate) {
    return next(new AppError('No candidate found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      candidate
    }
  });
});

// Delete a candidate
export const deleteCandidate = catchAsync(async (req, res, next) => {
  const candidate = await Candidate.findByIdAndDelete(req.params.id);

  if (!candidate) {
    return next(new AppError('No candidate found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Add note to a candidate
export const addCandidateNote = catchAsync(async (req, res, next) => {
  const candidate = await Candidate.findById(req.params.id);
  
  if (!candidate) {
    return next(new AppError('No candidate found with that ID', 404));
  }
  
  // Add note with user reference
  candidate.notes.push({
    content: req.body.content,
    createdBy: req.user._id
  });
  
  await candidate.save();
  
  res.status(200).json({
    status: 'success',
    data: {
      candidate
    }
  });
});

// Update candidate status
export const updateCandidateStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  
  if (!status) {
    return next(new AppError('Status is required', 400));
  }
  
  const candidate = await Candidate.findByIdAndUpdate(
    req.params.id,
    { 
      status,
      ...(status === 'contacted' ? { lastContactedAt: Date.now() } : {})
    },
    {
      new: true,
      runValidators: true
    }
  );
  
  if (!candidate) {
    return next(new AppError('No candidate found with that ID', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: {
      candidate
    }
  });
});

// Send email notification to candidate(s)
export const sendEmailNotification = catchAsync(async (req, res, next) => {
  const { candidateIds, subject, message } = req.body;
  
  if (!candidateIds || !Array.isArray(candidateIds) || candidateIds.length === 0) {
    return next(new AppError('Please provide at least one candidate ID', 400));
  }
  
  if (!subject || !message) {
    return next(new AppError('Please provide subject and message', 400));
  }
  
  // Find all candidates
  const candidates = await Candidate.find({
    _id: { $in: candidateIds },
    'notificationPreference.email': true
  });
  
  if (candidates.length === 0) {
    return next(new AppError('No valid candidates found for email notification', 404));
  }
  
  // Configure email transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASSWORD || 'your-password'
    }
  });
  
  // Send emails (for production, consider using a queue for large batches)
  const emailPromises = candidates.map(candidate => {
    return transporter.sendMail({
      from: process.env.EMAIL_FROM || 'Navaidix <no-reply@navaidix.com>',
      to: candidate.email,
      subject,
      text: message,
      html: `<div>${message}</div>`
    });
  });
  
  // Wait for all emails to be sent
  await Promise.all(emailPromises);
  
  res.status(200).json({
    status: 'success',
    message: `Email notifications sent to ${candidates.length} candidates`,
    data: {
      recipients: candidates.map(c => c.email)
    }
  });
});

// Send SMS notification to candidate(s)
export const sendSmsNotification = catchAsync(async (req, res, next) => {
  const { candidateIds, message } = req.body;
  
  if (!candidateIds || !Array.isArray(candidateIds) || candidateIds.length === 0) {
    return next(new AppError('Please provide at least one candidate ID', 400));
  }
  
  if (!message) {
    return next(new AppError('Please provide a message', 400));
  }
  
  // Check if Twilio credentials are set
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
    return next(new AppError('SMS service is not configured', 500));
  }
  
  // Find all candidates
  const candidates = await Candidate.find({
    _id: { $in: candidateIds },
    'notificationPreference.sms': true
  });
  
  if (candidates.length === 0) {
    return next(new AppError('No valid candidates found for SMS notification', 404));
  }
  
  // Initialize Twilio client
  const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  
  // Send SMS messages (for production, consider using a queue for large batches)
  const smsPromises = candidates.map(candidate => {
    return twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: candidate.phone
    });
  });
  
  // Wait for all SMS to be sent
  await Promise.all(smsPromises);
  
  res.status(200).json({
    status: 'success',
    message: `SMS notifications sent to ${candidates.length} candidates`,
    data: {
      recipients: candidates.map(c => c.phone)
    }
  });
});