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
          </Routes>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App