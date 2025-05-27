import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaUserTie, FaCheckCircle, FaSpinner, FaChartLine } from 'react-icons/fa';
import candidateService from '../../services/candidateService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    newCandidates: 0,
    interviewing: 0,
    hired: 0
  });
  const [recentCandidates, setRecentCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch candidates with status counts for statistics
        const result = await candidateService.getCandidates({
          limit: 5,
          sort: '-createdAt'
        });
        
        // Set recent candidates
        setRecentCandidates(result.data.candidates || []);
        
        // In a real application, you'd have API endpoints for these stats
        // For now, we'll calculate them based on the candidates we have
        const candidates = result.data.candidates || [];
        
        const statusCounts = candidates.reduce((acc, candidate) => {
          acc[candidate.status] = (acc[candidate.status] || 0) + 1;
          return acc;
        }, {});
        
        setStats({
          totalCandidates: result.total || 0,
          newCandidates: statusCounts.new || 0,
          interviewing: statusCounts.interviewing || 0,
          hired: statusCounts.hired || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <FaUsers className="text-blue-500 text-xl" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500 uppercase">Total Candidates</h3>
            <p className="text-2xl font-bold">{stats.totalCandidates}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <FaUserTie className="text-green-500 text-xl" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500 uppercase">New Candidates</h3>
            <p className="text-2xl font-bold">{stats.newCandidates}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <FaSpinner className="text-purple-500 text-xl" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500 uppercase">In Interview Process</h3>
            <p className="text-2xl font-bold">{stats.interviewing}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <FaCheckCircle className="text-yellow-500 text-xl" />
          </div>
          <div>
            <h3 className="text-sm text-gray-500 uppercase">Hired</h3>
            <p className="text-2xl font-bold">{stats.hired}</p>
          </div>
        </div>
      </div>
      
      {/* Recent Candidates */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Candidates</h2>
          <Link to="/admin/candidates" className="text-blue-500 hover:text-blue-700 text-sm">
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentCandidates.length > 0 ? (
                recentCandidates.map((candidate) => (
                  <tr key={candidate._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{candidate.fullName}</div>
                      <div className="text-sm text-gray-500">{candidate.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {candidate.currentJobTitle || 'Not specified'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {candidate.location?.city ? `${candidate.location.city}, ${candidate.location.country || ''}` : 'Not specified'}
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
                      <Link to={`/admin/candidates/${candidate._id}`} className="text-blue-600 hover:text-blue-900">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No recent candidates found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;