import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Save, Upload, Image, Type, AlertCircle, CheckCircle, Plus, Trash2, Edit3, MessageCircle, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'

interface Setting {
  id: string
  key: string
  value: string
  type: string
  description: string
}

interface Partner {
  id: string
  name: string
  logo_url: string
  website_url?: string
  order_index: number
  active: boolean
}

const Settings = () => {
  const [settings, setSettings] = useState<Setting[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [activeTab, setActiveTab] = useState<'general' | 'partners' | 'whatsapp'>('general')
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [uploadingPartner, setUploadingPartner] = useState<string | null>(null)

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [settingsResponse, partnersResponse] = await Promise.all([
        supabase.from('settings').select('*').order('key'),
        supabase.from('partners').select('*').order('order_index')
      ])

      if (settingsResponse.data) {
        setSettings(settingsResponse.data)
        // Form değerlerini ayarla
        settingsResponse.data.forEach(setting => {
          setValue(setting.key, setting.value)
        })
      }
      if (partnersResponse.data) setPartners(partnersResponse.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File, type: 'logo' | 'partner', partnerId?: string) => {
    try {
      if (type === 'logo') setUploadingLogo(true)
      if (type === 'partner' && partnerId) setUploadingPartner(partnerId)

      // Dosya adını oluştur
      const fileExt = file.name.split('.').pop()
      const fileName = `${type}-${Date.now()}.${fileExt}`
      const filePath = `${type}s/${fileName}`

      // Supabase Storage'a yükle
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (error) throw error

      // Public URL al
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error('Upload error:', error)
      setMessage({ type: 'error', text: 'Resim yüklenirken hata oluştu.' })
      return null
    } finally {
      if (type === 'logo') setUploadingLogo(false)
      if (type === 'partner') setUploadingPartner(null)
    }
  }

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const imageUrl = await uploadImage(file, 'logo')
    if (imageUrl) {
      setValue('site_logo', imageUrl)
      setMessage({ type: 'success', text: 'Logo başarıyla yüklendi!' })
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handlePartnerLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>, partnerId: string) => {
    const file = event.target.files?.[0]
    if (!file) return

    const imageUrl = await uploadImage(file, 'partner', partnerId)
    if (imageUrl) {
      await updatePartner(partnerId, { logo_url: imageUrl })
      setMessage({ type: 'success', text: 'Partner logosu başarıyla yüklendi!' })
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const onSubmitSettings = async (data: any) => {
    setSaving(true)
    try {
      const updates = Object.entries(data).map(([key, value]) => ({
        key,
        value: value as string,
        updated_at: new Date().toISOString()
      }))

      for (const update of updates) {
        await supabase
          .from('settings')
          .upsert(update, { onConflict: 'key' })
      }

      setMessage({ type: 'success', text: 'Ayarlar başarıyla güncellendi!' })
      fetchData()
    } catch (error) {
      setMessage({ type: 'error', text: 'Ayarlar güncellenirken hata oluştu.' })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const addPartner = async () => {
    try {
      const newPartner = {
        name: 'Yeni Partner',
        logo_url: 'https://via.placeholder.com/200x100?text=Logo',
        website_url: '',
        order_index: partners.length + 1,
        active: true
      }

      const { data, error } = await supabase
        .from('partners')
        .insert([newPartner])
        .select()
        .single()

      if (error) throw error
      setPartners([...partners, data])
    } catch (error) {
      setMessage({ type: 'error', text: 'Partner eklenirken hata oluştu.' })
    }
  }

  const updatePartner = async (id: string, updates: Partial<Partner>) => {
    try {
      const { error } = await supabase
        .from('partners')
        .update(updates)
        .eq('id', id)

      if (error) throw error
      
      setPartners(partners.map(p => p.id === id ? { ...p, ...updates } : p))
    } catch (error) {
      setMessage({ type: 'error', text: 'Partner güncellenirken hata oluştu.' })
    }
  }

  const deletePartner = async (id: string) => {
    if (!confirm('Bu partneri silmek istediğinizden emin misiniz?')) return

    try {
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setPartners(partners.filter(p => p.id !== id))
      setMessage({ type: 'success', text: 'Partner silindi!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Partner silinirken hata oluştu.' })
    }
  }

  if (loading) {
    return (
      <div className="p-4 lg:p-6">
        <div className="max-w-6xl mx-auto">
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
    <div className="p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 lg:mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-black text-[#2C3E50] mb-2">
            Site Ayarları
          </h1>
          <p className="text-gray-600 text-base lg:text-lg">
            Logo, şirket bilgileri ve partner yönetimi
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-6 lg:mb-8 bg-gray-100 p-1 rounded-2xl w-full overflow-x-auto">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold transition-all duration-300 text-sm lg:text-base whitespace-nowrap ${
              activeTab === 'general'
                ? 'bg-white text-[#2C3E50] shadow-lg'
                : 'text-gray-600 hover:text-[#2C3E50]'
            }`}
          >
            Genel Ayarlar
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold transition-all duration-300 text-sm lg:text-base whitespace-nowrap ${
              activeTab === 'partners'
                ? 'bg-white text-[#2C3E50] shadow-lg'
                : 'text-gray-600 hover:text-[#2C3E50]'
            }`}
          >
            Partner Yönetimi
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-semibold transition-all duration-300 text-sm lg:text-base whitespace-nowrap ${
              activeTab === 'whatsapp'
                ? 'bg-white text-[#2C3E50] shadow-lg'
                : 'text-gray-600 hover:text-[#2C3E50]'
            }`}
          >
            WhatsApp Ayarları
          </button>
        </div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex items-center p-4 rounded-2xl mb-6 ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
            )}
            <p className={`font-medium text-sm lg:text-base ${
              message.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {message.text}
            </p>
          </motion.div>
        )}

        {/* General Settings Tab */}
        {activeTab === 'general' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 lg:p-8"
          >
            <form onSubmit={handleSubmit(onSubmitSettings)} className="space-y-6 lg:space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {settings.map((setting) => (
                  <div key={setting.key} className="space-y-3">
                    <label className="block text-sm font-bold text-[#2C3E50]">
                      {setting.description || setting.key}
                    </label>
                    {setting.type === 'image' ? (
                      <div className="space-y-4">
                        {/* Mevcut Logo Önizleme */}
                        {setting.value && (
                          <div className="w-full max-w-xs border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 p-4">
                            <img
                              src={setting.value}
                              alt="Mevcut Logo"
                              className="w-full h-20 object-contain"
                            />
                          </div>
                        )}
                        
                        {/* URL Input */}
                        <input
                          type="url"
                          {...register(setting.key, { required: 'Bu alan gereklidir' })}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300 text-sm lg:text-base"
                          placeholder="Logo URL'si"
                        />
                        
                        {/* Upload Button */}
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={uploadingLogo}
                          />
                          <button
                            type="button"
                            disabled={uploadingLogo}
                            className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 text-sm lg:text-base"
                          >
                            {uploadingLogo ? (
                              <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Yükleniyor...
                              </>
                            ) : (
                              <>
                                <Upload className="w-5 h-5 mr-2" />
                                Logo Yükle
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <input
                        type="text"
                        {...register(setting.key, { required: 'Bu alan gereklidir' })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300 text-sm lg:text-base"
                      />
                    )}
                    {errors[setting.key] && (
                      <p className="text-red-600 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                        {errors[setting.key]?.message as string}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-[#E67E22] to-[#F39C12] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#E67E22]/25 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 text-sm lg:text-base"
              >
                {saving ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Kaydediliyor...
                  </div>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Ayarları Kaydet
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* WhatsApp Settings Tab */}
        {activeTab === 'whatsapp' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 lg:p-8"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-2xl flex items-center justify-center mr-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-[#2C3E50]">WhatsApp Ayarları</h2>
                <p className="text-gray-600 text-sm lg:text-base">WhatsApp butonu ve mesaj ayarlarını düzenleyin</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmitSettings)} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#2C3E50] mb-3">
                  WhatsApp Telefon Numarası
                </label>
                <input
                  type="tel"
                  {...register('whatsapp_number', { required: 'WhatsApp numarası gereklidir' })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#25D366] focus:border-transparent transition-all duration-300 text-sm lg:text-base"
                  placeholder="905551234567 (ülke kodu ile)"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Ülke kodu ile birlikte yazın (örn: 905551234567)
                </p>
                {errors.whatsapp_number && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.whatsapp_number?.message as string}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2C3E50] mb-3">
                  Varsayılan Mesaj
                </label>
                <textarea
                  {...register('whatsapp_message')}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#25D366] focus:border-transparent transition-all duration-300 resize-none text-sm lg:text-base"
                  placeholder="WhatsApp'ta gönderilecek varsayılan mesaj"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Müşteriler WhatsApp butonuna tıkladığında bu mesaj otomatik olarak yazılacak
                </p>
              </div>

              <div className="bg-[#25D366]/10 border border-[#25D366]/20 rounded-2xl p-4 lg:p-6">
                <h3 className="text-lg font-bold text-[#2C3E50] mb-3">Önizleme</h3>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center mr-3">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#2C3E50] text-sm lg:text-base">WhatsApp</div>
                      <div className="text-xs lg:text-sm text-gray-500">
                        {settings.find(s => s.key === 'whatsapp_number')?.value || '905551234567'}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 text-xs lg:text-sm">
                    {settings.find(s => s.key === 'whatsapp_message')?.value || 'Merhaba! Web sitenizden geliyorum. Banyo tadilat/dekorasyon hizmetleriniz hakkında bilgi almak istiyorum.'}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#25D366]/25 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 text-sm lg:text-base"
              >
                {saving ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Kaydediliyor...
                  </div>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    WhatsApp Ayarlarını Kaydet
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* Partners Tab */}
        {activeTab === 'partners' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Add Partner Button */}
            <div className="flex justify-end">
              <button
                onClick={addPartner}
                className="flex items-center px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm lg:text-base"
              >
                <Plus className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                Yeni Partner Ekle
              </button>
            </div>

            {/* Partners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-4 lg:p-6"
                >
                  <div className="space-y-4">
                    {/* Logo Preview */}
                    <div className="w-full h-20 lg:h-24 border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center relative">
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100' viewBox='0 0 200 100'%3E%3Crect width='200' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3E${partner.name}%3C/text%3E%3C/svg%3E`
                        }}
                      />
                      
                      {/* Upload Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePartnerLogoUpload(e, partner.id)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          disabled={uploadingPartner === partner.id}
                        />
                        {uploadingPartner === partner.id ? (
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        ) : (
                          <Upload className="w-6 h-6 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Partner Name */}
                    <input
                      type="text"
                      value={partner.name}
                      onChange={(e) => updatePartner(partner.id, { name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-sm lg:text-base"
                      placeholder="Partner Adı"
                    />

                    {/* Logo URL */}
                    <input
                      type="url"
                      value={partner.logo_url}
                      onChange={(e) => updatePartner(partner.id, { logo_url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-sm lg:text-base"
                      placeholder="Logo URL"
                    />

                    {/* Website URL */}
                    <input
                      type="url"
                      value={partner.website_url || ''}
                      onChange={(e) => updatePartner(partner.id, { website_url: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E67E22] focus:border-transparent text-sm lg:text-base"
                      placeholder="Website URL (opsiyonel)"
                    />

                    {/* Controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={partner.active}
                          onChange={(e) => updatePartner(partner.id, { active: e.target.checked })}
                          className="w-4 h-4 text-[#E67E22] border-gray-300 rounded focus:ring-[#E67E22]"
                        />
                        <span className="text-sm text-gray-600">Aktif</span>
                      </div>
                      
                      <button
                        onClick={() => deletePartner(partner.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {partners.length === 0 && (
              <div className="text-center py-12 lg:py-20">
                <div className="w-24 lg:w-32 h-24 lg:h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image className="w-12 lg:w-16 h-12 lg:h-16 text-gray-400" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-600 mb-2">Henüz partner eklenmemiş</h3>
                <p className="text-gray-500 mb-6 text-sm lg:text-base">İlk partnerinizi ekleyerek başlayın.</p>
                <button
                  onClick={addPartner}
                  className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 text-sm lg:text-base"
                >
                  <Plus className="w-4 lg:w-5 h-4 lg:h-5 mr-2" />
                  İlk Partnerinizi Ekleyin
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Settings