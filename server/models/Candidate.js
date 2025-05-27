import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  location: {
    city: String,
    state: String,
    country: String,
    remote: Boolean,
  },
  currentJobTitle: String,
  yearsOfExperience: Number,
  skills: [String],
  resumePath: String, // Path to uploaded resume file
  resumeText: String, // Extracted text from resume for search functionality
  education: [{
    degree: String,
    institution: String,
    graduationYear: Number,
    field: String,
  }],
  workExperience: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String,
    currentlyWorking: Boolean,
  }],
  status: {
    type: String,
    enum: ['new', 'contacted', 'interviewing', 'offer', 'hired', 'rejected', 'inactive'],
    default: 'new',
  },
  notes: [{
    content: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
  preferredSalary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD',
    },
  },
  availableFrom: Date,
  notificationPreference: {
    email: {
      type: Boolean,
      default: true,
    },
    sms: {
      type: Boolean,
      default: false,
    },
  },
  lastContactedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create indexes for better search performance
candidateSchema.index({ fullName: 'text', resumeText: 'text', 'skills': 'text' });
candidateSchema.index({ email: 1 });
candidateSchema.index({ status: 1 });
candidateSchema.index({ 'location.city': 1, 'location.state': 1, 'location.country': 1 });
candidateSchema.index({ yearsOfExperience: 1 });

// Update the updatedAt timestamp before saving
candidateSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Candidate = mongoose.model('Candidate', candidateSchema);

export default Candidate;