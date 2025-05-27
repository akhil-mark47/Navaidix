import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaSpinner, FaTrash, FaEdit, FaUserPlus, FaFileDownload, FaEnvelope, FaSms } from 'react-icons/fa';
import candidateService from '../../services/candidateService';

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterSkills, setFilterSkills] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [limit, setLimit] = useState(10);

  // Load candidates on component mount and when filters change
  useEffect(() => {
    fetchCandidates();
  }, [page, limit, filterStatus]);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params = {
        page,
        limit,
        sort: '-createdAt',
      };
      
      // Add filters if set
      if (searchQuery) {
        params.search = searchQuery;
      }
      
      if (filterStatus) {
        params.status = filterStatus;
      }
      
      if (filterSkills.length > 0) {
        params.skills = filterSkills.join(',');
      }

      const result = await candidateService.getCandidates(params);
      setCandidates(result.data.candidates || []);
      setTotalPages(result.pages || 1);
      setTotalCandidates(result.total || 0);
    } catch (err) {
      setError('Failed to fetch candidates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page
    fetchCandidates();
  };

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
    setPage(1); // Reset to first page
  };

  const handleSkillChange = (skill) => {
    if (filterSkills.includes(skill)) {
      setFilterSkills(filterSkills.filter(s => s !== skill));
    } else {
      setFilterSkills([...filterSkills, skill]);
    }
    setPage(1); // Reset to first page
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSelectCandidate = (id) => {
    if (selectedCandidates.includes(id)) {
      setSelectedCandidates(selectedCandidates.filter(candidateId => candidateId !== id));
    } else {
      setSelectedCandidates([...selectedCandidates, id]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCandidates(candidates.map(candidate => candidate._id));
    } else {
      setSelectedCandidates([]);
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedCandidates.length} candidates?`)) {
      try {
        // In a real app, you'd have a bulk delete API endpoint
        // Here we'll delete them one by one
        await Promise.all(selectedCandidates.map(id => candidateService.deleteCandidate(id)));
        
        // Refresh the list
        fetchCandidates();
        
        // Clear selection
        setSelectedCandidates([]);
      } catch (err) {
        setError('Failed to delete candidates');
        console.error(err);
      }
    }
  };

  // Common skill options for filter
  const skillOptions = [
    'React', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'MongoDB',
    'SQL', 'Python', 'Java', 'C#', 'AWS', 'Azure', 'DevOps'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">Candidates Management</h1>
        
        <div className="flex items-center space-x-2">
          <Link
            to="/admin/candidates/new"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center"
          >
            <FaUserPlus className="mr-2" /> Add Candidate
          </Link>
          
          {selectedCandidates.length > 0 && (
            <>
              <button
                onClick={handleBulkDelete}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center"
                title="Delete selected"
              >
                <FaTrash className="mr-2" /> Delete ({selectedCandidates.length})
              </button>
              
              <Link
                to={`/admin/notifications/email?ids=${selectedCandidates.join(',')}`}
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center"
                title="Send email"
              >
                <FaEnvelope className="mr-2" /> Email
              </Link>
              
              <Link
                to={`/admin/notifications/sms?ids=${selectedCandidates.join(',')}`}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md flex items-center"
                title="Send SMS"
              >
                <FaSms className="mr-2" /> SMS
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <form onSubmit={handleSearch} className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search candidates by name, skills, or resume text"
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaSearch />
              </span>
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
              >
                Search
              </button>
            </div>
          </form>
          
          <button
            onClick={handleFilterToggle}
            className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <FaFilter className="mr-1" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={handleStatusChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Statuses</option>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto border p-2 rounded-md">
                {skillOptions.map((skill) => (
                  <label key={skill} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filterSkills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('');
                  setFilterSkills([]);
                  setPage(1);
                  fetchCandidates();
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      {/* Candidates Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="w-10 px-6 py-3">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedCandidates.length > 0 && selectedCandidates.length === candidates.length}
                        className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Skills
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                      <tr key={candidate._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedCandidates.includes(candidate._id)}
                            onChange={() => handleSelectCandidate(candidate._id)}
                            className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {candidate.fullName}
                              </div>
                              <div className="text-sm text-gray-500">{candidate.email}</div>
                              <div className="text-xs text-gray-400">{candidate.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {candidate.location?.city ? (
                            <>
                              {candidate.location.city}
                              {candidate.location.state && `, ${candidate.location.state}`}
                              {candidate.location.country && `, ${candidate.location.country}`}
                              {candidate.location.remote && " (Remote)"}
                            </>
                          ) : (
                            'Not specified'
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {candidate.yearsOfExperience ? `${candidate.yearsOfExperience} years` : 'Not specified'}
                          <div className="text-xs text-gray-400">{candidate.currentJobTitle || ''}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {candidate.skills && candidate.skills.length > 0 ? (
                              candidate.skills.slice(0, 3).map((skill, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                  {skill}
                                </span>
                              ))
                            ) : (
                              'None'
                            )}
                            {candidate.skills && candidate.skills.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{candidate.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${candidate.status === 'new' ? 'bg-green-100 text-green-800' : ''}
                            ${candidate.status === 'contacted' ? 'bg-blue-100 text-blue-800' : ''}
                            ${candidate.status === 'interviewing' ? 'bg-purple-100 text-purple-800' : ''}
                            ${candidate.status === 'offer' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${candidate.status === 'hired' ? 'bg-green-100 text-green-800' : ''}
                            ${candidate.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                            ${candidate.status === 'inactive' ? 'bg-gray-100 text-gray-800' : ''}
                          `}>
                            {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              to={`/admin/candidates/${candidate._id}`}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              View
                            </Link>
                            <Link
                              to={`/admin/candidates/${candidate._id}/edit`}
                              className="text-indigo-600 hover:text-indigo-900"
                              title="Edit"
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete ${candidate.fullName}?`)) {
                                  candidateService.deleteCandidate(candidate._id)
                                    .then(() => fetchCandidates())
                                    .catch(err => {
                                      setError('Failed to delete candidate');
                                      console.error(err);
                                    });
                                }
                              }}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                        No candidates found. Try adjusting your filters or add new candidates.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(page * limit, totalCandidates)}
                    </span>{' '}
                    of <span className="font-medium">{totalCandidates}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      Previous
                    </button>
                    
                    {/* Page numbers */}
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === i + 1
                            ? 'bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        page === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CandidatesList;