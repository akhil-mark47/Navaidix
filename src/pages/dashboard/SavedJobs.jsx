import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineViewGrid, HiOutlineDocument, HiOutlineClipboardList, HiOutlineChat, HiStar, HiOutlineBriefcase, HiOutlineLocationMarker, HiOutlineCurrencyDollar, HiOutlineCalendar } from 'react-icons/hi';

const SavedJobs = () => {
  const { user } = useAuth();
  const [savedJobs, setSavedJobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'New York, NY (Remote)',
      salary: '$120,000 - $150,000',
      description: 'We are looking for an experienced Frontend Developer to join our growing team. You will be responsible for building responsive and interactive web applications using React and modern JavaScript frameworks.',
      datePosted: '2025-04-15',
      dateSaved: '2025-04-20',
      tags: ['React', 'TypeScript', 'Redux', 'Frontend'],
      skillMatch: 92,
      applied: false
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'InnovateCo',
      location: 'San Francisco, CA (Hybrid)',
      salary: '$130,000 - $160,000',
      description: 'Join our product team to develop and drive the roadmap for our flagship SaaS platform. You will work closely with engineering, design, and customer success teams to deliver features that delight our users.',
      datePosted: '2025-04-18',
      dateSaved: '2025-04-22',
      tags: ['Product Strategy', 'Agile', 'SaaS', 'User Research'],
      skillMatch: 85,
      applied: true
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'DesignHub',
      location: 'Remote',
      salary: '$90,000 - $120,000',
      description: 'Help us design intuitive and beautiful user experiences for our enterprise customers. You will collaborate with product managers and developers to create wireframes, prototypes, and final designs.',
      datePosted: '2025-04-10',
      dateSaved: '2025-04-19',
      tags: ['UX/UI', 'Figma', 'User Testing', 'Design Systems'],
      skillMatch: 88,
      applied: false
    }
  ]);
  
  const handleRemoveJob = (jobId) => {
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-primary to-primary-light text-white">
                <h2 className="font-semibold">Navigation</h2>
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  <li>
                    <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-slate-50 text-slate-600 hover:text-primary">
                      <HiOutlineViewGrid className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/applications" className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-slate-50 text-slate-600 hover:text-primary">
                      <HiOutlineDocument className="h-5 w-5" />
                      <span>Applications</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/saved-jobs" className="flex items-center gap-2 px-4 py-2 rounded-md bg-pale text-primary">
                      <HiOutlineClipboardList className="h-5 w-5" />
                      <span>Saved Jobs</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/messages" className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-slate-50 text-slate-600 hover:text-primary">
                      <HiOutlineChat className="h-5 w-5" />
                      <span>Messages</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-4 border-b border-slate-200">
                <h2 className="text-xl font-bold">Saved Jobs</h2>
                <p className="text-sm text-slate-500 mt-1">
                  {savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved
                </p>
              </div>
              
              <div className="divide-y divide-slate-200">
                {savedJobs.length > 0 ? (
                  savedJobs.map(job => (
                    <div key={job.id} className="p-4 relative">
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          job.applied 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {job.applied ? 'Applied' : 'Not Applied'}
                        </span>
                        <button 
                          onClick={() => handleRemoveJob(job.id)} 
                          className="text-slate-400 hover:text-red-500 focus:outline-none"
                          title="Remove from saved jobs"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-primary-light/20 text-primary rounded-md h-12 w-12 flex items-center justify-center mr-4">
                          {job.company.charAt(0)}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-slate-900">
                            {job.title}
                          </h3>
                          
                          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                            <div className="flex items-center text-slate-500">
                              <HiOutlineBriefcase className="mr-1 h-4 w-4" />
                              {job.company}
                            </div>
                            
                            <div className="flex items-center text-slate-500">
                              <HiOutlineLocationMarker className="mr-1 h-4 w-4" />
                              {job.location}
                            </div>
                            
                            <div className="flex items-center text-slate-500">
                              <HiOutlineCurrencyDollar className="mr-1 h-4 w-4" />
                              {job.salary}
                            </div>
                            
                            <div className="flex items-center text-slate-500">
                              <HiOutlineCalendar className="mr-1 h-4 w-4" />
                              Posted {new Date(job.datePosted).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                            {job.description}
                          </p>
                          
                          {/* Tags */}
                          <div className="mt-3 flex flex-wrap gap-2">
                            {job.tags.map((tag, index) => (
                              <span 
                                key={index} 
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          {/* Match percentage */}
                          <div className="mt-3 flex items-center">
                            <span className="text-xs text-slate-500">Skills Match:</span>
                            <div className="ml-2 h-2 w-24 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  job.skillMatch > 90 
                                    ? 'bg-emerald-500' 
                                    : job.skillMatch > 75 
                                    ? 'bg-amber-500' 
                                    : 'bg-rose-500'
                                }`} 
                                style={{ width: `${job.skillMatch}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-xs font-medium text-slate-700">
                              {job.skillMatch}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="mt-4 flex flex-wrap gap-3">
                        {!job.applied ? (
                          <Link
                            to={`/jobs/${job.id}/apply`}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                          >
                            Apply Now
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 cursor-not-allowed"
                          >
                            Applied
                          </button>
                        )}
                        
                        <Link
                          to={`/jobs/${job.id}`}
                          className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center">
                    <HiStar className="mx-auto h-12 w-12 text-slate-400" />
                    <h3 className="mt-2 text-lg font-medium text-slate-900">No saved jobs yet</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Jobs you save will appear here
                    </p>
                    <div className="mt-6">
                      <Link
                        to="/job-search"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Find Jobs
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;