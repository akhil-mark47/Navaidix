import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineViewGrid, HiOutlineDocument, HiOutlineClipboardList, HiOutlineChat, HiOutlineLogout, HiOutlineOfficeBuilding, HiOutlineCalendar, HiOutlineCheckCircle, HiOutlineDocumentText, HiOutlineClock } from 'react-icons/hi';

const Applications = () => {
  const { user, signOut } = useAuth();
  const [applications, setApplications] = useState([
    { 
      id: 1, 
      jobTitle: 'Senior Frontend Developer', 
      company: 'TechCorp', 
      location: 'New York, NY',
      appliedDate: '2025-04-10',
      status: 'interview',
      statusText: 'Interview Scheduled',
      nextStep: 'Technical Interview on May 5, 2025',
      notes: 'Prepare portfolio and review React hooks, context API.'
    },
    { 
      id: 2, 
      jobTitle: 'Product Manager', 
      company: 'InnovateCo', 
      location: 'Remote',
      appliedDate: '2025-04-15',
      status: 'reviewing',
      statusText: 'Application Under Review',
      nextStep: 'Waiting for response',
      notes: 'Follow up if no response by April 30.'
    },
    { 
      id: 3, 
      jobTitle: 'Full Stack Developer', 
      company: 'WebSolutions', 
      location: 'Austin, TX',
      appliedDate: '2025-04-18',
      status: 'applied',
      statusText: 'Applied',
      nextStep: 'Waiting for initial screening',
      notes: ''
    },
    { 
      id: 4, 
      jobTitle: 'UX Researcher', 
      company: 'DesignWorks', 
      location: 'Seattle, WA',
      appliedDate: '2025-04-05',
      status: 'rejected',
      statusText: 'Not Selected',
      nextStep: 'N/A',
      notes: 'They were looking for someone with more healthcare industry experience.'
    }
  ]);

  const handleSignOut = () => {
    signOut();
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'applied':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Applied</span>;
      case 'reviewing':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Under Review</span>;
      case 'interview':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Interview</span>;
      case 'offer':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Offer Received</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Not Selected</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Unknown</span>;
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'applied':
        return <HiOutlineDocumentText className="h-5 w-5 text-blue-500" />;
      case 'reviewing':
        return <HiOutlineClock className="h-5 w-5 text-yellow-500" />;
      case 'interview':
        return <HiOutlineCalendar className="h-5 w-5 text-green-500" />;
      case 'offer':
        return <HiOutlineCheckCircle className="h-5 w-5 text-purple-500" />;
      case 'rejected':
        return <HiOutlineDocumentText className="h-5 w-5 text-red-500" />;
      default:
        return <HiOutlineDocumentText className="h-5 w-5 text-gray-500" />;
    }
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
                    <Link to="/applications" className="flex items-center gap-2 px-4 py-2 rounded-md bg-pale text-primary">
                      <HiOutlineDocument className="h-5 w-5" />
                      <span>Applications</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/saved-jobs" className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-slate-50 text-slate-600 hover:text-primary">
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
            <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Applications</h1>
                <span className="text-sm text-slate-500">{applications.length} applications</span>
              </div>

              {/* Application stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-semibold text-primary">
                    {applications.filter(app => ['applied', 'reviewing', 'interview', 'offer'].includes(app.status)).length}
                  </div>
                  <div className="text-xs text-slate-500">Active</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-semibold text-blue-500">
                    {applications.filter(app => app.status === 'applied').length}
                  </div>
                  <div className="text-xs text-slate-500">Applied</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-semibold text-green-500">
                    {applications.filter(app => app.status === 'interview').length}
                  </div>
                  <div className="text-xs text-slate-500">Interviews</div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg text-center">
                  <div className="text-lg font-semibold text-red-500">
                    {applications.filter(app => app.status === 'rejected').length}
                  </div>
                  <div className="text-xs text-slate-500">Rejected</div>
                </div>
              </div>

              {applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map(application => (
                    <div key={application.id} className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-all duration-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-primary text-lg">{application.jobTitle}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <HiOutlineOfficeBuilding className="text-slate-400" />
                            <span className="text-sm">{application.company}</span>
                            <span className="text-slate-300 mx-2">|</span>
                            <span className="text-sm">{application.location}</span>
                          </div>
                        </div>
                        <div>
                          {getStatusBadge(application.status)}
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <HiOutlineCalendar className="text-slate-400" />
                          <span className="text-sm">Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                        </div>
                        
                        {application.nextStep && (
                          <div className="flex items-start gap-2">
                            {getStatusIcon(application.status)}
                            <div>
                              <div className="text-sm font-medium">{application.statusText}</div>
                              <div className="text-xs text-slate-500">{application.nextStep}</div>
                            </div>
                          </div>
                        )}
                        
                        {application.notes && (
                          <div className="mt-3 p-3 bg-slate-50 rounded-md">
                            <div className="text-xs font-medium text-slate-600">Notes:</div>
                            <div className="text-sm">{application.notes}</div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <button className="btn-outline py-1.5 px-4 text-sm">Update Status</button>
                        <Link to={`/application/${application.id}`}>
                          <button className="btn-primary py-1.5 px-4 text-sm">View Details</button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-slate-100 rounded-full p-4 mb-4">
                    <HiOutlineDocumentText className="h-12 w-12 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                  <p className="text-slate-500 mb-6">Start applying to jobs to track your applications here.</p>
                  <Link to="/job-search">
                    <button className="btn-primary">Browse Jobs</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;