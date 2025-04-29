import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { HiOutlineViewGrid, HiOutlineDocument, HiOutlineClipboardList, HiOutlineChat, HiOutlineOfficeBuilding } from 'react-icons/hi';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data for the dashboard
  const recentJobs = [
    { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp', location: 'New York, NY', date: '2d ago' },
    { id: 2, title: 'Product Manager', company: 'InnovateCo', location: 'Remote', date: '3d ago' },
    { id: 3, title: 'UX Designer', company: 'DesignHub', location: 'San Francisco, CA', date: '1w ago' },
  ];

  const upcomingInterviews = [
    { id: 1, position: 'Software Engineer', company: 'GlobalTech', date: '2025-05-02', time: '10:00 AM' },
    { id: 2, position: 'Data Analyst', company: 'DataCorp', date: '2025-05-05', time: '2:00 PM' },
  ];

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
                    <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-md bg-pale text-primary">
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

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Welcome card */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6">
                <h2 className="text-xl font-semibold mb-2">
                  Welcome back, {user?.firstName || user?.name?.split(' ')[0] || 'User'}!
                </h2>
                <p className="text-slate-600 mb-4">
                  Here's what's happening with your job search today.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary">5</div>
                    <div className="text-sm text-slate-500">Active applications</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-slate-500">Saved jobs</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-sm text-slate-500">Profile views</div>
                  </div>
                </div>
              </div>

              {/* Recent jobs */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Job Listings</h2>
                <div className="space-y-4">
                  {recentJobs.map(job => (
                    <div key={job.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-primary">{job.title}</h3>
                        <span className="text-sm text-slate-500">{job.date}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <HiOutlineOfficeBuilding className="text-slate-400" />
                        <span>{job.company}</span>
                        <span className="text-slate-300 mx-2">|</span>
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button className="btn-outline py-1.5 px-4 text-sm">View Details</button>
                      </div>
                    </div>
                  ))}
                  <div className="text-center mt-4">
                    <Link to="/job-search" className="text-primary hover:underline">View all job listings →</Link>
                  </div>
                </div>
              </div>

              {/* Upcoming interviews */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6">
                <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
                {upcomingInterviews.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingInterviews.map(interview => (
                      <div key={interview.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                        <div>
                          <h3 className="font-semibold">{interview.position}</h3>
                          <p className="text-sm text-slate-500">{interview.company}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{new Date(interview.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                          <p className="text-sm text-slate-500">{interview.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-lg text-center text-slate-600">
                    No upcoming interviews scheduled.
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

export default Dashboard;