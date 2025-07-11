import React, { useEffect, useState } from 'react'
import { Mail, Phone, Calendar, Search, Filter, Eye, Trash2, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'

interface Contact {
  id: number
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  project_type?: string
  budget_range?: string
  timeline?: string
  created_at: string
}

const ContactsManagement = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteContact = async (id: number) => {
    if (!confirm('Bu iletişim formunu silmek istediğinizden emin misiniz?')) return

    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id)

      if (error) throw error
      setContacts(contacts.filter(contact => contact.id !== id))
      if (selectedContact?.id === id) {
        setSelectedContact(null)
      }
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  const exportContacts = () => {
    const csvContent = [
      ['Ad Soyad', 'E-posta', 'Telefon', 'Konu', 'Mesaj', 'Tarih'].join(','),
      ...filteredContacts.map(contact => [
        contact.name,
        contact.email,
        contact.phone || '',
        contact.subject || '',
        `"${contact.message.replace(/"/g, '""')}"`,
        new Date(contact.created_at).toLocaleDateString('tr-TR')
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `iletisim-formlari-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
              Müşteri Mesajları
            </h1>
            <p className="text-gray-600 text-lg">
              Gelen iletişim formlarını görüntüleyin ve yönetin
            </p>
          </div>
          <button
            onClick={exportContacts}
            className="flex items-center px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm lg:text-base"
          >
            <Download className="w-5 h-5 mr-2" />
            CSV İndir
          </button>
        </motion.div>

        {/* Search and Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="İletişim formlarında ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Stats */}
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#10B981]">{contacts.length}</div>
                <div className="text-sm text-gray-600">Toplam Form</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#3B82F6]">
                  {contacts.filter(c => new Date(c.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                </div>
                <div className="text-sm text-gray-600">Bu Hafta</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contacts List */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {filteredContacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedContact(contact)}
                  className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 cursor-pointer hover:shadow-xl transition-all duration-300 ${
                    selectedContact?.id === contact.id ? 'ring-2 ring-[#10B981] bg-green-50/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-bold text-[#2C3E50] mr-3">
                          {contact.name}
                        </h3>
                        <span className="px-2 py-1 bg-[#10B981] text-white text-xs font-bold rounded-full">
                          Yeni
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Mail className="w-4 h-4 mr-2" />
                        {contact.email}
                        {contact.phone && (
                          <>
                            <Phone className="w-4 h-4 ml-4 mr-2" />
                            {contact.phone}
                          </>
                        )}
                      </div>

                      <p className="text-gray-700 line-clamp-2 mb-3">
                        {contact.message}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(contact.created_at)}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteContact(contact.id)
                          }}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredContacts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">İletişim formu bulunamadı</h3>
                <p className="text-gray-500">Henüz hiç iletişim formu gelmemiş veya arama kriterlerinize uygun sonuç yok.</p>
              </div>
            )}
          </div>

          {/* Contact Detail */}
          <div className="lg:col-span-1">
            {selectedContact ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 sticky top-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#2C3E50]">İletişim Detayı</h2>
                  <button
                    onClick={() => deleteContact(selectedContact.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Ad Soyad</label>
                    <div className="text-[#2C3E50] font-medium">{selectedContact.name}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">E-posta</label>
                    <div className="text-[#2C3E50]">{selectedContact.email}</div>
                  </div>

                  {selectedContact.phone && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Telefon</label>
                      <div className="text-[#2C3E50]">{selectedContact.phone}</div>
                    </div>
                  )}

                  {selectedContact.subject && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Konu</label>
                      <div className="text-[#2C3E50]">{selectedContact.subject}</div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Mesaj</label>
                    <div className="text-[#2C3E50] bg-gray-50 p-3 rounded-lg leading-relaxed">
                      {selectedContact.message}
                    </div>
                  </div>

                  {selectedContact.project_type && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Proje Türü</label>
                      <div className="text-[#2C3E50]">{selectedContact.project_type}</div>
                    </div>
                  )}

                  {selectedContact.budget_range && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Bütçe Aralığı</label>
                      <div className="text-[#2C3E50]">{selectedContact.budget_range}</div>
                    </div>
                  )}

                  {selectedContact.timeline && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Zaman Çizelgesi</label>
                      <div className="text-[#2C3E50]">{selectedContact.timeline}</div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tarih</label>
                    <div className="text-[#2C3E50]">{formatDate(selectedContact.created_at)}</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <a
                    href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || 'İletişim Formu'}`}
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    E-posta Gönder
                  </a>
                  
                  {selectedContact.phone && (
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Ara
                    </a>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 text-center">
                <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">İletişim Seçin</h3>
                <p className="text-gray-500">Detaylarını görmek için bir iletişim formu seçin.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactsManagement