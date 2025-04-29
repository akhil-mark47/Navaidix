import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FaUsers, FaGlobeAmericas, FaGlobeAsia, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

const LandingPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    // Animation entrance
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // About section data
  const aboutData = {
    description: [
      "A dynamic startup with a fresh approach to global recruitment.",
      "Connects talented professionals with innovative organizations worldwide.",
      "Offers a personalized approach, leveraging industry expertise to ensure the perfect match for both candidates and employers."
    ],
    achievements: [
      { count: "50+", label: "Companies Served" },
      { count: "1k+", label: "Successful Placements" }
    ]
  };

  // Recruiting services data
  const recruitingServices = [
    {
      id: "domestic",
      title: "Domestic Recruiting",
      icon: <FaUsers className="h-12 w-12" />,
      description: "A startup connecting local talent with leading organizations through an extensive network and industry expertise.",
      features: [
        "Local Talent Network: Access to a growing network of pre-screened local professionals across various industries.",
        "Industry Expertise: Specialized recruiters with a deep understanding of local market dynamics and industry requirements.",
        "Personalized Service: Tailored recruitment solutions meeting specific needs of both candidates and employers.",
        "Market Insights: Regular updates on local job market trends, salary benchmarks, and industry developments."
      ],
      benefits: [
        "Growing local network of qualified candidates.",
        "Deep understanding of regional market dynamics.",
        "Customized recruitment strategies.",
        "Comprehensive candidate screening process.",
        "Ongoing support throughout the hiring process."
      ],
      link: "/domestic-recruiting"
    },
    {
      id: "us",
      title: "US Recruiting",
      icon: <FaGlobeAmericas className="h-12 w-12" />,
      description: "A startup specializing in connecting global talent with leading US organizations through innovative recruitment solutions.",
      features: [
        "US Market Expertise: Deep understanding of US job market trends and business culture.",
        "Coast-to-Coast Coverage: Recruitment services across major US cities and regions.",
        "Executive Search: Specialized placement services for senior and executive-level positions.",
        "Visa Support: Assistance with work authorization and visa requirements for international candidates."
      ],
      benefits: [
        "Access to top US startups and opportunities.",
        "Understanding of US work culture and expectations.",
        "Expertise in US employment laws and regulations.",
        "Strong network across major US tech hubs.",
        "Support with relocation and visa processes."
      ],
      link: "/us-recruiting"
    },
    {
      id: "apac",
      title: "APAC Recruiting",
      icon: <FaGlobeAsia className="h-12 w-12" />,
      description: "A startup bridging talent across the Asia-Pacific region with innovative recruitment solutions.",
      features: [
        "APAC Coverage: Extensive network across major APAC markets including Singapore, Japan, Australia, and more.",
        "Cultural Expertise: Deep understanding of diverse APAC business cultures and practices.",
        "Multilingual Support: Recruitment services in multiple Asian languages for better communication.",
        "Regional Network: Strong connections with leading APAC startups and organizations."
      ],
      benefits: [
        "Presence in major APAC business hubs.",
        "Understanding of local business practices.",
        "Multilingual recruitment teams.",
        "Cross-border placement expertise.",
        "Cultural integration support."
      ],
      link: "/apac-recruiting"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-[0.03]"></div>
      </div>

      {/* Hero Section with parallax effect */}
      <main className="pt-28 md:pt-40 pb-20 px-4 md:px-8 relative bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                <span className="gradient-text">Discover</span> Your Next 
                <span className="relative">
                  <span className="text-primary"> Career</span>
                  <svg className="absolute -bottom-3 left-0 w-full h-3 text-secondary/30" viewBox="0 0 200 8" preserveAspectRatio="none">
                    <path d="M0,5 C50,0 150,0 200,5 L200,8 L0,8 Z" fill="currentColor"></path>
                  </svg>
                </span> 
                <span className="block mt-2">Opportunity</span>
              </h1>
              
              <p className="text-slate-600 text-lg md:text-xl opacity-90 max-w-xl mx-auto md:mx-0">
                Your trusted partner for job search, recruitment, and career growth. Connect with top employers and take your professional journey to new heights.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-8">
                <Link to="/signup">
                  <button className="btn-primary w-full sm:w-auto group">
                    Get Started
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline-block transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>
                <Link to="/job-search">
                  <button className="btn-outline w-full sm:w-auto">
                    Browse Jobs
                  </button>
                </Link>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-4 pt-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white flex items-center justify-center text-[10px] text-white font-medium">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-600">
                  Joined by <span className="font-semibold">2,000+</span> professionals
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative">
              <div className="relative h-[300px] md:h-[500px] w-full md:max-w-md mx-auto">
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl transform rotate-3 scale-95"></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="h-12 bg-slate-100 flex items-center px-4 border-b border-slate-200">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-rose-400"></div>
                      <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="animate-pulse h-6 w-3/4 bg-slate-200 rounded mb-4"></div>
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4, 6, 7, 8].map(i => (
                        <div key={i} className="bg-slate-100 rounded-lg p-3 h-24 flex flex-col justify-between">
                          <div className="h-2 bg-slate-200 rounded w-2/3"></div>
                          <div className="space-y-1">
                            <div className="h-2 bg-slate-200 rounded"></div>
                            <div className="h-2 bg-slate-200 rounded w-4/5"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Animated wave separator */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39 116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white"></path>
          </svg>
        </div>
      </main>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Navaidix</h2>
            <div className="h-1 w-24 bg-secondary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                    alt="Team meeting"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-primary/10 rounded-lg z-[-1]"></div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4">Who We Are</h3>
              <div className="space-y-4">
                {aboutData.description.map((text, index) => (
                  <p key={index} className="text-slate-600">{text}</p>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                {aboutData.achievements.map((item, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-lg shadow-sm">
                    <h4 className="text-2xl font-bold text-primary">{item.count}</h4>
                    <p className="text-sm text-slate-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Recruiting Services</h2>
            <div className="h-1 w-24 bg-secondary mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-slate-600">
              We offer specialized recruitment solutions tailored to different markets, helping you find the perfect opportunity wherever your career takes you.
            </p>
          </div>
          
          
          
          {/* Detailed Services */}
          {recruitingServices.map((service) => (
            <div key={service.id} id={service.id} className="mt-16 pt-16 border-t border-slate-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={`${service.id === "us" || service.id === "apac" ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 text-primary">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-6">{service.description}</p>
                  
                  <h4 className="font-semibold mb-4">Features:</h4>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex gap-3">
                        <svg className="h-6 w-6 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="font-semibold mb-4">Why Choose Our {service.title}:</h4>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex gap-3">
                        <svg className="h-6 w-6 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-slate-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="relative">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                      <img
                        src={`https://images.pexels.com/photos/${
                          service.id === "domestic" ? "3184325" : service.id === "us" ? "1181605" : "3184292"
                        }/pexels-photo-${
                          service.id === "domestic" ? "3184325" : service.id === "us" ? "1181605" : "3184292"
                        }.jpeg`}
                        alt={service.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className={`absolute -bottom-5 ${service.id === "us" || service.id === "apac" ? "-left-5" : "-right-5"} h-24 w-24 bg-secondary/10 rounded-lg z-[-1]`}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Added custom styles for animations and background elements */}
      <style jsx>{`
        .bg-grid {
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .floating-shape {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to));
          opacity: 0.15;
          filter: blur(80px);
        }
        
        .shape-1 {
          width: 400px;
          height: 400px;
          left: -100px;
          top: 20%;
          --tw-gradient-from: #0284c7;
          --tw-gradient-to: #7dd3fc;
          animation: float 20s ease-in-out infinite;
        }
        
        .shape-2 {
          width: 300px;
          height: 300px;
          right: -80px;
          top: 10%;
          --tw-gradient-from: #6366f1;
          --tw-gradient-to: #a5b4fc;
          animation: float 25s ease-in-out infinite reverse;
        }
        
        .shape-3 {
          width: 250px;
          height: 250px;
          left: 40%;
          bottom: 10%;
          --tw-gradient-from: #06b6d4;
          --tw-gradient-to: #67e8f9;
          animation: float 18s ease-in-out infinite;
        }
        
        .shape-4 {
          width: 200px;
          height: 200px;
          left: 20%;
          top: 60%;
          --tw-gradient-from: #8b5cf6;
          --tw-gradient-to: #c4b5fd;
          animation: float 22s ease-in-out infinite reverse;
        }
        
        .shape-5 {
          width: 350px;
          height: 350px;
          right: 20%;
          bottom: 30%;
          --tw-gradient-from: #0ea5e9;
          --tw-gradient-to: #7dd3fc;
          animation: float 28s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(-40px, 20px) scale(1.05);
          }
          50% {
            transform: translate(20px, 40px) scale(0.95);
          }
          75% {
            transform: translate(30px, -20px) scale(1.02);
          }
        }
      // `}</style>*/
    </div> 
  );
};

export default LandingPage;
