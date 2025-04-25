import { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { HiMenu, HiX } from 'react-icons/hi'

const Navbar = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const navLinks = [
    { name: 'Home', to: '/', type: 'route' },
    { name: 'About Us', to: 'about', type: 'scroll' },
    { name: 'Services', to: 'services', type: 'scroll' },
    { name: 'Jobs', to: 'jobs', type: 'scroll' },
    { name: 'Contact', to: 'contact', type: 'scroll' },
  ]

  const renderLink = (link) => {
    if (!isHome && link.type === 'scroll') {
      return (
        <RouterLink
          to="/"
          className="nav-link cursor-pointer"
        >
          {link.name}
        </RouterLink>
      )
    }

    if (link.type === 'route') {
      return (
        <RouterLink
          to={link.to}
          className="nav-link cursor-pointer"
        >
          {link.name}
        </RouterLink>
      )
    }

    return (
      <ScrollLink
        to={link.to}
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        className="nav-link cursor-pointer"
      >
        {link.name}
      </ScrollLink>
    )
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <RouterLink to="/" className="text-2xl font-montserrat font-bold text-primary">
              Navaidix Solutions
            </RouterLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {renderLink(link)}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-secondary"
            >
              {isOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <div key={link.name} onClick={() => setIsOpen(false)}>
                  {renderLink(link)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar