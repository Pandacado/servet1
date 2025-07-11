import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  BarChart3, 
  Users, 
  FileText, 
  Image, 
  Mail, 
  TrendingUp, 
  Calendar,
  Eye,
  MessageSquare,
  Award,
  Plus,
  ArrowRight
} from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'

interface Stats {
  totalServices: number
  totalBlogPosts: number
  totalReferences: number
  totalContacts: number
  recentContacts: any[]
  recentBlogPosts: any[]
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalServices: 0,
    totalBlogPosts: 0,
    totalReferences: 0,
    totalContacts: 0,
    recentContacts: [],
    recentBlogPosts: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [services, blogPosts, references, contacts, recentContacts, recentBlogPosts] = await Promise.all([
        supabase.from('services').select('id', { count: 'exact' }),
        supabase.from('blog_posts').select('id', { count: 'exact' }),
        supabase.from('references').select('id', { count: 'exact' }),
        supabase.from('contacts').select('id', { count: 'exact' }),
        supabase.from('contacts').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }).limit(3)
      ])

      setStats({
        totalServices: services.count || 0,
        totalBlogPosts: blogPosts.count || 0,
        totalReferences: references.count || 0,
        totalContacts: contacts.count || 0,
        recentContacts: recentContacts.data || [],
        recentBlogPosts: recentBlogPosts.data || []
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Toplam Hizmet',
      value: stats.totalServices,
      icon: Award,
      color: 'from-[#E67E22] to-[#F39C12]',
      link: '/admin/services'
    },
    {
      title: 'Blog Yazıları',
      value: stats.totalBlogPosts,
      icon: FileText,
      color: 'from-[#3B82F6] to-[#1D4ED8]',
      link: '/admin/blog'
    },
    {
      title: 'Referanslar',
      value: stats.totalReferences,
      icon: Image,
      color: 'from-[#8B5CF6] to-[#7C3AED]',
      link: '/admin/references'
    },
    {
      title: 'İletişim Formları',
      value: stats.totalContacts,
      icon: Mail,
      color: 'from-[#10B981] to-[#059669]',
      link: '/admin/contacts'
    }
  ]

  const quickActions = [
    {
      title: 'Blog Yazısı Ekle',
      description: 'Yeni blog yazısı oluştur',
      icon: Plus,
      color: 'from-[#3B82F6] to-[#1D4ED8]',
      link: '/admin/blog/new'
    },
    {
      title: 'Proje Referansı',
      description: 'Yeni referans ekle',
      icon: Image,
      color: 'from-[#8B5CF6] to-[#7C3AED]',
      link: '/admin/references/new'
    },
    {
      title: 'Hizmetleri Yönet',
      description: 'Hizmet kartlarını düzenle',
      icon: Award,
      color: 'from-[#E67E22] to-[#F39C12]',
      link: '/admin/services'
    }
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-lg animate-pulse">
                <div className="h-12 bg-gray-300 rounded-2xl mb-4"></div>
                <div className="h-8 bg-gray-300 rounded-xl w-16 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded-lg w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black text-[#2C3E50] mb-2">
            Yönetim Paneli
          </h1>
          <p className="text-gray-600 text-lg">
            Servet Dekorasyon İçerik Yönetim Sistemi
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl scale-110`}></div>
              
              <Link to={card.link}>
                <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 group-hover:shadow-2xl transition-all duration-500">
                  <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-black text-[#2C3E50] mb-1">
                    {card.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {card.title}
                  </div>
                  <ArrowRight className="absolute top-6 right-6 w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-[#E67E22]" />
                Hızlı İşlemler
              </h2>
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={action.link}
                      className="group flex items-center p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-[#2C3E50] group-hover:text-[#E67E22] transition-colors duration-300">
                          {action.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {action.description}
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Recent Contacts */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-[#3B82F6]" />
                Son İletişim Formları
              </h2>
              <div className="space-y-4">
                {stats.recentContacts.slice(0, 3).map((contact, index) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#2C3E50] truncate">
                        {contact.name}
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {contact.email}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {contact.message}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 ml-4 flex-shrink-0">
                      {formatDate(contact.created_at)}
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link
                to="/admin/contacts"
                className="inline-flex items-center mt-6 text-[#3B82F6] font-semibold hover:text-[#1D4ED8] transition-colors duration-300"
              >
                Tümünü Gör
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Recent Blog Posts */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <h2 className="text-2xl font-bold text-[#2C3E50] mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-[#8B5CF6]" />
                Son Blog Yazıları
              </h2>
              <div className="space-y-4">
                {stats.recentBlogPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#2C3E50] truncate">
                        {post.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {post.category} • {post.author}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {post.excerpt}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 ml-4 flex-shrink-0">
                      {formatDate(post.created_at)}
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link
                to="/admin/blog"
                className="inline-flex items-center mt-6 text-[#8B5CF6] font-semibold hover:text-[#7C3AED] transition-colors duration-300"
              >
                Tümünü Gör
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard