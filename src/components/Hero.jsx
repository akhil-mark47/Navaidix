import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center gradient-bg">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Career Journey Starts Here
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Connect with top employers and opportunities across Domestic, US, and APAC markets
          </p>
          <div className="flex justify-center gap-4">
            <button className="btn-primary">Find Jobs</button>
            <button className="btn-primary bg-white text-secondary">
              Hire Talent
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero