import React from 'react'
import Hero from '../components/Home/Hero'
import Services from '../components/Home/Services'
import References from '../components/Home/References'
import BlogPreview from '../components/Home/BlogPreview'
import ContactForm from '../components/Home/ContactForm'
import Partners from '../components/Home/Partners'
import TestimonialsSlider from '../components/Home/TestimonialsSlider'

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <References />
      <BlogPreview />
      <Partners />
            <TestimonialsSlider /> {/* 👈 Yeni eklenen yorum bileşeni */}
      <ContactForm />
    </div>
  )
}

export default Home