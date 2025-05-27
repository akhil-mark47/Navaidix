import authService from './authService';

const api = authService.api;

// Get all candidates with filtering, pagination, and sorting
export const getCandidates = async (params) => {
  try {
    const response = await api.get('/candidates', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Get single candidate by ID
export const getCandidate = async (id) => {
  try {
    const response = await api.get(`/candidates/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Create new candidate (multipart/form-data for resume upload)
export const createCandidate = async (candidateData) => {
  try {
    // FormData to handle file uploads
    const formData = new FormData();
    
    // Append resume file if provided
    if (candidateData.resume) {
      formData.append('resume', candidateData.resume);
      delete candidateData.resume;
    }
    
    // Handle arrays and objects
    Object.keys(candidateData).forEach(key => {
      if (candidateData[key] !== undefined && candidateData[key] !== null) {
        if (typeof candidateData[key] === 'object' && !(candidateData[key] instanceof File)) {
          formData.append(key, JSON.stringify(candidateData[key]));
        } else {
          formData.append(key, candidateData[key]);
        }
      }
    });
    
    const response = await api.post('/candidates', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Update candidate
export const updateCandidate = async (id, candidateData) => {
  try {
    // FormData to handle file uploads
    const formData = new FormData();
    
    // Append resume file if provided
    if (candidateData.resume) {
      formData.append('resume', candidateData.resume);
      delete candidateData.resume;
    }
    
    // Handle arrays and objects
    Object.keys(candidateData).forEach(key => {
      if (candidateData[key] !== undefined && candidateData[key] !== null) {
        if (typeof candidateData[key] === 'object' && !(candidateData[key] instanceof File)) {
          formData.append(key, JSON.stringify(candidateData[key]));
        } else {
          formData.append(key, candidateData[key]);
        }
      }
    });
    
    const response = await api.patch(`/candidates/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Delete candidate
export const deleteCandidate = async (id) => {
  try {
    const response = await api.delete(`/candidates/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Add note to candidate
export const addCandidateNote = async (id, content) => {
  try {
    const response = await api.post(`/candidates/${id}/notes`, { content });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Update candidate status
export const updateCandidateStatus = async (id, status) => {
  try {
    const response = await api.patch(`/candidates/${id}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Send email notification to multiple candidates
export const sendEmailNotification = async (candidateIds, subject, message) => {
  try {
    const response = await api.post('/candidates/notify/email', {
      candidateIds,
      subject,
      message
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Send SMS notification to multiple candidates
export const sendSmsNotification = async (candidateIds, message) => {
  try {
    const response = await api.post('/candidates/notify/sms', {
      candidateIds,
      message
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

export default {
  getCandidates,
  getCandidate,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  addCandidateNote,
  updateCandidateStatus,
  sendEmailNotification,
  sendSmsNotification
};