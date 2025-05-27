import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Job reference is required']
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Applicant reference is required']
  },
  resume: {
    type: String, // Path to resume file
    required: [true, 'Resume is required for job application']
  },
  coverLetter: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'interviewing', 'rejected', 'offered', 'hired'],
    default: 'pending'
  },
  answers: [{
    question: String,
    answer: String
  }],
  notes: [{
    content: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  withdrawn: {
    type: Boolean,
    default: false
  },
  lastStatusUpdate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save middleware to update lastStatusUpdate when status changes
jobApplicationSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.lastStatusUpdate = Date.now();
  }
  next();
});

// Index for quick lookups
jobApplicationSchema.index({ job: 1, applicant: 1 }, { unique: true });
jobApplicationSchema.index({ applicant: 1 });
jobApplicationSchema.index({ job: 1, status: 1 });

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

export default JobApplication;