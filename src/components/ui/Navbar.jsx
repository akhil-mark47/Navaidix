import { useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HiMenu, HiX, HiOutlineUserCircle } from 'react-icons/hi'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'

const Navbar = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, signOut } = useContext(AuthContext)

  // const navLinks = [
  //   { name: 'Home', to: '/' },
  //   { name: 'Job Search', to: '/job-search' },
  // ]

  // Add protected links that only appear when user is authenticated
  const protectedLinks = [
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'Job Search', to: '/job-search' },
    { name: 'Profile', to: '/profile' },
  ]

  const handleSignOut = () => {
    signOut() // This should clear user session in AuthContext
    toast.success('User successfully signed out')
    navigate('/signin') // Redirect to sign in page
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-poppins font-semibold text-primary">
              Navaidix<span className="text-secondary">Solutions</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {/* Public links visible to all users */}
           

              {/* Protected links only visible when authenticated */}
              {isAuthenticated && protectedLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.to}
                    className={`nav-link cursor-pointer ${
                      location.pathname === link.to ? 'text-primary' : 'text-slate-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300 ${
                    location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/signin">
                  <button className="text-slate-600 hover:text-primary transition-colors px-4 py-2 font-medium">
                    Sign In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <HiOutlineUserCircle className="w-7 h-7 text-primary" />
                <span className="text-slate-700 font-medium">
                  Hi, {user?.firstName || user?.name?.split(' ')[0] || 'User'}
                </span>
                <button
                  onClick={handleSignOut}
                  className="bg-secondary text-white px-3 py-1 rounded hover:bg-accent transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white rounded-lg shadow-sm mt-2">
              {/* Public mobile links */}
             

              {/* Protected mobile links */}
              {isAuthenticated && protectedLinks.map((link) => (
                <div key={link.name} onClick={() => setIsOpen(false)} className="py-2">
                  <Link
                    to={link.to}
                    className={`block px-4 py-2 rounded-md ${
                      location.pathname === link.to
                        ? 'text-primary font-medium'
                        : 'text-slate-600 hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
              
              <div className="border-t border-gray-200 my-2 pt-2">
                {!isAuthenticated ? (
                  <>
                    <Link to="/signin" onClick={() => setIsOpen(false)}>
                      <div className="block px-4 py-2 text-slate-600 hover:text-primary">
                        Sign In
                      </div>
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <div className="block px-4 py-2 text-slate-600 hover:text-primary">
                        Sign Up
                      </div>
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center px-4 py-2 space-x-2">
                    <HiOutlineUserCircle className="w-6 h-6 text-primary" />
                    <span className="text-slate-700 font-medium">
                      Hi, {user?.firstName || user?.name?.split(' ')[0] || 'User'}
                    </span>
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        handleSignOut()
                      }}
                      className="bg-secondary text-white px-3 py-1 rounded hover:bg-accent transition-colors ml-2"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar