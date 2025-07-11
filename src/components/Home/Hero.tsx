import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Users, Clock, Sparkles, Star, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase'

const defaultSlides = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Modern Banyo Tasarımları',
    subtitle: 'Vitra & Artema ürünleri ile hayalinizdeki banyo',
    description: 'Premium kalitede malzemeler ve uzman ekibimizle banyonuzu yeniden tasarlıyoruz'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Lüks Dekorasyon Çözümleri',
    subtitle: 'Estetik ve fonksiyonelliği bir arada',
    description: '27 yıllık deneyimimizle yaşam alanlarınızı dönüştürüyoruz'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Profesyonel Sıhhi Tesisat',
    subtitle: '24/7 güvenilir hizmet',
    description: 'Acil müdahale ve kalıcı çözümler için uzman ekibimiz her zaman yanınızda'
  }
]

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [settings, setSettings] = useState<any>({})

  useEffect(() => {
    fetchSettings()
  }, [])

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % defaultSlides.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying])

  const fetchSettings = async () => {
    try {
      const { data } = await supabase
        .from('settings')
        .select('key, value')
        .in('key', ['company_name', 'company_tagline', 'hero_title', 'hero_subtitle'])

      if (data) {
        const settingsObj = data.reduce((acc: any, item: any) => {
          acc[item.key] = item.value
          return acc
        }, {})
        setSettings(settingsObj)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % defaultSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + defaultSlides.length) % defaultSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.46, 0.45, 0.94],
              scale: { duration: 1.5 }
            }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${defaultSlides[currentSlide].image})` }}
            />
            {/* Gradient Overlays */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#E67E22]/20 to-[#F39C12]/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-[#3B82F6]/20 to-[#1D4ED8]/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-[#8B5CF6]/20 to-[#7C3AED]/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10 text-white"
          >
            {/* Premium Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm font-bold border border-white/20 shadow-2xl"
            >
              <Star className="w-5 h-5 mr-2 text-[#E67E22]" />
              {settings.company_tagline || '1997\'den beri güvenilir hizmet'}
              <Sparkles className="w-5 h-5 ml-2 text-[#F39C12]" />
            </motion.div>

            {/* Dynamic Content Based on Slide */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 1.05 }}
                  transition={{ 
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    scale: { duration: 1 }
                  }}
                >
                  <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                    <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl">
                      {defaultSlides[currentSlide].title}
                    </span>
                  </h1>
                  <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#E67E22] to-[#F39C12] bg-clip-text text-transparent mb-4 drop-shadow-lg">
                    {defaultSlides[currentSlide].subtitle}
                  </h2>
                  <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed font-light drop-shadow-lg">
                    {defaultSlides[currentSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link
                to="/iletisim"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#E67E22] to-[#F39C12] text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-[#E67E22]/25 transition-all duration-500 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#F39C12] to-[#E67E22] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10">Ücretsiz Keşif</span>
                <ArrowRight className="relative z-10 ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="group inline-flex items-center px-8 py-4 border-2 border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transition-all duration-300"
              >
                <Play className={`w-5 h-5 mr-2 transition-transform duration-300 ${isAutoPlaying ? 'rotate-90' : ''}`} />
                <span>{isAutoPlaying ? 'Duraklat' : 'Oynat'}</span>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              {[
                { icon: Award, value: "27+", label: "Yıl Deneyim", color: "from-[#E67E22] to-[#F39C12]" },
                { icon: Users, value: "500+", label: "Mutlu Müşteri", color: "from-[#3B82F6] to-[#1D4ED8]" },
                { icon: Clock, value: "24/7", label: "Destek", color: "from-[#8B5CF6] to-[#7C3AED]" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Slide Indicators & Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-col items-center justify-center"
          >
            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 z-10">
              <button
                onClick={prevSlide}
                className="group w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-110 hover:rotate-3 shadow-2xl"
              >
                <ChevronLeft className="w-7 h-7 text-white group-hover:-translate-x-2 transition-transform duration-500" />
              </button>
              <button
                onClick={nextSlide}
                className="group w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-110 hover:-rotate-3 shadow-2xl"
              >
                <ChevronRight className="w-7 h-7 text-white group-hover:translate-x-2 transition-transform duration-500" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex space-x-3 mb-8">
              {defaultSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative w-3 h-3 rounded-full transition-all duration-700 ${
                    currentSlide === index 
                      ? 'bg-gradient-to-r from-[#E67E22] to-[#F39C12] scale-150 shadow-2xl' 
                      : 'bg-white/40 hover:bg-white/60 hover:scale-125'
                  }`}
                >
                  {currentSlide === index && (
                    <motion.div
                      layoutId="activeSlide"
                      className="absolute inset-0 bg-gradient-to-r from-[#E67E22] to-[#F39C12] rounded-full shadow-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-80 h-2 bg-white/20 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[#E67E22] via-[#F39C12] to-[#E67E22] shadow-lg"
                initial={{ width: "0%" }}
                animate={{ width: isAutoPlaying ? "100%" : "0%" }}
                transition={{ 
                  duration: 5, 
                  ease: "linear", 
                  repeat: isAutoPlaying ? Infinity : 0,
                  repeatType: "restart"
                }}
              />
            </div>

            {/* Slide Counter */}
            <div className="mt-6 text-white/90 text-base font-bold tracking-wider">
              {String(currentSlide + 1).padStart(2, '0')} / {String(defaultSlides.length).padStart(2, '0')}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        {/* Animated Wave */}
        <div className="relative">
          <svg 
            viewBox="0 0 1440 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full h-24 lg:h-32"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="50%" stopColor="rgba(255,255,255,1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
              </linearGradient>
            </defs>
            <path 
              d="M0,120 C240,60 480,40 720,60 C960,80 1200,40 1440,60 L1440,120 Z" 
              fill="url(#waveGradient)"
              className="animate-wave"
            />
            <path 
              d="M0,120 C360,80 720,20 1080,40 C1200,50 1320,60 1440,40 L1440,120 Z" 
              fill="rgba(255,255,255,0.7)"
              className="animate-wave-delayed"
            />
          </svg>
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                style={{
                  left: `${20 + i * 15}%`,
                  bottom: `${30 + (i % 3) * 20}px`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + i * 0.5}s`
                }}
              />
            ))}
          </div>
      </div>
    </section>
  )
}

export default Hero