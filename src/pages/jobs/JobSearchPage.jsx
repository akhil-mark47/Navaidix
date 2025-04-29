import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiLocationMarker, HiOfficeBuilding, HiClock, HiCurrencyDollar } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const JobSearchPage = () => {
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    category: '',
    jobType: '',
    salary: ''
  });

  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock job data - in a real application this would come from an API
  const mockJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      posted: '2 days ago',
      description: 'We are looking for an experienced software engineer to join our team to develop cutting-edge applications...',
      requirements: ['5+ years experience', 'JavaScript expertise', 'React knowledge', 'Backend experience']
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Global Solutions',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      posted: '1 week ago',
      description: 'Seeking a product manager to lead our flagship product development and strategy...',
      requirements: ['3+ years in product management', 'Technical background', 'Agile methodologies', 'Leadership skills']
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      company: 'Creative Digital',
      location: 'Remote',
      type: 'Contract',
      salary: '$80,000 - $100,000',
      posted: '3 days ago',
      description: 'Looking for a talented designer to create beautiful and functional user interfaces...',
      requirements: ['Portfolio showcasing work', 'Figma expertise', 'User research experience', 'Prototyping skills']
    },
    {
      id: 4,
      title: 'Marketing Specialist',
      company: 'Brand Elevate',
      location: 'Chicago, IL',
      type: 'Part-time',
      salary: '$60,000 - $70,000',
      posted: '1 day ago',
      description: 'Join our marketing team to develop and execute marketing campaigns across multiple channels...',
      requirements: ['Digital marketing experience', 'Social media management', 'Content creation', 'Analytics knowledge']
    }
  ];

  // Filter jobs based on search criteria
  const filteredJobs = mockJobs.filter(job => {
    const matchesKeyword = filters.keyword ? 
      job.title.toLowerCase().includes(filters.keyword.toLowerCase()) || 
      job.description.toLowerCase().includes(filters.keyword.toLowerCase()) : 
      true;
    
    const matchesLocation = filters.location ? 
      job.location.toLowerCase().includes(filters.location.toLowerCase()) : 
      true;
    
    const matchesCategory = filters.category ? 
      job.title.toLowerCase().includes(filters.category.toLowerCase()) : 
      true;
    
    const matchesJobType = filters.jobType ? 
      job.type.toLowerCase() === filters.jobType.toLowerCase() : 
      true;
    
    const matchesSalary = true; // Would implement proper salary range filtering in a real application
    
    return matchesKeyword && matchesLocation && matchesCategory && matchesJobType && matchesSalary;
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setSearchPerformed(true);
      setIsLoading(false);
    }, 800);
  };

  const [expandedJob, setExpandedJob] = useState(null);

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-slate-800">Find Your Perfect Role</h1>
          <p className="text-lg text-slate-600">Search thousands of jobs matching your skills and career goals</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiSearch className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="keyword"
                  value={filters.keyword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="Job title, keywords, or company"
                />
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiLocationMarker className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="City, state, or remote"
                />
              </div>
              
              <div>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                >
                  <option value="">All Categories</option>
                  <option value="software">Software Development</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance">Finance</option>
                  <option value="sales">Sales</option>
                  <option value="healthcare">Healthcare</option>
                </select>
              </div>
              
              <div>
                <select
                  name="jobType"
                  value={filters.jobType}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                >
                  <option value="">All Job Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </>
                  ) : (
                    'Search Jobs'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="border-t border-slate-200 pt-6">
          {searchPerformed && (
            <div className="mb-4 text-slate-600">
              Found {filteredJobs.length} job{filteredJobs.length !== 1 && 's'} matching your criteria
            </div>
          )}
          
          <div className="space-y-4">
            {searchPerformed && filteredJobs.map(job => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden"
              >
                <div 
                  className="p-6 cursor-pointer" 
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-xl font-medium text-slate-800">{job.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mt-2 md:mt-0">
                      {job.type}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center text-sm text-slate-500 mt-2 space-y-1 sm:space-y-0">
                    <div className="flex items-center">
                      <HiOfficeBuilding className="mr-1 h-4 w-4" /> 
                      {job.company}
                    </div>
                    <div className="sm:mx-3 hidden sm:block">•</div>
                    <div className="flex items-center">
                      <HiLocationMarker className="mr-1 h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="sm:mx-3 hidden sm:block">•</div>
                    <div className="flex items-center">
                      <HiCurrencyDollar className="mr-1 h-4 w-4" />
                      {job.salary}
                    </div>
                    <div className="sm:mx-3 hidden sm:block">•</div>
                    <div className="flex items-center">
                      <HiClock className="mr-1 h-4 w-4" />
                      Posted {job.posted}
                    </div>
                  </div>
                  
                  {expandedJob === job.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-slate-200"
                    >
                      <p className="text-slate-600 mb-4">{job.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-slate-700 mb-2">Requirements</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <Link to={`/job-application`} className="block text-left">
                      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all text-sm">
                        Apply Now
                      </button>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {searchPerformed && filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-slate-700 mb-1">No jobs found</h3>
                <p className="text-slate-500">Try adjusting your search criteria</p>
              </div>
            )}
            
            {!searchPerformed && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-slate-700 mb-1">Start your job search</h3>
                <p className="text-slate-500">Use the search filters above to find your perfect role</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchPage;