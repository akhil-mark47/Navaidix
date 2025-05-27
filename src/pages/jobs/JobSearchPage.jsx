import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaSearch, FaBriefcase, FaDollarSign, FaMapMarkerAlt, FaFilter, FaChevronRight } from 'react-icons/fa';
import * as jobService from '../../services/jobService';

const JobSearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || '',
    jobType: searchParams.get('jobType') || '',
    sort: searchParams.get('sort') || 'newest'
  });
  const [showFilters, setShowFilters] = useState(false);

  const page = parseInt(searchParams.get('page')) || 1;
  const limit = 10;

  // Fetch jobs when search params change
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Build query parameters
        const queryParams = {
          page,
          limit,
          sort: getApiSortParam(filters.sort),
        };
        
        if (filters.search) queryParams.search = filters.search;
        if (filters.location) queryParams.location = filters.location;
        if (filters.jobType) queryParams.jobType = filters.jobType;
        
        const response = await jobService.getJobs(queryParams);
        
        setJobs(response.data.jobs);
        setTotalJobs(response.total);
        setTotalPages(response.pages);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [searchParams, page]);

  // Helper function to convert UI sort option to API sort parameter
  const getApiSortParam = (sortOption) => {
    switch (sortOption) {
      case 'newest':
        return '-createdAt';
      case 'oldest':
        return 'createdAt';
      case 'salary-high':
        return '-salary.max';
      case 'salary-low':
        return 'salary.min';
      default:
        return '-createdAt';
    }
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Update URL parameters
    const newParams = new URLSearchParams();
    
    if (filters.search) newParams.set('search', filters.search);
    if (filters.location) newParams.set('location', filters.location);
    if (filters.jobType) newParams.set('jobType', filters.jobType);
    if (filters.sort) newParams.set('sort', filters.sort);
    newParams.set('page', '1'); // Reset to first page on new search
    
    setSearchParams(newParams);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  // Format date to relative time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Find Your Dream Job</h1>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSearchSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title, Skills or Keywords
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </span>
                <input
                  type="text"
                  id="search"
                  name="search"
                  value={filters.search}
                  onChange={handleInputChange}
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="e.g., Software Engineer"
                />
              </div>
            </div>
            
            <div className="relative">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-gray-400" />
                </span>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={filters.location}
                  onChange={handleInputChange}
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  placeholder="City, State, or Country"
                />
              </div>
            </div>
            
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
              >
                Search Jobs
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex items-center">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-primary font-medium hover:text-primary-dark"
            >
              <FaFilter className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Advanced Filters'}
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={filters.jobType}
                  onChange={handleInputChange}
                  className="py-2 px-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                >
                  <option value="">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  id="sort"
                  name="sort"
                  value={filters.sort}
                  onChange={handleInputChange}
                  className="py-2 px-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="salary-high">Highest Salary</option>
                  <option value="salary-low">Lowest Salary</option>
                </select>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Job Results */}
      <div className="mb-8">
        {loading ? (
          <div className="text-center p-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-center p-6 rounded-lg border border-red-200">
            <p className="text-red-600">{error}</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-gray-50 text-center p-12 rounded-lg border border-gray-200">
            <p className="text-xl font-medium text-gray-500">No jobs found</p>
            <p className="mt-2 text-gray-500">Try changing your search criteria</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">
                Found <span className="font-semibold">{totalJobs}</span> jobs
              </p>
              
              <div className="text-sm text-gray-500">
                Page {page} of {totalPages}
              </div>
            </div>
            
            <div className="space-y-4">
              {jobs.map(job => (
                <div key={job._id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary hover:shadow-lg transition-shadow">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                    <span className="text-sm text-gray-500">{formatDate(job.createdAt)}</span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <span className="text-gray-700 font-medium">{job.company}</span>
                    {job.remote && (
                      <span className="ml-4 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Remote</span>
                    )}
                    {job.jobType && (
                      <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">{job.jobType}</span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap mb-4 text-gray-500 text-sm">
                    <div className="flex items-center mr-6">
                      <FaMapMarkerAlt className="mr-1" />
                      {job.location || 'Location not specified'}
                    </div>
                    {job.salary && (
                      <div className="flex items-center mr-6">
                        <FaDollarSign className="mr-1" />
                        {job.salary.min && job.salary.max 
                          ? `${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} ${job.salary.currency || 'USD'}`
                          : job.salary.min 
                            ? `From ${job.salary.min.toLocaleString()} ${job.salary.currency || 'USD'}` 
                            : job.salary.max 
                              ? `Up to ${job.salary.max.toLocaleString()} ${job.salary.currency || 'USD'}`
                              : 'Salary not specified'
                        }
                      </div>
                    )}
                    <div className="flex items-center">
                      <FaBriefcase className="mr-1" />
                      {job.experience || 'Experience not specified'}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{job.summary || job.description.substring(0, 200)}...</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills && job.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <Link 
                      to={`/jobs/${job._id}`} 
                      className="flex items-center text-primary font-medium hover:text-primary-dark"
                    >
                      View Details
                      <FaChevronRight className="ml-2" size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-md ${
                      page === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show pages around the current page
                    const startPage = Math.max(1, page - 2);
                    const pageNum = startPage + i;
                    
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 rounded-md ${
                          pageNum === page
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-md ${
                      page === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobSearchPage;