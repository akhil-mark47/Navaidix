import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Tech Corp',
      text: 'StaffPro helped me find my dream job in Silicon Valley. Their team was professional and supportive throughout the process.',
    },
    {
      name: 'Michael Chen',
      role: 'HR Director',
      company: 'Global Solutions',
      text: 'Working with StaffPro has transformed our hiring process. They consistently deliver top talent that fits our company culture.',
    },
    {
      name: 'Emma Williams',
      role: 'Marketing Manager',
      company: 'Creative Agency',
      text: 'The personalized approach and attention to detail sets StaffPro apart. They truly understand both candidate and company needs.',
    },
  ]

  return (
    <section className="section bg-primary text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What People Say</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <p className="mb-4 text-white/90">{testimonial.text}</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-white/70">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Testimonials