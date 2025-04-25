import { motion } from 'framer-motion'
import { FaUsers, FaIndustry, FaHandshake, FaChartLine } from 'react-icons/fa'

const DomesticRecruiting = () => {
  const features = [
    {
      icon: <FaUsers />,
      title: 'Local Talent Network',
      description: 'Access to a vast network of pre-screened local professionals across various industries.'
    },
    {
      icon: <FaIndustry />,
      title: 'Industry Expertise',
      description: 'Specialized recruiters with deep understanding of local market dynamics and industry requirements.'
    },
    {
      icon: <FaHandshake />,
      title: 'Personalized Service',
      description: 'Tailored recruitment solutions meeting specific needs of both candidates and employers.'
    },
    {
      icon: <FaChartLine />,
      title: 'Market Insights',
      description: 'Regular updates on local job market trends, salary benchmarks, and industry developments.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="pt-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-32 overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c')] bg-cover bg-center"
        />
        <div className="container mx-auto px-4 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Domestic Recruiting <br />Solutions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl max-w-2xl font-light"
          >
            Connecting local talent with leading organizations through our extensive network and industry expertise.
          </motion.p>
        </div>
      </motion.div>

      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold mb-8 text-primary">Why Choose Our Domestic Recruiting?</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                With years of experience in the local market, we understand the unique challenges and opportunities in domestic recruitment. Our team of expert recruiters combines industry knowledge with local market insights to deliver exceptional results.
              </p>
              <ul className="space-y-4">
                {[
                  'Extensive local network of qualified candidates',
                  'Deep understanding of regional market dynamics',
                  'Customized recruitment strategies',
                  'Comprehensive candidate screening process',
                  'Ongoing support throughout the hiring process'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-center text-gray-700"
                  >
                    <span className="h-2 w-2 bg-secondary rounded-full mr-3" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-10 blur-lg rounded-lg" />
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Domestic Recruiting"
                className="rounded-lg shadow-2xl relative z-10 transform hover:scale-[1.02] transition-transform duration-300"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16"
          >
            Our Services
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-primary text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-8">Ready to Get Started?</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Let us help you find the perfect talent for your organization
            </p>
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-secondary hover:text-white transition-all duration-300 transform hover:scale-105">
              Contact Us Today
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default DomesticRecruiting