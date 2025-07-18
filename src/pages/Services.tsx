import React, { useEffect, useState } from 'react'
import { Bath, Palette, Wrench, CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Service } from '../types'

const defaultServices = [
  {
    id: 1,
    title: 'Banyo Tadilatı',
    description: 'Modern ve fonksiyonel banyo tasarımları ile hayalinizdeki banyoyu gerçeğe dönüştürüyoruz. Vitra ve Artema ürünleri ile kaliteli çözümler sunuyoruz.',
    icon: 'Bath',
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Dekorasyon',
    description: 'Yaşam alanlarınızı estetik ve kullanışlı dekorasyon çözümleriyle yeniliyoruz. Modern tasarım anlayışı ile fonksiyonelliği birleştiriyoruz.',
    icon: 'Palette',
    order_index: 2,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Sıhhi Tesisat',
    description: 'Profesyonel sıhhi tesisat hizmetleri ile su ve ısıtma sistemlerinizi güvence altına alıyoruz. 24/7 acil servis desteği sağlıyoruz.',
    icon: 'Wrench',
    order_index: 3,
    created_at: new Date().toISOString()
  }
]

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Bath':
      return Bath
    case 'Palette':
      return Palette
    case 'Wrench':
      return Wrench
    default:
      return Bath
  }
}

const getServiceSlug = (title: string) => {
  const slugMap: { [key: string]: string } = {
    'Banyo Tadilatı': 'banyo-tadilati',
    'Banyo Tadilat': 'banyo-tadilati',
    'Banyo Tadilati': 'banyo-tadilati',
    'Dekorasyon': 'dekorasyon',
    'Sıhhi Tesisat': 'sihhi-tesisat',
    'Sihhi Tesisat': 'sihhi-tesisat'
  }
  return slugMap[title] || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

const Services = () => {
  const [services, setServices] = useState<Service[]>(defaultServices)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index')

      if (error) {
        console.error('Error fetching services:', error)
        setServices(defaultServices)
      } else if (data && data.length > 0) {
        setServices(data)
      } else {
        setServices(defaultServices)
      }
    } catch (error) {
      console.error('Error:', error)
      setServices(defaultServices)
    } finally {
      setLoading(false)
    }
  }

  const features = [
    'Ücretsiz keşif ve danışmanlık',
    'Kaliteli malzeme garantisi',
    'Uzman ekip ile profesyonel uygulama',
    'Proje sonrası bakım desteği',
    'Vitra & Artema Özel Teknik Destek',
    '27 yıllık sektör deneyimi'
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#2C3E50] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="h-12 bg-gray-600 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-600 rounded w-96 mx-auto animate-pulse"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-lg animate-pulse">
                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-6"></div>
                <div className="h-6 bg-gray-300 rounded w-32 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#2C3E50] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Hizmetlerimiz
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Banyo tadilat, dekorasyon ve sıhhi tesisat alanlarında 27 yıllık deneyimimizle 
            kaliteli ve güvenilir hizmet sunuyoruz.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => {
            const IconComponent = getIcon(service.icon)
            return (
              <div
                key={service.id}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <Link to={`/hizmet/${getServiceSlug(service.title)}`} className="block">
                  <div className="flex items-center justify-center w-20 h-20 bg-[#E67E22] rounded-full mx-auto mb-6">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2C3E50] text-center mb-4 hover:text-[#E67E22] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed text-lg mb-4">
                    {service.description}
                  </p>
                  <div className="text-center">
                    <span className="inline-flex items-center text-[#E67E22] font-semibold hover:text-[#D35400] transition-colors duration-300">
                      Detayları Gör
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </span>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#2C3E50] mb-6">
                Neden Bizi Tercih Etmelisiniz?
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-[#E67E22] mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Kaliteli banyo tasarımı"
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#E67E22] text-white p-6 rounded-xl shadow-xl">
                <div className="text-2xl font-bold">27+</div>
                <div className="text-sm">Yıl Deneyim</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-[#ECF0F1] rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">
            Projenizi Konuşalım
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Banyo tadilat, dekorasyon veya sıhhi tesisat projeniz için ücretsiz keşif 
            ve danışmanlık hizmeti almak ister misiniz?
          </p>
          <Link
            to="/iletisim"
            className="inline-flex items-center px-8 py-4 bg-[#E67E22] text-white font-semibold rounded-lg hover:bg-[#D35400] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Ücretsiz Keşif İsteyin
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Services