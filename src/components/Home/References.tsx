import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight, Eye, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { Reference } from '../../types'

const defaultReferences = [
  {
    id: 1,
    image_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Modern Banyo Tasarımı',
    description: 'Vitra ürünleri ile modern ve şık banyo tasarımı',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    image_url: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Lüks Banyo Dekorasyonu',
    description: 'Artema armatürleri ile lüks banyo dekorasyonu',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    image_url: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Kompakt Banyo Çözümü',
    description: 'Küçük alanlarda maksimum verimlilik',
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    image_url: 'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Klasik Banyo Tasarımı',
    description: 'Zamansız elegans ve fonksiyonellik',
    created_at: new Date().toISOString()
  }
]

const References = () => {
  const [references, setReferences] = useState<Reference[]>(defaultReferences)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReferences()
  }, [])

  const fetchReferences = async () => {
    try {
      const { data, error } = await supabase
        .from('references')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) {
        console.error('Error fetching references:', error)
        setReferences(defaultReferences)
      } else if (data && data.length > 0) {
        setReferences(data)
      } else {
        setReferences(defaultReferences)
      }
    } catch (error) {
      console.error('Error:', error)
      setReferences(defaultReferences)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(references.length / 3))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(references.length / 3)) % Math.ceil(references.length / 3))
  }

  const getVisibleReferences = () => {
    const startIndex = currentSlide * 3
    return references.slice(startIndex, startIndex + 3)
  }

  if (loading) {
    return (
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="h-12 bg-gray-300 rounded-2xl w-80 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded-xl w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-gray-300 rounded-3xl mb-6"></div>
                <div className="h-8 bg-gray-300 rounded-xl w-40 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded-lg w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-80 h-80 bg-gradient-to-br from-[#8B5CF6]/5 to-[#7C3AED]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-br from-[#E67E22]/5 to-[#F39C12]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full text-white text-sm font-semibold mb-6">
            <Eye className="w-4 h-4 mr-2" />
            Başarılı Projelerimiz
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-[#2C3E50] mb-6">
            <span className="bg-gradient-to-r from-[#2C3E50] via-[#34495E] to-[#2C3E50] bg-clip-text text-transparent">
              Referanslarımız
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Yılların deneyimi ve uzmanlığımızla gerçekleştirdiğimiz 
            <span className="text-[#8B5CF6] font-semibold"> projelerden örnekler</span>
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            >
              {getVisibleReferences().map((reference, index) => (
                <motion.div
                  key={reference.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                    {/* Image Container */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={reference.image_url}
                        alt={reference.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                      
                      {/* Hover Icons */}
                      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#E67E22] transition-colors duration-300">
                        {reference.title}
                      </h3>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        {reference.description}
                      </p>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#E67E22] to-[#F39C12] opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                         style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {references.length > 3 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-center items-center space-x-6 mb-12"
            >
              <button
                onClick={prevSlide}
                className="group p-4 rounded-2xl bg-gradient-to-r from-[#2C3E50] to-[#34495E] text-white hover:shadow-xl transition-all duration-300 transform hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
              </button>
              
              <div className="flex space-x-3">
                {Array.from({ length: Math.ceil(references.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'bg-gradient-to-r from-[#E67E22] to-[#F39C12] scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="group p-4 rounded-2xl bg-gradient-to-r from-[#2C3E50] to-[#34495E] text-white hover:shadow-xl transition-all duration-300 transform hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/referanslar"
            className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-[#8B5CF6]/25 transition-all duration-500 transform hover:scale-105"
          >
            <span>Tüm Referanslar</span>
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default References