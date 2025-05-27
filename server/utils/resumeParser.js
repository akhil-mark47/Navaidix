import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import pdfParse from 'pdf-parse';
import { AppError } from '../middlewares/errorMiddleware.js';

// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/resumes');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp and original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter to allow only PDFs and Word documents
const fileFilter = (req, file, cb) => {
  // Accept pdf, doc, docx
  const allowedFileTypes = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new AppError('Only PDF and Word documents are allowed', 400), false);
  }
};

// Configure multer upload
export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
});

// Parse resume content based on file type
export const parseResume = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  
  try {
    // Handle PDF files
    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      return pdfData.text;
    } 
    // For Word documents, we'd need additional libraries
    // This is a simplified version - for production, you might want to add docx/doc parsing
    else if (ext === '.doc' || ext === '.docx') {
      // For now, return placeholder text - in a real app, use a library like mammoth.js
      return 'Word document content - add proper Word document parsing in production';
    }
    
    return '';
  } catch (error) {
    console.error('Error parsing resume:', error);
    return '';
  }
};

// Extract skills from resume text (simplified version)
export const extractSkills = (resumeText) => {
  // This is a very simple example - in production, use NLP or ML for better extraction
  const commonSkills = [
    'javascript', 'react', 'node', 'express', 'mongodb', 'sql', 'python', 'java',
    'c#', 'html', 'css', 'aws', 'azure', 'docker', 'kubernetes', 'git',
    'agile', 'scrum', 'project management', 'data analysis', 'machine learning',
    'artificial intelligence', 'ui/ux', 'figma', 'sketch', 'photoshop',
    'leadership', 'communication', 'teamwork', 'problem solving'
  ];
  
  const foundSkills = [];
  const lowerCaseText = resumeText.toLowerCase();
  
  commonSkills.forEach(skill => {
    if (lowerCaseText.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  });
  
  return foundSkills;
};