import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Star, Shield } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface Partner {
  id: string
  name: string
  logo_url: string
  website_url?: string
  order_index: number
  active: boolean
}

const defaultPartners = [
  {
    id: '1',
    name: 'Vitra',
    logo_url: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=200&h=100',
    website_url: 'https://vitra.com.tr',
    order_index: 1,
    active: true
  },
  {
    id: '2',
    name: 'Artema',
    logo_url: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200&h=100',
    website_url: 'https://artema.com.tr',
    order_index: 2,
    active: true
  },
  {
    id: '3',
    name: 'Grohe',
    logo_url: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=200&h=100',
    website_url: 'https://grohe.com',
    order_index: 3,
    active: true
  },
  {
    id: '4',
    name: 'Hansgrohe',
    logo_url: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=200&h=100',
    website_url: 'https://hansgrohe.com',
    order_index: 4,
    active: true
  },
  {
    id: '5',
    name: 'Duravit',
    logo_url: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=200&h=100',
    website_url: 'https://duravit.com',
    order_index: 5,
    active: true
  },
  {
    id: '6',
    name: 'Villeroy & Boch',
    logo_url: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=200&h=100',
    website_url: 'https://villeroy-boch.com',
    order_index: 6,
    active: true
  }
]

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>(defaultPartners)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('active', true)
        .order('order_index')

      if (error) {
        console.error('Error fetching partners:', error)
        setPartners(defaultPartners)
      } else if (data && data.length > 0) {
        setPartners(data)
      } else {
        setPartners(defaultPartners)
      }
    } catch (error) {
      console.error('Error:', error)
      setPartners(defaultPartners)
    } finally {
      setLoading(false)
    }
  }

  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners, ...partners]

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-[#ECF0F1] to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-300 rounded-2xl w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded-xl w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="flex space-x-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-40 h-20 bg-gray-300 rounded-2xl animate-pulse flex-shrink-0"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-[#ECF0F1] to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-[#E67E22]/5 to-[#F39C12]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-[#3B82F6]/5 to-[#1D4ED8]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#E67E22] to-[#F39C12] rounded-full text-white text-sm font-semibold mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Güvenilir Partnerlerimiz
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-[#2C3E50] mb-4">
            <span className="bg-gradient-to-r from-[#2C3E50] via-[#34495E] to-[#2C3E50] bg-clip-text text-transparent">
              Dünya Markalarıyla
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#E67E22] to-[#F39C12] bg-clip-text text-transparent">
              Kaliteli Hizmet
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            27 yıldır dünya çapında tanınan markaların ürünlerini müşterilerimizle buluşturuyoruz.
  
          </p>
        </motion.div>

        {/* Infinite Scrolling Partners */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent z-10"></div>
          
          <div className="overflow-hidden">
            <motion.div
              className="flex space-x-12"
              animate={{
                x: [0, -1920] // Adjust based on total width
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <motion.div
                  key={`${partner.id}-${index}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="group flex-shrink-0 w-48 h-24 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 flex items-center justify-center p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative w-full h-full">
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100' viewBox='0 0 200 100'%3E%3Crect width='200' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3E${partner.name}%3C/text%3E%3C/svg%3E`
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#E67E22]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end justify-center pb-2">
                      <span className="text-white text-sm font-bold">{partner.name}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {[
            {
              icon: Award,
              title: 'Yetkili Teknik Servis',
              description: 'Tüm markaların Teknik Bilgsine Sahibiz',
              color: 'from-[#E67E22] to-[#F39C12]'
            },
            {
              icon: Shield,
              title: 'Garanti Güvencesi',
              description: 'Tüm ürünlerde resmi garanti sağlıyoruz',
              color: 'from-[#3B82F6] to-[#1D4ED8]'
            },
            {
              icon: Star,
              title: 'Premium Kalite',
              description: 'Sadece A+ kalite ürünlerle çalışıyoruz',
              color: 'from-[#8B5CF6] to-[#7C3AED]'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group text-center"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2C3E50] mb-2 group-hover:text-[#E67E22] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Partners