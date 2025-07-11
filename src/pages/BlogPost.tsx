import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, ArrowLeft, Share2, Heart, BookOpen, Clock, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { BlogPost as BlogPostType } from '../types'

const defaultPost: BlogPostType = {
  id: 1,
  title: 'Modern Banyo Dekorasyon Trendleri 2024',
  content: `<h2>2024 Banyo Tasarım Trendleri</h2>
  <p>Bu yıl banyo dekorasyonunda öne çıkan trendler, minimalist tasarım anlayışı ile fonksiyonelliği birleştiriyor. Modern banyo tasarımında dikkat edilmesi gereken temel unsurlar:</p>
  
  <h3>1. Doğal Malzemeler</h3>
  <p>Ahşap, doğal taş ve seramik malzemeler banyo tasarımında öne çıkıyor. Bu malzemeler hem estetik hem de dayanıklılık açısından tercih ediliyor.</p>
  
  <h3>2. Minimalist Yaklaşım</h3>
  <p>Sade çizgiler, temiz yüzeyler ve işlevsel tasarım 2024'ün en önemli trendi. Gereksiz detaylardan kaçınarak fonksiyonelliği ön plana çıkaran tasarımlar tercih ediliyor.</p>
  
  <h3>3. Akıllı Teknoloji Entegrasyonu</h3>
  <p>Akıllı aynalar, otomatik armatürler ve LED aydınlatma sistemleri modern banyo tasarımının vazgeçilmez unsurları haline geldi.</p>
  
  <h3>4. Sürdürülebilir Çözümler</h3>
  <p>Çevre dostu malzemeler ve su tasarrufu sağlayan armatürler 2024'te öne çıkan diğer önemli trendler arasında yer alıyor.</p>
  
  <h3>5. Renk Paleti</h3>
  <p>Doğal tonlar, toprak renkleri ve yumuşak pastel renkler bu yılın favori renk paletini oluşturuyor. Beyaz ve gri tonların yanında, sıcak bej ve krem renkleri de sıkça tercih ediliyor.</p>`,
  excerpt: '2024 yılında banyo dekorasyonunda hangi trendler öne çıkıyor? Modern tasarım anlayışı ile fonksiyonelliği birleştiren en yeni yaklaşımları keşfedin.',
  category: 'Dekorasyon',
  author: 'Servet Dekorasyon',
  published_date: new Date().toISOString(),
  slug: 'modern-banyo-dekorasyon-trendleri-2024',
  created_at: new Date().toISOString()
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([])

  useEffect(() => {
    if (slug) {
      fetchPost(slug)
    }
  }, [slug])

  const fetchPost = async (postSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', postSlug)
        .single()

      if (error || !data) {
        console.error('Error fetching blog post:', error)
        setPost(defaultPost)
      } else {
        setPost(data)
        fetchRelatedPosts(data.category, data.id)
      }
    } catch (error) {
      console.error('Error:', error)
      setPost(defaultPost)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedPosts = async (category: string, currentPostId: number) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', category)
        .neq('id', currentPostId)
        .limit(3)

      if (data && data.length > 0) {
        setRelatedPosts(data)
      }
    } catch (error) {
      console.error('Error fetching related posts:', error)
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

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#ECF0F1]/30 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded-2xl w-3/4 mb-8"></div>
            <div className="h-6 bg-gray-300 rounded-xl w-1/2 mb-12"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-gray-300 rounded-lg w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-[#ECF0F1]/30 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-600 mb-4">Blog yazısı bulunamadı</h1>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Blog'a Dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#ECF0F1]/30 to-white">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#3B82F6] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E67E22] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Button */}
            <Link
              to="/blog"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Blog'a Dön
            </Link>

            {/* Category Badge */}
            <div className="mb-6">
              <span className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${getCategoryColor(post.category)} text-white text-sm font-bold rounded-full shadow-lg`}>
                <Tag className="w-4 h-4 mr-2" />
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{formatDate(post.published_date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{estimateReadingTime(post.content)} dk okuma</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
          >
            {/* Article Content */}
            <div className="p-12">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-[#2C3E50] prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#3B82F6] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#2C3E50] prose-ul:text-gray-700 prose-ol:text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Share Buttons */}
            <div className="border-t border-gray-200 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 font-medium">Bu yazıyı paylaş:</span>
                  <div className="flex space-x-3">
                    <button className="w-12 h-12 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] rounded-2xl flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 transform hover:scale-110">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="w-12 h-12 bg-gradient-to-r from-[#E67E22] to-[#F39C12] rounded-2xl flex items-center justify-center text-white hover:shadow-lg transition-all duration-300 transform hover:scale-110">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  {estimateReadingTime(post.content)} dakika okuma süresi
                </div>
              </div>
            </div>
          </motion.div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-12 text-center">
                İlgili Yazılar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group"
                  >
                    <Link to={`/blog/${relatedPost.slug}`}>
                      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                        <div className="p-6">
                          <div className="mb-4">
                            <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(relatedPost.category)} text-white text-xs font-bold rounded-full`}>
                              {relatedPost.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-[#2C3E50] mb-3 group-hover:text-[#3B82F6] transition-colors duration-300 line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(relatedPost.published_date)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default BlogPost