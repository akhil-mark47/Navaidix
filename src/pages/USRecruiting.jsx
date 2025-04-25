import { motion } from 'framer-motion'
import { FaFlag, FaBriefcase, FaUserTie, FaGlobe } from 'react-icons/fa'

const USRecruiting = () => {
  const features = [
    {
      icon: <FaFlag />,
      title: 'US Market Expertise',
      description: 'Deep understanding of US job market, regulations, and business culture.'
    },
    {
      icon: <FaBriefcase />,
      title: 'Coast-to-Coast Coverage',
      description: 'Comprehensive recruitment services across all major US cities and regions.'
    },
    {
      icon: <FaUserTie />,
      title: 'Executive Search',
      description: 'Specialized placement services for senior and executive-level positions.'
    },
    {
      icon: <FaGlobe />,
      title: 'Visa Support',
      description: 'Guidance on work authorization and visa requirements for international candidates.'
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
        className="relative bg-gradient-to-r from-primary via-primary/90 to-secondary/80 text-white py-32 overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000')] bg-cover bg-center"
        />
        <div className="container mx-auto px-4 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            US Recruiting <br />Solutions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl max-w-2xl font-light"
          >
            Connecting global talent with leading US organizations through strategic recruitment solutions.
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
              <h2 className="text-4xl font-bold mb-8 text-primary">US Market Specialists</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Our US recruitment team brings extensive experience in placing talent across various industries in the American market. We understand the unique challenges and opportunities of the US job market and provide comprehensive support throughout the recruitment process.
              </p>
              <ul className="space-y-4">
                {[
                  'Access to top US companies and opportunities',
                  'Understanding of US work culture and expectations',
                  'Expertise in US employment laws and regulations',
                  'Strong network across major US tech hubs',
                  'Support with relocation and visa processes'
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
              <div className="absolute -inset-4 bg-gradient-to-r from-secondary to-primary opacity-10 blur-lg rounded-lg" />
              <img
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="US Recruiting"
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
            Our US Services
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

      <section className="py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-8">Expand Your US Presence</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Let us help you navigate the US job market and find exceptional talent
            </p>
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
              Start Your US Journey
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default USRecruiting