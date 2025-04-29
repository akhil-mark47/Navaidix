import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-1">Navaidix Solutions</h3>
            <h6 className="text-lg font-semibold mb-2">Private Limited</h6>
            <p className="text-white/80">
              Connecting talent with opportunity across the globe.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-secondary">Home</Link></li>
              <li><Link to="/job-search" className="hover:text-secondary">Job Search</Link></li>
              <li><Link to="/job-application" className="hover:text-secondary">Job Application</Link></li>
              <li><Link to="/signin" className="hover:text-secondary">Sign In</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-white/80">
              <li>contact@navaidix.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Business Ave, Suite 100</li>
              <li>New York, NY 10001</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-secondary">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-secondary">
                <FaFacebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Navaidix Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer