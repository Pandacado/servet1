import React, { useEffect, useState } from 'react'
import { Plus, Edit3, Trash2, Eye, Upload, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { Reference } from '../../types'

const ReferencesManagement = () => {
  const [references, setReferences] = useState<Reference[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    fetchReferences()
  }, [])

  const fetchReferences = async () => {
    try {
      const { data, error } = await supabase
        .from('references')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setReferences(data || [])
    } catch (error) {
      console.error('Error fetching references:', error)
    } finally {
      setLoading(false)
    }
  }

  const addReference = async () => {
    try {
      const newReference = {
        title: 'Yeni Referans',
        description: 'Referans açıklaması...',
        image_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
      }

      const { data, error } = await supabase
        .from('references')
        .insert([newReference])
        .select()
        .single()

      if (error) throw error
      setReferences([data, ...references])
      setEditingId(data.id)
    } catch (error) {
      console.error('Error adding reference:', error)
    }
  }

  const updateReference = async (id: number, updates: Partial<Reference>) => {
    try {
      const { error } = await supabase
        .from('references')
        .update(updates)
        .eq('id', id)

      if (error) throw error
      
      setReferences(references.map(ref => 
        ref.id === id ? { ...ref, ...updates } : ref
      ))
    } catch (error) {
      console.error('Error updating reference:', error)
    }
  }

  const deleteReference = async (id: number) => {
    if (!confirm('Bu referansı silmek istediğinizden emin misiniz?')) return

    try {
      const { error } = await supabase
        .from('references')
        .delete()
        .eq('id', id)

      if (error) throw error
      setReferences(references.filter(ref => ref.id !== id))
    } catch (error) {
      console.error('Error deleting reference:', error)
    }
  }

  const filteredReferences = references.filter(ref =>
    ref.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ref.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-300 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-gray-300 rounded-3xl"></div>
              ))}
            </div>
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
              Proje Referansları
            </h1>
            <p className="text-gray-600 text-lg">
              Proje referanslarınızı yönetin ve düzenleyin
            </p>
          </div>
          <button
            onClick={addReference}
            className="flex items-center px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm lg:text-base"
          >
            <Plus className="w-5 h-5 mr-2" />
            Yeni Referans Ekle
          </button>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 mb-8"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Referans ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReferences.map((reference, index) => (
            <motion.div
              key={reference.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={reference.image_url}
                  alt={reference.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
                  }}
                />
                
                {/* Image URL Edit */}
                {editingId === reference.id && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
                    <input
                      type="url"
                      value={reference.image_url}
                      onChange={(e) => updateReference(reference.id, { image_url: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg text-sm"
                      placeholder="Görsel URL'si"
                    />
                  </div>
                )}

                {/* Edit Image Button */}
                <button
                  onClick={() => setEditingId(editingId === reference.id ? null : reference.id)}
                  className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Upload className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {editingId === reference.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={reference.title}
                      onChange={(e) => updateReference(reference.id, { title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                      placeholder="Referans başlığı"
                    />
                    <textarea
                      value={reference.description}
                      onChange={(e) => updateReference(reference.id, { description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent resize-none"
                      placeholder="Referans açıklaması"
                    />
                    <button
                      onClick={() => setEditingId(null)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Kaydet
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-3 line-clamp-2">
                      {reference.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {reference.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingId(reference.id)}
                          className="p-2 text-gray-600 hover:text-[#8B5CF6] hover:bg-purple-50 rounded-lg transition-all duration-200"
                          title="Düzenle"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteReference(reference.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-gray-500">
                        {new Date(reference.created_at).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReferences.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">Referans bulunamadı</h3>
            <p className="text-gray-500 mb-6">Arama kriterlerinizi değiştirin veya yeni bir referans ekleyin.</p>
            <button
              onClick={addReference}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              İlk Referansınızı Ekleyin
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReferencesManagement