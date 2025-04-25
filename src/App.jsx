import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import JobSearch from './components/JobSearch'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Partners from './components/Partners'
import CandidateForm from './components/CandidateForm'
import Footer from './components/Footer'
import DomesticRecruiting from './pages/DomesticRecruiting'
import USRecruiting from './pages/USRecruiting'
import APACRecruiting from './pages/APACRecruiting'

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
    <Router>
      <div className="min-h-screen">
        <Navbar isScrolled={isScrolled} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <JobSearch />
              <Services />
              <About />
              <Partners />
              <Testimonials />
              <CandidateForm />
            </>
          } />
          <Route path="/domestic-recruiting" element={<DomesticRecruiting />} />
          <Route path="/us-recruiting" element={<USRecruiting />} />
          <Route path="/apac-recruiting" element={<APACRecruiting />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App