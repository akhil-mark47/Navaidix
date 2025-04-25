import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="section bg-lightgray">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6">About Us</h2>
            <p className="text-gray-600 mb-4">
              With over a decade of experience in global recruitment, we connect talented
              professionals with leading organizations across the world. Our expertise spans
              multiple industries and regions, ensuring the perfect match for both candidates
              and employers.
            </p>
            <p className="text-gray-600 mb-6">
              We pride ourselves on our personalized approach, industry expertise, and
              commitment to excellence in every placement we make.
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-2xl font-bold text-primary">500+</h4>
                <p className="text-sm">Companies Served</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="text-2xl font-bold text-primary">10k+</h4>
                <p className="text-sm">Successful Placements</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Team meeting"
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About