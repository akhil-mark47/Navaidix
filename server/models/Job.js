import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    remote: Boolean
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'],
    required: [true, 'Job type is required']
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  requirements: [String],
  responsibilities: [String],
  skills: [String],
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    displaySalary: {
      type: Boolean,
      default: true
    }
  },
  applicationDeadline: Date,
  experienceLevel: {
    type: String,
    enum: ['Entry-level', 'Mid-level', 'Senior-level', 'Executive']
  },
  educationLevel: {
    type: String,
    enum: ['High School', 'Associate', 'Bachelor\'s', 'Master\'s', 'Doctoral', 'Not Required']
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Job must be posted by a user']
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'closed', 'archived'],
    default: 'published'
  },
  featured: {
    type: Boolean,
    default: false
  },
  applicationCount: {
    type: Number,
    default: 0
  },
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for active days (how many days the job has been active)
jobSchema.virtual('activeDays').get(function() {
  const now = new Date();
  const createdAt = new Date(this.createdAt);
  const diffTime = Math.abs(now - createdAt);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Virtual field for is closed
jobSchema.virtual('isClosed').get(function() {
  if (this.status === 'closed' || this.status === 'archived') return true;
  if (this.applicationDeadline && new Date() > new Date(this.applicationDeadline)) return true;
  return false;
});

// Text index for search
jobSchema.index({
  title: 'text',
  company: 'text',
  description: 'text',
  skills: 'text'
});

const Job = mongoose.model('Job', jobSchema);

export default Job;