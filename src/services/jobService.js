import axios from 'axios';

const API_URL = '/api/jobs';

// Get all jobs with filters, sorting, and pagination
export const getJobs = async (params = {}) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Get a single job by ID
export const getJob = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL}/${jobId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ADMIN: Create a new job
export const createJob = async (jobData) => {
  try {
    const response = await axios.post(API_URL, jobData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ADMIN: Update a job
export const updateJob = async (jobId, jobData) => {
  try {
    const response = await axios.patch(`${API_URL}/${jobId}`, jobData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// ADMIN: Delete a job
export const deleteJob = async (jobId) => {
  try {
    const response = await axios.delete(`${API_URL}/${jobId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// USER: Apply for a job
export const applyForJob = async (jobId, applicationData) => {
  try {
    const formData = new FormData();
    
    // Add application data to form
    Object.keys(applicationData).forEach(key => {
      if (key !== 'resume') {
        formData.append(key, applicationData[key]);
      }
    });
    
    // Add resume file if it exists
    if (applicationData.resume) {
      formData.append('resume', applicationData.resume);
    }
    
    const response = await axios.post(`${API_URL}/${jobId}/apply`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// USER: Get user applications
export const getUserApplications = async () => {
  try {
    const response = await axios.get('/api/applications/me');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// USER: Get application by ID
export const getApplication = async (applicationId) => {
  try {
    const response = await axios.get(`/api/applications/${applicationId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// USER: Save job to favorites
export const saveJob = async (jobId) => {
  try {
    const response = await axios.post(`${API_URL}/${jobId}/save`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// USER: Remove job from favorites
export const unsaveJob = async (jobId) => {
  try {
    const response = await axios.delete(`${API_URL}/${jobId}/save`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// USER: Get saved jobs
export const getSavedJobs = async () => {
  try {
    const response = await axios.get('/api/me/saved-jobs');
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

// Helper function to handle errors
const handleError = (error) => {
  const errorMessage = error.response?.data?.message || 'Something went wrong';
  return {
    message: errorMessage,
    response: error.response
  };
};