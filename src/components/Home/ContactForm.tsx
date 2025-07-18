import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Send, CheckCircle, AlertCircle, Phone, Mail, MapPin, Clock, Shield, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

const ContactForm = () => {
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

  const features = [
    {
      icon: Shield,
      title: 'Ücretsiz Keşif',
      description: 'Projeleriniz için ücretsiz keşif hizmeti',
      gradient: 'from-[#E67E22] to-[#F39C12]'
    },
    {
      icon: Award,
      title: 'Uzman Danışmanlık',
      description: '27 yıllık deneyimle profesyonel danışmanlık',
      gradient: 'from-[#3B82F6] to-[#1D4ED8]'
    },
    {
      icon: Clock,
      title: 'Hızlı Dönüş',
      description: '24 saat içinde size geri dönüş garantisi',
      gradient: 'from-[#8B5CF6] to-[#7C3AED]'
    }
  ]

  const contactInfo = [
    {
      icon: Phone,
      label: 'Telefon',
      value: '0553 467 46 49',
      gradient: 'from-[#E67E22] to-[#F39C12]'
    },
    {
      icon: Mail,
      label: 'E-posta',
      value: 'info@servetdekorasyontadilat.com',
      gradient: 'from-[#3B82F6] to-[#1D4ED8]'
    },
    {
      icon: MapPin,
      label: 'Adres',
      value: 'Fatih cd Nevin sk no 11. İçerenköy ataşehir',
      gradient: 'from-[#8B5CF6] to-[#7C3AED]'
    },
    {
      icon: Clock,
      label: 'Çalışma Saatleri',
      value: 'Pzt-Cum: 08:00-18:00',
      gradient: 'from-[#10B981] to-[#059669]'
    }
  ]

  return (
    <section className="py-32 bg-gradient-to-br from-white via-[#ECF0F1]/30 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-[#E67E22]/5 to-[#F39C12]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-[#3B82F6]/5 to-[#1D4ED8]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#E67E22] to-[#F39C12] rounded-full text-white text-sm font-semibold mb-6">
            <Send className="w-4 h-4 mr-2" />
            İletişime Geçin
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-[#2C3E50] mb-6">
            <span className="bg-gradient-to-r from-[#2C3E50] via-[#34495E] to-[#2C3E50] bg-clip-text text-transparent">
              Ücretsiz Keşif İçin
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#E67E22] to-[#F39C12] bg-clip-text text-transparent">
              İletişime Geçin
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Banyo tadilat, dekorasyon ve sıhhi tesisat projeleriniz için uzman ekibimizden 
            <span className="text-[#E67E22] font-semibold"> ücretsiz keşif ve danışmanlık</span> hizmeti alın.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Info & Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-1 group-hover:text-[#E67E22] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              <h3 className="text-2xl font-bold text-[#2C3E50] mb-6">İletişim Bilgileri</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">{info.label}</div>
                      <div className="text-[#2C3E50] font-semibold">{info.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
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
                    rows={5}
                    {...register('message', { required: 'Proje detayı gereklidir' })}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm"
                    placeholder="Projeniz hakkında detayları paylaşın..."
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
                      <span>Mesaj Gönder</span>
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
  )
}

export default ContactForm