import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Import pages
import LandingPage from './pages/dashboard/LandingPage'
import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import Dashboard from './pages/dashboard/Dashboard'
import JobSearchPage from './pages/jobs/JobSearchPage'
import JobApplicationPage from './pages/jobs/JobApplicationPage'
import Profile from './pages/Profile'
import Navbar from './components/ui/Navbar'
import Footer from './components/ui/Footer'
import ProtectedRoute from './context/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Messages from './pages/auth/Messages'
import SavedJobs from './pages/dashboard/SavedJobs'
import Applications from './pages/dashboard/Applications'

// Admin pages
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import CandidatesList from './pages/admin/CandidatesList'
import AddCandidate from './pages/admin/AddCandidate'
import EditCandidate from './pages/admin/EditCandidate'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          {/* Navbar */}
          <Navbar isScrolled={isScrolled} />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/job-search" element={<JobSearchPage />} />
            <Route path="/job-application" element={<JobApplicationPage />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
      
            <Route path="/applications" element={<Applications />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/messages" element={<Messages />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/candidates" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <CandidatesList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/candidates/add" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AddCandidate />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/candidates/edit/:id" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <EditCandidate />
                </ProtectedRoute>
              } 
            />
          </Routes>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App