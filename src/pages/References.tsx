import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Heart, ZoomIn, Filter, Grid, List, Search, Star, Award, Users } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { Reference } from '../types'

const defaultReferences = [
  {
    id: 1,
    image_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Modern Banyo Tasarımı',
    description: 'Vitra ürünleri ile modern ve şık banyo tasarımı. Minimalist yaklaşım ve fonksiyonel çözümler.',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    image_url: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Lüks Banyo Dekorasyonu',
    description: 'Artema armatürleri ile lüks banyo dekorasyonu. Premium malzemeler ve özel tasarım.',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    image_url: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Kompakt Banyo Çözümü',
    description: 'Küçük alanlarda maksimum verimlilik. Akıllı depolama ve çok fonksiyonlu tasarım.',
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    image_url: 'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Klasik Banyo Tasarımı',
    description: 'Zamansız elegans ve fonksiyonellik. Geleneksel tarzda modern dokunuşlar.',
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    image_url: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Spa Konsepti Banyo',
    description: 'Evde spa deneyimi. Rahatlatıcı atmosfer ve lüks detaylar.',
    created_at: new Date().toISOString()
  },
  {
    id: 6,
    image_url: 'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Endüstriyel Tarz Banyo',
    description: 'Modern endüstriyel tasarım. Ham malzemeler ve çağdaş çizgiler.',
    created_at: new Date().toISOString()
  }
]

const References = () => {
  const [references, setReferences] = useState<Reference[]>(defaultReferences)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedImage, setSelectedImage] = useState<Reference | null>(null)

  useEffect(() => {
    fetchReferences()
  }, [])

  const fetchReferences = async () => {
    try {
      const { data, error } = await supabase
        .from('references')
        .select('*')
        .order('created_at', { ascending: false })

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

  const filteredReferences = references.filter(ref =>
    ref.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ref.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = [
    { icon: Award, value: "500+", label: "Tamamlanan Proje", color: "from-[#E67E22] to-[#F39C12]" },
    { icon: Users, value: "98%", label: "Müşteri Memnuniyeti", color: "from-[#3B82F6] to-[#1D4ED8]" },
    { icon: Star, value: "27", label: "Yıl Deneyim", color: "from-[#8B5CF6] to-[#7C3AED]" }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#ECF0F1]/30 to-white">
        <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="h-16 bg-gray-600 rounded-3xl w-96 mx-auto mb-8 animate-pulse"></div>
            <div className="h-8 bg-gray-600 rounded-2xl w-[600px] mx-auto animate-pulse"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-gray-300 rounded-3xl mb-6"></div>
                <div className="h-8 bg-gray-300 rounded-xl w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded-lg w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded-lg w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#ECF0F1]/30 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#E67E22] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-[#3B82F6] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#8B5CF6] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#E67E22] to-[#F39C12] rounded-full text-white text-sm font-bold mb-8 shadow-2xl">
              <Eye className="w-5 h-5 mr-2" />
              Başarılı Projelerimiz
            </div>
            <h1 className="text-6xl lg:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Referanslarımız
              </span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              27 yıllık deneyimimizle gerçekleştirdiğimiz 
              <span className="text-[#E67E22] font-bold"> 500+ başarılı proje</span>
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Proje ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300 shadow-lg"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-[#E67E22] to-[#F39C12] text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-[#E67E22] to-[#F39C12] text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* References Grid/List */}
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-8'
          }`}>
            {filteredReferences.map((reference, index) => (
              <motion.div
                key={reference.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group cursor-pointer ${
                  viewMode === 'list' ? 'flex gap-8 items-center' : ''
                }`}
                onClick={() => setSelectedImage(reference)}
              >
                <div className={`relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  viewMode === 'list' ? 'w-80 flex-shrink-0' : ''
                }`}>
                  <div className={`${viewMode === 'grid' ? 'aspect-[4/3]' : 'aspect-[16/10]'} overflow-hidden relative`}>
                    <img
                      src={reference.image_url}
                      alt={reference.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    
                    {/* Hover Icons */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {viewMode === 'grid' && (
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-[#E67E22] transition-colors duration-300">
                          {reference.title}
                        </h3>
                        <p className="text-gray-200 leading-relaxed line-clamp-2">
                          {reference.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {viewMode === 'list' && (
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-[#2C3E50] mb-4 group-hover:text-[#E67E22] transition-colors duration-300">
                      {reference.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {reference.description}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredReferences.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">Sonuç bulunamadı</h3>
              <p className="text-gray-500">Arama kriterlerinizi değiştirip tekrar deneyin.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative max-w-4xl w-full"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#E67E22] transition-colors duration-300 text-2xl font-bold"
            >
              ✕
            </button>
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="w-full h-96 object-cover"
              />
              <div className="p-8">
                <h3 className="text-3xl font-bold text-[#2C3E50] mb-4">{selectedImage.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{selectedImage.description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default References