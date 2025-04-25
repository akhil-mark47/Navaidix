import { motion } from 'framer-motion'
import { FaGlobeAsia, FaHandshake, FaLanguage, FaNetworkWired } from 'react-icons/fa'

const APACRecruiting = () => {
  const features = [
    {
      icon: <FaGlobeAsia />,
      title: 'APAC Coverage',
      description: 'Extensive network across major APAC markets including Singapore, Japan, Australia, and more.'
    },
    {
      icon: <FaHandshake />,
      title: 'Cultural Expertise',
      description: 'Deep understanding of diverse APAC business cultures and practices.'
    },
    {
      icon: <FaLanguage />,
      title: 'Multilingual Support',
      description: 'Recruitment services in multiple Asian languages for better communication.'
    },
    {
      icon: <FaNetworkWired />,
      title: 'Regional Network',
      description: 'Strong connections with leading APAC companies and organizations.'
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
        className="relative bg-gradient-to-r from-secondary/80 via-primary/90 to-primary text-white py-32 overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1')] bg-cover bg-center"
        />
        <div className="container mx-auto px-4 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            APAC Recruiting <br />Solutions
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl max-w-2xl font-light"
          >
            Bridging talent across the Asia-Pacific region with innovative recruitment solutions.
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
              <h2 className="text-4xl font-bold mb-8 text-primary">APAC Market Specialists</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Our APAC recruitment team brings deep expertise in navigating the diverse markets of the Asia-Pacific region. We understand the unique challenges and opportunities in each market and provide tailored solutions for both candidates and employers.
              </p>
              <ul className="space-y-4">
                {[
                  'Presence in major APAC business hubs',
                  'Understanding of local business practices',
                  'Multilingual recruitment teams',
                  'Cross-border placement expertise',
                  'Cultural integration support'
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
                src="https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="APAC Recruiting"
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
            Our APAC Services
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

      <section className="py-24 bg-gradient-to-r from-secondary to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-8">Expand Across APAC</h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Partner with us to access the diverse talent pool across Asia-Pacific
            </p>
            <button className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
              Explore APAC Opportunities
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default APACRecruiting