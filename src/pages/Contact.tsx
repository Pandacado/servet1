import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin, Clock, Shield, Award, Users, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message
          }
        ])

      if (error) {
        throw error
      }

      setSubmitStatus('success')
      reset()
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Telefon',
      value: '0212 555 0123',
      description: '7/24 destek hattımız',
      gradient: 'from-[#E67E22] to-[#F39C12]'
    },
    {
      icon: Mail,
      label: 'E-posta',
      value: 'info@servetdekorasyontadilat.com',
      description: 'Hızlı dönüş garantisi',
      gradient: 'from-[#3B82F6] to-[#1D4ED8]'
    },
    {
      icon: MapPin,
      label: 'Adres',
      value: 'İstanbul, Türkiye',
      description: 'Merkezi lokasyon',
      gradient: 'from-[#8B5CF6] to-[#7C3AED]'
    },
    {
      icon: Clock,
      label: 'Çalışma Saatleri',
      value: 'Pzt-Cum: 08:00-18:00',
      description: 'Esnek randevu sistemi',
      gradient: 'from-[#10B981] to-[#059669]'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Ücretsiz Keşif',
      description: 'Projeleriniz için ücretsiz keşif ve danışmanlık hizmeti',
      gradient: 'from-[#E67E22] to-[#F39C12]'
    },
    {
      icon: Award,
      title: '27 Yıl Deneyim',
      description: 'Sektörde 27 yıllık deneyim ve uzmanlık',
      gradient: 'from-[#3B82F6] to-[#1D4ED8]'
    },
    {
      icon: Users,
      title: 'Uzman Ekip',
      description: 'Alanında uzman ve deneyimli ekibimiz',
      gradient: 'from-[#8B5CF6] to-[#7C3AED]'
    },
    {
      icon: Star,
      title: 'Kalite Garantisi',
      description: 'Vitra & Artema yetkili satıcısı güvencesi',
      gradient: 'from-[#10B981] to-[#059669]'
    }
  ]

  const stats = [
    { value: "500+", label: "Tamamlanan Proje", color: "from-[#E67E22] to-[#F39C12]" },
    { value: "98%", label: "Müşteri Memnuniyeti", color: "from-[#3B82F6] to-[#1D4ED8]" },
    { value: "27", label: "Yıl Deneyim", color: "from-[#8B5CF6] to-[#7C3AED]" },
    { value: "24/7", label: "Destek Hizmeti", color: "from-[#10B981] to-[#059669]" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#ECF0F1]/30 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#E67E22] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-[#3B82F6] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#8B5CF6] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#E67E22] to-[#F39C12] rounded-full text-white text-sm font-bold mb-8 shadow-2xl">
              <Send className="w-5 h-5 mr-2" />
              İletişime Geçin
            </div>
            <h1 className="text-6xl lg:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Ücretsiz Keşif İçin
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#E67E22] to-[#F39C12] bg-clip-text text-transparent">
                İletişime Geçin
              </span>
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              Banyo tadilat, dekorasyon ve sıhhi tesisat projeleriniz için uzman ekibimizden 
              <span className="text-[#E67E22] font-bold"> ücretsiz keşif ve danışmanlık</span> hizmeti alın.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-medium text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative"
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl scale-110`}></div>
                
                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/50 text-center group-hover:shadow-3xl transition-all duration-500">
                  <div className={`w-20 h-20 bg-gradient-to-br ${info.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <info.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{info.label}</h3>
                  <p className="text-lg font-semibold text-gray-800 mb-2">{info.value}</p>
                  <p className="text-sm text-gray-600">{info.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left Side - Features */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-4xl font-black text-[#2C3E50] mb-6">
                  Neden Bizi Tercih Etmelisiniz?
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  27 yıllık deneyimimiz ve uzman ekibimizle projelerinizi en kaliteli şekilde hayata geçiriyoruz.
                </p>
              </div>

              <div className="space-y-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start group"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#2C3E50] mb-2 group-hover:text-[#E67E22] transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Kaliteli banyo tasarımı"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Vitra & Artema Uzmanlığı</h3>
                  <p className="text-gray-200">27 yıllık deneyim ve kalite garantisi</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E67E22]/10 to-[#F39C12]/10 rounded-3xl blur-xl scale-110"></div>
              
              <div className="relative bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-white/50">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-black text-[#2C3E50] mb-4">
                    Ücretsiz Keşif Talep Edin
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Projeniz hakkında detayları paylaşın, size en kısa sürede dönüş yapalım.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-[#2C3E50] mb-3">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'Ad soyad gereklidir' })}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        placeholder="Adınız ve soyadınız"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-[#2C3E50] mb-3">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone', { required: 'Telefon numarası gereklidir' })}
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        placeholder="0555 123 45 67"
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-[#2C3E50] mb-3">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', {
                        required: 'E-posta gereklidir',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Geçerli bir e-posta adresi giriniz'
                        }
                      })}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder="ornek@email.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-[#2C3E50] mb-3">
                      Proje Detayı *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      {...register('message', { required: 'Proje detayı gereklidir' })}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm"
                      placeholder="Projeniz hakkında detayları paylaşın... (banyo boyutu, istediğiniz değişiklikler, bütçe aralığı vb.)"
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center p-4 bg-green-50 border-2 border-green-200 rounded-xl"
                    >
                      <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                      <p className="text-green-800 font-medium">Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</p>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center p-4 bg-red-50 border-2 border-red-200 rounded-xl"
                    >
                      <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                      <p className="text-red-800 font-medium">Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.</p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full flex items-center justify-center px-8 py-5 bg-gradient-to-r from-[#E67E22] to-[#F39C12] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#E67E22]/25 focus:ring-2 focus:ring-[#E67E22] focus:ring-offset-2 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Gönderiliyor...
                      </div>
                    ) : (
                      <>
                        <span>Ücretsiz Keşif Talep Et</span>
                        <Send className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact