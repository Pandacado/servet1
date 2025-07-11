import React, { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [whatsappNumber, setWhatsappNumber] = useState('905551234567')
  const [companyName, setCompanyName] = useState('Servet Dekorasyon')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data } = await supabase
        .from('settings')
        .select('key, value')
        .in('key', ['whatsapp_number', 'company_name'])

      if (data) {
        data.forEach((setting: any) => {
          if (setting.key === 'whatsapp_number') setWhatsappNumber(setting.value)
          if (setting.key === 'company_name') setCompanyName(setting.value)
        })
      }
    } catch (error) {
      console.error('Error fetching WhatsApp settings:', error)
    }
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Merhaba ${companyName}! Web sitenizden geliyorum. Banyo tadilat/dekorasyon hizmetleriniz hakkında bilgi almak istiyorum.`
    )
    const url = `https://wa.me/${whatsappNumber}?text=${message}`
    window.open(url, '_blank')
    setIsOpen(false)
  }

  return (
    <>
      {/* Main WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-30"></div>
          
          {/* Icon */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-7 h-7 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-7 h-7 text-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notification Badge */}
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-white text-xs font-bold">1</span>
          </motion.div>
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ delay: 2 }}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-xl border border-white/50 whitespace-nowrap"
            >
              <div className="text-sm font-semibold text-[#2C3E50]">WhatsApp'tan yazın!</div>
              <div className="text-xs text-gray-600">Hızlı destek için tıklayın</div>
              
              {/* Arrow */}
              <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-white/90 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Expanded Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-80 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] p-4 text-white">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{companyName}</h3>
                  <p className="text-sm text-green-100">Genellikle birkaç dakika içinde yanıtlar</p>
                </div>
              </div>
            </div>

            {/* Chat Content */}
            <div className="p-6 space-y-4">
              {/* Welcome Message */}
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4">
                <p className="text-gray-800 text-sm leading-relaxed">
                  👋 Merhaba! <br />
                  <strong>{companyName}</strong> ekibine hoş geldiniz!
                  <br /><br />
                  🏠 Banyo tadilat ve dekorasyon hizmetlerimiz hakkında bilgi almak için WhatsApp'tan yazabilirsiniz.
                  <br /><br />
                  ⚡ Ücretsiz keşif ve danışmanlık için hemen iletişime geçin!
                </p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <button
                  onClick={openWhatsApp}
                  className="w-full p-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  💬 WhatsApp'ta Sohbet Başlat
                </button>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      const message = encodeURIComponent('Merhaba! Banyo tadilat fiyatları hakkında bilgi almak istiyorum.')
                      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
                      setIsOpen(false)
                    }}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors duration-200"
                  >
                    💰 Fiyat Bilgisi
                  </button>
                  <button
                    onClick={() => {
                      const message = encodeURIComponent('Merhaba! Ücretsiz keşif hizmeti almak istiyorum.')
                      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
                      setIsOpen(false)
                    }}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium text-gray-700 transition-colors duration-200"
                  >
                    🔍 Ücretsiz Keşif
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="text-center pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  📞 Telefon: 0212 555 0123
                  <br />
                  🕒 Pzt-Cum: 08:00-18:00
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default WhatsAppButton