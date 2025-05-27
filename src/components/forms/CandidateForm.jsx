import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUpload, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import candidateService from '../../services/candidateService';

const CandidateForm = ({ editMode = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(editMode);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  
  // Form fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: {
      city: '',
      state: '',
      country: '',
      remote: false,
    },
    currentJobTitle: '',
    yearsOfExperience: '',
    skills: [],
    education: [
      { degree: '', institution: '', graduationYear: '', field: '' }
    ],
    workExperience: [
      { company: '', position: '', startDate: '', endDate: '', description: '', currentlyWorking: false }
    ],
    status: 'new',
    preferredSalary: {
      min: '',
      max: '',
      currency: 'USD',
    },
    availableFrom: '',
    notificationPreference: {
      email: true,
      sms: false,
    }
  });
  
  const [resume, setResume] = useState(null);
  const [resumeFileName, setResumeFileName] = useState('');
  
  // Input for adding skills
  const [skillInput, setSkillInput] = useState('');
  
  // Fetch candidate data if in edit mode
  useEffect(() => {
    if (editMode && id) {
      const fetchCandidate = async () => {
        try {
          const response = await candidateService.getCandidate(id);
          const candidate = response.data.candidate;
          
          // Format dates for input fields
          if (candidate.availableFrom) {
            candidate.availableFrom = new Date(candidate.availableFrom)
              .toISOString()
              .split('T')[0];
          }
          
          if (candidate.workExperience && candidate.workExperience.length > 0) {
            candidate.workExperience = candidate.workExperience.map(exp => ({
              ...exp,
              startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
              endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : '',
            }));
          }
          
          setFormData(candidate);
          
          if (candidate.resumePath) {
            // Extract filename from path
            const fileName = candidate.resumePath.split('/').pop();
            setResumeFileName(fileName || 'Resume on file');
          }
        } catch (err) {
          setError('Failed to fetch candidate data');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchCandidate();
    }
  }, [editMode, id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  // Handle resume file selection
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      setResumeFileName(file.name);
    }
  };

  // Handle skills input
  const handleAddSkill = () => {
    if (skillInput.trim() !== '') {
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData({
          ...formData,
          skills: [...formData.skills, skillInput.trim()]
        });
      }
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  // Handle education fields
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { degree: '', institution: '', graduationYear: '', field: '' }
      ]
    });
  };

  const removeEducation = (index) => {
    const newEducation = [...formData.education];
    newEducation.splice(index, 1);
    setFormData({
      ...formData,
      education: newEducation
    });
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData({
      ...formData,
      education: newEducation
    });
  };

  // Handle work experience fields
  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        { company: '', position: '', startDate: '', endDate: '', description: '', currentlyWorking: false }
      ]
    });
  };

  const removeWorkExperience = (index) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience.splice(index, 1);
    setFormData({
      ...formData,
      workExperience: newWorkExperience
    });
  };

  const handleWorkExperienceChange = (index, field, value, isCheckbox = false) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[index][field] = isCheckbox ? value : value;
    
    // If currently working, clear end date
    if (field === 'currentlyWorking' && value === true) {
      newWorkExperience[index].endDate = '';
    }
    
    setFormData({
      ...formData,
      workExperience: newWorkExperience
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      const candidateData = { ...formData };
      
      // Add resume if selected
      if (resume) {
        candidateData.resume = resume;
      }
      
      let response;
      if (editMode) {
        response = await candidateService.updateCandidate(id, candidateData);
      } else {
        response = await candidateService.createCandidate(candidateData);
      }
      
      // Navigate to candidates list after successful save
      navigate('/admin/candidates');
    } catch (err) {
      setError('Failed to save candidate data. Please check your inputs and try again.');
      console.error(err);
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="h-64 flex items-center justify-center">Loading candidate data...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          {editMode ? 'Edit Candidate' : 'Add New Candidate'}
        </h2>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 mx-6 mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FaTimes className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6">
        {/* Basic Information */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 border-b pb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="currentJobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Current Job Title
              </label>
              <input
                type="text"
                id="currentJobTitle"
                name="currentJobTitle"
                value={formData.currentJobTitle}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                min="0"
                max="50"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="interviewing">Interviewing</option>
                <option value="offer">Offer</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700 mb-1">
                Available From
              </label>
              <input
                type="date"
                id="availableFrom"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 border-b pb-2">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="location.city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="location.city"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="location.state" className="block text-sm font-medium text-gray-700 mb-1">
                State/Province
              </label>
              <input
                type="text"
                id="location.state"
                name="location.state"
                value={formData.location.state}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="location.country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                id="location.country"
                name="location.country"
                value={formData.location.country}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="md:col-span-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="location.remote"
                  name="location.remote"
                  checked={formData.location.remote}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="location.remote" className="ml-2 block text-sm text-gray-700">
                  Available for Remote Work
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 border-b pb-2">Resume</h3>
          <div className="flex items-center space-x-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume</label>
              <div className="flex items-center">
                <label className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                  <span className="flex items-center">
                    <FaUpload className="mr-2" />
                    Select File
                  </span>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                    className="sr-only"
                  />
                </label>
                {resumeFileName && (
                  <span className="ml-3 text-sm text-gray-500">{resumeFileName}</span>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 border-b pb-2">Skills</h3>
          <div className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add a skill"
                className="w-full border-gray-300 rounded-l-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
              >
                <FaPlus />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
            {formData.skills.length === 0 && (
              <p className="text-sm text-gray-500">No skills added yet</p>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 flex-grow">Education</h3>
            <button
              type="button"
              onClick={addEducation}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <FaPlus className="mr-1" />
              <span>Add Education</span>
            </button>
          </div>
          
          {formData.education.map((edu, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="flex justify-between mb-3">
                <h4 className="font-medium">Education #{index + 1}</h4>
                {formData.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                  <input
                    type="text"
                    value={edu.field}
                    onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                  <input
                    type="number"
                    min="1950"
                    max="2030"
                    value={edu.graduationYear}
                    onChange={(e) => handleEducationChange(index, 'graduationYear', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Work Experience */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2 flex-grow">Work Experience</h3>
            <button
              type="button"
              onClick={addWorkExperience}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <FaPlus className="mr-1" />
              <span>Add Experience</span>
            </button>
          </div>
          
          {formData.workExperience.map((exp, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="flex justify-between mb-3">
                <h4 className="font-medium">Experience #{index + 1}</h4>
                {formData.workExperience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeWorkExperience(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                    disabled={exp.currentlyWorking}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`currentlyWorking-${index}`}
                      checked={exp.currentlyWorking}
                      onChange={(e) => handleWorkExperienceChange(index, 'currentlyWorking', e.target.checked, true)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`currentlyWorking-${index}`} className="ml-2 block text-sm text-gray-700">
                      Currently working here
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows="3"
                    value={exp.description}
                    onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Salary Expectations */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 border-b pb-2">Salary Expectations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="preferredSalary.min" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Salary
              </label>
              <input
                type="number"
                min="0"
                id="preferredSalary.min"
                name="preferredSalary.min"
                value={formData.preferredSalary.min}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="preferredSalary.max" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Salary
              </label>
              <input
                type="number"
                min="0"
                id="preferredSalary.max"
                name="preferredSalary.max"
                value={formData.preferredSalary.max}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="preferredSalary.currency" className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                id="preferredSalary.currency"
                name="preferredSalary.currency"
                value={formData.preferredSalary.currency}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
                <option value="AUD">AUD</option>
                <option value="INR">INR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 border-b pb-2">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notificationPreference.email"
                name="notificationPreference.email"
                checked={formData.notificationPreference.email}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="notificationPreference.email" className="ml-2 block text-sm text-gray-700">
                Email Notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notificationPreference.sms"
                name="notificationPreference.sms"
                checked={formData.notificationPreference.sms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="notificationPreference.sms" className="ml-2 block text-sm text-gray-700">
                SMS Notifications
              </label>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/candidates')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={saving}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center ${
              saving ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            <FaSave className="mr-2" />
            {saving ? 'Saving...' : 'Save Candidate'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CandidateForm;