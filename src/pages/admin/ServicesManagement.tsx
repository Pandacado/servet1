import React, { useEffect, useState } from 'react'
import { Plus, Edit3, Trash2, Save, X, GripVertical } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import { Service } from '../../types'

const ServicesManagement = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<Service>>({})

  const iconOptions = [
    { value: 'Bath', label: '🛁 Banyo' },
    { value: 'Palette', label: '🎨 Dekorasyon' },
    { value: 'Wrench', label: '🔧 Tesisat' },
    { value: 'Hammer', label: '🔨 Tadilat' },
    { value: 'Lightbulb', label: '💡 Aydınlatma' },
    { value: 'Home', label: '🏠 Ev' },
    { value: 'Settings', label: '⚙️ Ayarlar' },
    { value: 'Star', label: '⭐ Premium' }
  ]

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index')

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const addService = async () => {
    try {
      const newService = {
        title: 'Yeni Hizmet',
        description: 'Hizmet açıklaması...',
        icon: 'Bath',
        order_index: services.length + 1
      }

      const { data, error } = await supabase
        .from('services')
        .insert([newService])
        .select()
        .single()

      if (error) throw error
      setServices([...services, data])
      setEditingId(data.id)
      setEditForm(data)
    } catch (error) {
      console.error('Error adding service:', error)
    }
  }

  const updateService = async () => {
    if (!editingId || !editForm) return

    try {
      const { error } = await supabase
        .from('services')
        .update(editForm)
        .eq('id', editingId)

      if (error) throw error
      
      setServices(services.map(service => 
        service.id === editingId ? { ...service, ...editForm } : service
      ))
      setEditingId(null)
      setEditForm({})
    } catch (error) {
      console.error('Error updating service:', error)
    }
  }

  const deleteService = async (id: number) => {
    if (!confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) return

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)

      if (error) throw error
      setServices(services.filter(service => service.id !== id))
    } catch (error) {
      console.error('Error deleting service:', error)
    }
  }

  const startEdit = (service: Service) => {
    setEditingId(service.id)
    setEditForm(service)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const updateOrder = async (serviceId: number, newOrder: number) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ order_index: newOrder })
        .eq('id', serviceId)

      if (error) throw error
      fetchServices() // Refresh to get updated order
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-black text-[#2C3E50] mb-2">
              Hizmetlerimiz
            </h1>
            <p className="text-gray-600 text-lg">
              Sunduğunuz hizmetleri düzenleyin ve yönetin
            </p>
          </div>
          <button
            onClick={addService}
            className="flex items-center px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-[#E67E22] to-[#F39C12] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm lg:text-base"
          >
            <Plus className="w-5 h-5 mr-2" />
            Yeni Hizmet Ekle
          </button>
        </motion.div>

        {/* Services List */}
        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6"
            >
              {editingId === service.id ? (
                /* Edit Mode */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Hizmet Adı
                      </label>
                      <input
                        type="text"
                        value={editForm.title || ''}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300"
                        placeholder="Hizmet adı"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        İkon
                      </label>
                      <select
                        value={editForm.icon || ''}
                        onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300"
                      >
                        {iconOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Açıklama
                    </label>
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Hizmet açıklaması"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sıralama
                    </label>
                    <input
                      type="number"
                      value={editForm.order_index || 1}
                      onChange={(e) => setEditForm({ ...editForm, order_index: parseInt(e.target.value) })}
                      className="w-32 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300"
                      min="1"
                    />
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={updateService}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      <Save className="w-5 h-5 mr-2" />
                      Kaydet
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center px-6 py-3 bg-gray-500 text-white font-semibold rounded-xl hover:bg-gray-600 transition-all duration-300"
                    >
                      <X className="w-5 h-5 mr-2" />
                      İptal
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-400 cursor-move">
                      <GripVertical className="w-5 h-5" />
                      <span className="text-sm font-medium ml-2">#{service.order_index}</span>
                    </div>
                    
                    <div className="w-16 h-16 bg-gradient-to-br from-[#E67E22] to-[#F39C12] rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">
                        {service.icon === 'Bath' && '🛁'}
                        {service.icon === 'Palette' && '🎨'}
                        {service.icon === 'Wrench' && '🔧'}
                        {service.icon === 'Hammer' && '🔨'}
                        {service.icon === 'Lightbulb' && '💡'}
                        {service.icon === 'Home' && '🏠'}
                        {service.icon === 'Settings' && '⚙️'}
                        {service.icon === 'Star' && '⭐'}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#2C3E50] mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => startEdit(service)}
                      className="p-3 text-gray-600 hover:text-[#E67E22] hover:bg-orange-50 rounded-xl transition-all duration-200"
                      title="Düzenle"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteService(service.id)}
                      className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                      title="Sil"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {services.length === 0 && (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">Henüz hizmet eklenmemiş</h3>
            <p className="text-gray-500 mb-6">İlk hizmetinizi ekleyerek başlayın.</p>
            <button
              onClick={addService}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#E67E22] to-[#F39C12] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              İlk Hizmetinizi Ekleyin
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServicesManagement