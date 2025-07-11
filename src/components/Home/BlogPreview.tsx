import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, BookOpen, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { BlogPost } from '../../types'

const defaultPosts = [
  {
    id: 1,
    title: 'Modern Banyo Dekorasyon Trendleri 2024',
    content: 'Bu yıl banyo dekorasyonunda öne çıkan trendler...',
    excerpt: '2024 yılında banyo dekorasyonunda hangi trendler öne çıkıyor? Modern tasarım anlayışı ile fonksiyonelliği birleştiren en yeni yaklaşımları keşfedin.',
    category: 'Dekorasyon',
    author: 'Servet Dekorasyon',
    published_date: new Date().toISOString(),
    slug: 'modern-banyo-dekorasyon-trendleri-2024',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Vitra Ürünleri ile Banyo Yenileme',
    content: 'Vitra ürünleri ile banyo yenileme süreçleri...',
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
    content: 'Sıhhi tesisat sistemlerinizin bakımı için önemli ipuçları...',
    excerpt: 'Evinizin sıhhi tesisat sistemlerini nasıl bakımda tutabilirsiniz? Uzmanlarımızdan pratik öneriler.',
    category: 'Bakım',
    author: 'Servet Dekorasyon',
    published_date: new Date(Date.now() - 172800000).toISOString(),
    slug: 'sihhi-tesisat-bakim-ipuclari',
    created_at: new Date(Date.now() - 172800000).toISOString()
  }
]

const BlogPreview = () => {
  const [posts, setPosts] = useState<BlogPost[]>(defaultPosts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)

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
      default:
        return 'from-[#6B7280] to-[#4B5563]'
    }
  }

  if (loading) {
    return (
      <section className="py-32 bg-gradient-to-br from-[#ECF0F1] to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="h-12 bg-gray-300 rounded-2xl w-80 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gray-300 rounded-xl w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
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
      </section>
    )
  }

  return (
    <section className="py-32 bg-gradient-to-br from-[#ECF0F1] to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#3B82F6]/5 to-[#1D4ED8]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#E67E22]/5 to-[#F39C12]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] rounded-full text-white text-sm font-semibold mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Uzman İçeriklerimiz
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-[#2C3E50] mb-6">
            <span className="bg-gradient-to-r from-[#2C3E50] via-[#34495E] to-[#2C3E50] bg-clip-text text-transparent">
              Blog Yazılarımız
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Banyo tadilat, dekorasyon ve sıhhi tesisat konularında 
            <span className="text-[#3B82F6] font-semibold"> uzman görüşlerimiz</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
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
                  <h3 className="text-2xl font-black text-[#2C3E50] mb-4 group-hover:text-[#E67E22] transition-colors duration-300 line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#E67E22] to-[#F39C12] rounded-full flex items-center justify-center mr-3">
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
                    className="group/link inline-flex items-center text-[#E67E22] font-bold hover:text-[#D35400] transition-colors duration-300"
                  >
                    <span>Devamını Oku</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover/link:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E67E22] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/blog"
            className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-[#3B82F6]/25 transition-all duration-500 transform hover:scale-105"
          >
            <span>Tüm Blog Yazıları</span>
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default BlogPreview