import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Calendar, User, ArrowRight, BookOpen, TrendingUp, Search, Filter, Tag, Clock, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { BlogPost } from '../types'

const defaultPosts = [
  {
    id: 1,
    title: 'Modern Banyo Dekorasyon Trendleri 2024',
    content: `<h2>2024 Banyo Tasarım Trendleri</h2>
    <p>Bu yıl banyo dekorasyonunda öne çıkan trendler, minimalist tasarım anlayışı ile fonksiyonelliği birleştiriyor. Modern banyo tasarımında dikkat edilmesi gereken temel unsurlar:</p>
    
    <h3>1. Doğal Malzemeler</h3>
    <p>Ahşap, doğal taş ve seramik malzemeler banyo tasarımında öne çıkıyor. Bu malzemeler hem estetik hem de dayanıklılık açısından tercih ediliyor.</p>
    
    <h3>2. Minimalist Yaklaşım</h3>
    <p>Sade çizgiler, temiz yüzeyler ve işlevsel tasarım 2024'ün en önemli trendi. Gereksiz detaylardan kaçınarak fonksiyonelliği ön plana çıkaran tasarımlar tercih ediliyor.</p>
    
    <h3>3. Akıllı Teknoloji Entegrasyonu</h3>
    <p>Akıllı aynalar, otomatik armatürler ve LED aydınlatma sistemleri modern banyo tasarımının vazgeçilmez unsurları haline geldi.</p>`,
    excerpt: '2024 yılında banyo dekorasyonunda hangi trendler öne çıkıyor? Modern tasarım anlayışı ile fonksiyonelliği birleştiren en yeni yaklaşımları keşfedin.',
    category: 'Dekorasyon',
    author: 'Servet Dekorasyon',
    published_date: new Date().toISOString(),
    slug: 'modern-banyo-dekorasyon-trendleri-2024',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Vitra Ürünleri ile Banyo Yenileme Rehberi',
    content: `<h2>Vitra ile Banyo Yenileme</h2>
    <p>Kaliteli Vitra ürünleri ile banyonuzu nasıl yenileyebilirsiniz? 27 yıllık deneyimimizle size rehberlik ediyoruz.</p>
    
    <h3>Vitra Ürün Avantajları</h3>
    <ul>
    <li>Yüksek kalite ve dayanıklılık</li>
    <li>Modern ve estetik tasarım</li>
    <li>Geniş ürün yelpazesi</li>
    <li>Uzun garanti süresi</li>
    </ul>
    
    <h3>Banyo Yenileme Süreci</h3>
    <p>Profesyonel ekibimizle banyo yenileme sürecinizi adım adım planlıyoruz. Ücretsiz keşif hizmetimizle projenizi değerlendiriyoruz.</p>`,
    excerpt: 'Kaliteli Vitra ürünleri ile banyonuzu nasıl yenileyebilirsiniz? Uzman önerilerimiz ve uygulama detayları.',
    category: 'Tadilat',
    author: 'Servet Dekorasyon',
    published_date: new Date(Date.now() - 86400000).toISOString(),
    slug: 'vitra-urunleri-ile-banyo-yenileme',
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 3,
    title: 'Sıhhi Tesisat Bakım İpuçları',
    content: `<h2>Sıhhi Tesisat Bakımı</h2>
    <p>Evinizin sıhhi tesisat sistemlerini nasıl bakımda tutabilirsiniz? Uzmanlarımızdan pratik öneriler.</p>
    
    <h3>Düzenli Kontroller</h3>
    <p>Sıhhi tesisat sistemlerinizi düzenli olarak kontrol etmek büyük sorunları önler. Aylık kontrol listesi:</p>
    
    <ul>
    <li>Su kaçağı kontrolü</li>
    <li>Armatür temizliği</li>
    <li>Sifon kontrolü</li>
    <li>Su basıncı ölçümü</li>
    </ul>`,
    excerpt: 'Evinizin sıhhi tesisat sistemlerini nasıl bakımda tutabilirsiniz? Uzmanlarımızdan pratik öneriler.',
    category: 'Bakım',
    author: 'Servet Dekorasyon',
    published_date: new Date(Date.now() - 172800000).toISOString(),
    slug: 'sihhi-tesisat-bakim-ipuclari',
    created_at: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: 4,
    title: 'Küçük Banyolar İçin Büyük Fikirler',
    content: `<h2>Küçük Banyo Tasarımı</h2>
    <p>Küçük banyolarda alan kullanımını optimize etmek için yaratıcı çözümler.</p>`,
    excerpt: 'Küçük banyolarda alan kullanımını optimize etmek için yaratıcı çözümler ve pratik öneriler.',
    category: 'Tasarım',
    author: 'Servet Dekorasyon',
    published_date: new Date(Date.now() - 259200000).toISOString(),
    slug: 'kucuk-banyolar-icin-buyuk-fikirler',
    created_at: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: 5,
    title: 'Artema Armatürleri ile Lüks Dokunuş',
    content: `<h2>Artema Armatürleri</h2>
    <p>Artema'nın premium armatürleri ile banyonuza lüks bir dokunuş katın.</p>`,
    excerpt: 'Artema\'nın premium armatürleri ile banyonuza lüks bir dokunuş katın. Kalite ve estetik bir arada.',
    category: 'Ürünler',
    author: 'Servet Dekorasyon',
    published_date: new Date(Date.now() - 345600000).toISOString(),
    slug: 'artema-armaturleri-ile-luks-dokunush',
    created_at: new Date(Date.now() - 345600000).toISOString()
  },
  {
    id: 6,
    title: 'Banyo Aydınlatması Nasıl Olmalı?',
    content: `<h2>Banyo Aydınlatması</h2>
    <p>Doğru aydınlatma ile banyonuzun atmosferini değiştirin.</p>`,
    excerpt: 'Doğru aydınlatma ile banyonuzun atmosferini değiştirin. LED teknolojisi ve tasarım önerileri.',
    category: 'Aydınlatma',
    author: 'Servet Dekorasyon',
    published_date: new Date(Date.now() - 432000000).toISOString(),
    slug: 'banyo-aydinlatmasi-nasil-olmali',
    created_at: new Date(Date.now() - 432000000).toISOString()
  }
]

const categories = ['Tümü', 'Dekorasyon', 'Tadilat', 'Bakım', 'Tasarım', 'Ürünler', 'Aydınlatma']

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>(defaultPosts)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching blog posts:', error)
        setPosts(defaultPosts)
      } else if (data && data.length > 0) {
        setPosts(data)
      } else {
        setPosts(defaultPosts)
      }
    } catch (error) {
      console.error('Error:', error)
      setPosts(defaultPosts)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Tümü' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'dekorasyon':
        return 'from-[#E67E22] to-[#F39C12]'
      case 'tadilat':
        return 'from-[#3B82F6] to-[#1D4ED8]'
      case 'bakım':
        return 'from-[#8B5CF6] to-[#7C3AED]'
      case 'tasarım':
        return 'from-[#10B981] to-[#059669]'
      case 'ürünler':
        return 'from-[#F59E0B] to-[#D97706]'
      case 'aydınlatma':
        return 'from-[#EF4444] to-[#DC2626]'
      default:
        return 'from-[#6B7280] to-[#4B5563]'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#ECF0F1]/30 to-white">
        <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="h-16 bg-gray-600 rounded-3xl w-80 mx-auto mb-8 animate-pulse"></div>
            <div className="h-8 bg-gray-600 rounded-2xl w-96 mx-auto animate-pulse"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl shadow-xl p-8 animate-pulse">
                <div className="h-8 bg-gray-300 rounded-xl w-3/4 mb-6"></div>
                <div className="h-4 bg-gray-300 rounded-lg w-full mb-3"></div>
                <div className="h-4 bg-gray-300 rounded-lg w-2/3 mb-6"></div>
                <div className="flex items-center space-x-4">
                  <div className="h-4 bg-gray-300 rounded-lg w-20"></div>
                  <div className="h-4 bg-gray-300 rounded-lg w-24"></div>
                </div>
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
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#3B82F6] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-[#E67E22] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#8B5CF6] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] rounded-full text-white text-sm font-bold mb-8 shadow-2xl">
              <BookOpen className="w-5 h-5 mr-2" />
              Uzman İçeriklerimiz
            </div>
            <h1 className="text-6xl lg:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Blog Yazılarımız
              </span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Banyo tadilat, dekorasyon ve sıhhi tesisat konularında 
              <span className="text-[#3B82F6] font-bold"> uzman görüşlerimiz</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-12"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Blog yazısı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-300 shadow-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white shadow-lg transform scale-105'
                      : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {currentPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(post.category)} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-xl scale-110`}></div>
                
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6 z-10">
                    <span className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(post.category)} text-white text-sm font-bold rounded-full shadow-lg`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Trending Icon */}
                  <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 pt-16">
                    <h3 className="text-2xl font-black text-[#2C3E50] mb-4 group-hover:text-[#3B82F6] transition-colors duration-300 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] rounded-full flex items-center justify-center mr-3">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{formatDate(post.published_date)}</span>
                      </div>
                    </div>
                    
                    {/* Read More Button */}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group/link inline-flex items-center text-[#3B82F6] font-bold hover:text-[#1D4ED8] transition-colors duration-300"
                    >
                      <span>Devamını Oku</span>
                      <ArrowRight className="ml-2 w-5 h-5 group-hover/link:translate-x-2 transition-transform duration-300" />
                    </Link>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center items-center space-x-4"
            >
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Önceki
              </button>
              
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-12 h-12 rounded-2xl font-bold transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white shadow-lg'
                        : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Sonraki
              </button>
            </motion.div>
          )}

          {filteredPosts.length === 0 && (
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
    </div>
  )
}

export default Blog