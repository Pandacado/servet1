import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bath, Palette, Wrench, ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { Service } from '../../types'

const defaultServices = [
  {
    id: 1,
    title: 'Banyo Tadilatı',
    description: 'Modern ve fonksiyonel banyo tasarımları ile hayalinizdeki banyoyu gerçeğe dönüştürüyoruz.',
    icon: 'Bath',
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Dekorasyon',
    description: 'Yaşam alanlarınızı estetik ve kullanışlı dekorasyon çözümleriyle yeniliyoruz.',
    icon: 'Palette',
    order_index: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Sıhhi Tesisat',
    description: 'Profesyonel sıhhi tesisat hizmetleri ile su ve ısıtma sistemlerinizi güvence altına alıyoruz.',
    icon: 'Wrench',
    order_index: 3,
    created_at: new Date().toISOString()
  }
]

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Bath':
      return Bath
    case 'Palette':
      return Palette
    case 'Wrench':
      return Wrench
    default:
      return Bath
  }
}

const Services = () => {
  const [services, setServices] = useState<Service[]>(defaultServices)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index')

      if (error) {
        console.error('Error fetching services:', error)
        setServices(defaultServices)
      } else if (data && data.length > 0) {
        setServices(data)
      } else {
        setServices(defaultServices)
      }
    } catch (error) {
      console.error('Error:', error)
      setServices(defaultServices)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-32 bg-[#ECF0F1] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="h-12 bg-gray-300 rounded-2xl w-80 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded-xl w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl animate-pulse">
                <div className="w-20 h-20 bg-gray-300 rounded-2xl mx-auto mb-8"></div>
                <div className="h-8 bg-gray-300 rounded-xl w-40 mx-auto mb-6"></div>
                <div className="h-4 bg-gray-300 rounded-lg w-full mb-3"></div>
                <div className="h-4 bg-gray-300 rounded-lg w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 bg-[#ECF0F1] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#E67E22]/10 to-[#F39C12]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-[#3B82F6]/10 to-[#1D4ED8]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#E67E22] to-[#F39C12] rounded-full text-white text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Uzman Hizmetlerimiz
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-[#2C3E50] mb-6">
            <span className="bg-gradient-to-r from-[#2C3E50] via-[#34495E] to-[#2C3E50] bg-clip-text text-transparent">
              Hizmetlerimiz
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Uzman ekibimizle banyo tadilat, dekorasyon ve sıhhi tesisat alanlarında 
            <span className="text-[#E67E22] font-semibold"> kaliteli ve güvenilir hizmet</span> sunuyoruz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = getIcon(service.icon)
            const gradients = [
              'from-[#E67E22] to-[#F39C12]',
              'from-[#3B82F6] to-[#1D4ED8]',
              'from-[#8B5CF6] to-[#7C3AED]'
            ]
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl scale-110`}></div>
                
                <div className="relative bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-500">
                  {/* Icon */}
                  <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${gradients[index]} rounded-2xl mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-black text-[#2C3E50] text-center mb-6 group-hover:text-[#E67E22] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed text-lg">
                    {service.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/hizmetler"
            className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#2C3E50] to-[#34495E] text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-[#2C3E50]/25 transition-all duration-500 transform hover:scale-105"
          >
            <span>Tüm Hizmetlerimiz</span>
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Services