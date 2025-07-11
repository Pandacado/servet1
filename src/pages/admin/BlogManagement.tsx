import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit3, Trash2, Eye, Calendar, User, Search, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { BlogPost } from '../../types'

const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tümü')

  const categories = ['Tümü', 'Dekorasyon', 'Tadilat', 'Bakım', 'Tasarım', 'Ürünler', 'Aydınlatma']

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id: number) => {
    if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) return

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (error) throw error
      setPosts(posts.filter(post => post.id !== id))
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const togglePublished = async (id: number, published: boolean) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ published: !published })
        .eq('id', id)

      if (error) throw error
      setPosts(posts.map(post => 
        post.id === id ? { ...post, published: !published } : post
      ))
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Tümü' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-64"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-black text-[#2C3E50] mb-2">
              Blog Yazıları
            </h1>
            <p className="text-gray-600 text-lg">
              Blog yazılarını oluşturun, düzenleyin ve yönetin
            </p>
          </div>
          <Link
            to="/admin/blog/new"
            className="flex items-center px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm lg:text-base"
          >
            <Plus className="w-5 h-5 mr-2" />
            Yeni Blog Yazısı
          </Link>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Blog yazısı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              {/* Status Badge */}
              <div className="p-4 pb-0">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  post.published 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {post.published ? 'Yayında' : 'Taslak'}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white text-xs font-bold rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(post.created_at)}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#2C3E50] mb-3 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {post.author}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <Link
                      to={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-2 text-gray-600 hover:text-[#3B82F6] hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="Görüntüle"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      to={`/admin/blog/edit/${post.id}`}
                      className="p-2 text-gray-600 hover:text-[#E67E22] hover:bg-orange-50 rounded-lg transition-all duration-200"
                      title="Düzenle"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => togglePublished(post.id, post.published)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      post.published
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {post.published ? 'Gizle' : 'Yayınla'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">Blog yazısı bulunamadı</h3>
            <p className="text-gray-500 mb-6">Arama kriterlerinizi değiştirin veya yeni bir blog yazısı oluşturun.</p>
            <Link
              to="/admin/blog/new"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              İlk Blog Yazınızı Oluşturun
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogManagement