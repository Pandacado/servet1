import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Star, Phone, Mail, Calendar, Award, Users, Clock, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

const serviceData = {
  'banyo-tadilati': {
    title: 'Banyo Tadilat Hizmetleri',
    subtitle: 'Modern ve Fonksiyonel Banyo Tasarımları',
    description: 'Vitra ve Artema ürünleri ile hayalinizdeki banyoyu gerçeğe dönüştürüyoruz. 27 yıllık deneyimimizle kaliteli ve güvenilir banyo tadilat hizmetleri sunuyoruz.',
    heroImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    content: {
      overview: `
        <h2>Profesyonel Banyo Tadilat Hizmetleri</h2>
        <p>Servet Dekorasyon olarak 1997'den beri İstanbul'da banyo tadilat alanında hizmet vermekteyiz. Vitra ve Artema'nın yetkili satıcısı olarak, en kaliteli malzemeler ve uzman ekibimizle banyonuzu yeniden tasarlıyoruz.</p>
        
        <h3>Neden Banyo Tadilatı Gereklidir?</h3>
        <p>Banyo, evinizin en çok kullanılan alanlarından biridir. Zamanla eskiyen tesisatlar, çatlayan seramikler ve modası geçmiş tasarımlar hem estetik hem de fonksiyonel sorunlara yol açar. Modern banyo tadilat çözümlerimizle:</p>
        <ul>
          <li>Su tasarrufu sağlayan modern armatürler</li>
          <li>Hijyenik ve temizlemesi kolay yüzeyler</li>
          <li>Daha fazla depolama alanı</li>
          <li>Enerji verimli aydınlatma sistemleri</li>
          <li>Evinizin değerini artıran modern tasarım</li>
        </ul>
      `,
      services: [
        {
          title: 'Komple Banyo Yenileme',
          description: 'Eski banyonuzun tamamen yenilenmesi, modern tasarım ve kaliteli malzemelerle'
        },
        {
          title: 'Seramik ve Fayans İşleri',
          description: 'Duvar ve zemin seramikleri, özel kesim ve uygulama hizmetleri'
        },
        {
          title: 'Sıhhi Tesisat Yenileme',
          description: 'Su ve kanalizasyon tesisatlarının yenilenmesi, modern sistemler'
        },
        {
          title: 'Banyo Mobilyası',
          description: 'Özel tasarım banyo dolapları, aynalar ve aksesuar montajı'
        },
        {
          title: 'Jakuzi ve Duş Kabini',
          description: 'Modern jakuzi ve duş kabini sistemleri, cam ve aksesuarlar'
        },
        {
          title: 'Su Yalıtımı',
          description: 'Profesyonel su yalıtım sistemleri, uzun ömürlü çözümler'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Ücretsiz Keşif',
          description: 'Uzman ekibimiz evinize gelir, mevcut durumu inceler ve ölçüm alır'
        },
        {
          step: 2,
          title: 'Tasarım ve Planlama',
          description: '3D tasarım ile projenizi görselleştiriyoruz, malzeme seçimi yapıyoruz'
        },
        {
          step: 3,
          title: 'Malzeme Temini',
          description: 'Vitra ve Artema ürünleri ile kaliteli malzemeleri temin ediyoruz'
        },
        {
          step: 4,
          title: 'Uygulama',
          description: 'Uzman ekibimiz ile hızlı ve temiz uygulama süreci'
        },
        {
          step: 5,
          title: 'Teslim ve Garanti',
          description: 'İşçilik garantisi ile teslim, sonrası destek hizmeti'
        }
      ],
      features: [
        'Vitra & Artema yetkili satıcısı',
        '27 yıl sektör deneyimi',
        'Ücretsiz keşif ve danışmanlık',
        '2 yıl işçilik garantisi',
        'Kaliteli malzeme garantisi',
        'Hızlı ve temiz uygulama',
        'Proje sonrası bakım desteği',
        '3D tasarım hizmeti'
      ],
      gallery: [
        'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    }
  },
  'dekorasyon': {
    title: 'Dekorasyon Hizmetleri',
    subtitle: 'Estetik ve Fonksiyonel İç Mekan Tasarımı',
    description: 'Yaşam alanlarınızı modern dekorasyon çözümleriyle yeniliyoruz. Estetik ve fonksiyonelliği birleştiren tasarımlarla evinizi dönüştürüyoruz.',
    heroImage: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
    content: {
      overview: `
        <h2>Profesyonel İç Mekan Dekorasyon Hizmetleri</h2>
        <p>Servet Dekorasyon olarak, yaşam alanlarınızı estetik ve kullanışlı dekorasyon çözümleriyle yeniliyoruz. Modern tasarım anlayışı ile fonksiyonelliği birleştirerek, evinizi hayalinizdeki gibi tasarlıyoruz.</p>
        
        <h3>Dekorasyon Hizmetlerimizin Kapsamı</h3>
        <p>İç mekan dekorasyonu sadece güzel görünüm değil, aynı zamanda yaşam kalitenizi artıran fonksiyonel çözümlerdir. Hizmetlerimiz:</p>
        <ul>
          <li>Renk ve doku uyumu ile atmosfer yaratma</li>
          <li>Alanın maksimum verimle kullanılması</li>
          <li>Kişisel zevklere uygun tasarım</li>
          <li>Kaliteli malzeme ve işçilik</li>
          <li>Bütçe dostu çözümler</li>
        </ul>
      `,
      services: [
        {
          title: 'Duvar Boyama ve Kaplama',
          description: 'Profesyonel boya uygulaması, duvar kağıdı ve özel kaplamalar'
        },
        {
          title: 'Zemin Döşeme',
          description: 'Laminat, parke, seramik ve özel zemin kaplamaları'
        },
        {
          title: 'Aydınlatma Tasarımı',
          description: 'LED sistemler, dekoratif aydınlatma ve akıllı kontrol'
        },
        {
          title: 'Mobilya Seçimi',
          description: 'Özel tasarım mobilyalar, yerleşim planı ve koordinasyon'
        },
        {
          title: 'Tekstil ve Aksesuar',
          description: 'Perde, halı, yastık ve dekoratif obje seçimi'
        },
        {
          title: 'Renk Danışmanlığı',
          description: 'Profesyonel renk paleti oluşturma ve uyum sağlama'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Konsept Belirleme',
          description: 'Yaşam tarzınıza uygun dekorasyon konsepti belirliyoruz'
        },
        {
          step: 2,
          title: 'Tasarım Geliştirme',
          description: 'Detaylı tasarım planları ve görselleştirme'
        },
        {
          step: 3,
          title: 'Malzeme Seçimi',
          description: 'Kaliteli ve uygun malzemelerin seçimi ve temini'
        },
        {
          step: 4,
          title: 'Uygulama Süreci',
          description: 'Planlı ve düzenli uygulama ile minimum rahatsızlık'
        },
        {
          step: 5,
          title: 'Son Dokunuşlar',
          description: 'Aksesuar yerleştirme ve final kontrolleri'
        }
      ],
      features: [
        'Kişiye özel tasarım',
        'Kaliteli malzeme garantisi',
        'Profesyonel uygulama',
        'Bütçe dostu çözümler',
        'Hızlı teslimat',
        'Sonrası destek',
        'Trend takibi',
        'Uzman danışmanlık'
      ],
      gallery: [
        'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    }
  },
  'sihhi-tesisat': {
    title: 'Sıhhi Tesisat Hizmetleri',
    subtitle: '24/7 Güvenilir Tesisat Çözümleri',
    description: 'Profesyonel sıhhi tesisat hizmetleri ile su ve ısıtma sistemlerinizi güvence altına alıyoruz. Acil müdahale ve kalıcı çözümler için 24/7 hizmet.',
    heroImage: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200',
    content: {
      overview: `
        <h2>Profesyonel Sıhhi Tesisat Hizmetleri</h2>
        <p>27 yıllık deneyimimizle sıhhi tesisat alanında güvenilir hizmet sunuyoruz. Su kaçağından komple tesisat yenilemeye kadar tüm ihtiyaçlarınız için 24/7 hizmet veriyoruz.</p>
        
        <h3>Sıhhi Tesisat Hizmetlerimiz</h3>
        <p>Modern yaşamın vazgeçilmez unsuru olan su ve ısıtma sistemleri için kapsamlı çözümler sunuyoruz:</p>
        <ul>
          <li>Acil müdahale hizmetleri</li>
          <li>Kalıcı ve uzun ömürlü çözümler</li>
          <li>Modern teknoloji kullanımı</li>
          <li>Enerji verimli sistemler</li>
          <li>Çevre dostu çözümler</li>
        </ul>
      `,
      services: [
        {
          title: 'Acil Tesisat Müdahalesi',
          description: '24/7 acil su kaçağı, tıkanıklık ve arıza müdahalesi'
        },
        {
          title: 'Su Tesisatı Yenileme',
          description: 'Eski su borularının yenilenmesi, modern sistemler'
        },
        {
          title: 'Kanalizasyon Sistemleri',
          description: 'Atık su sistemleri, tıkanıklık açma ve bakım'
        },
        {
          title: 'Isıtma Sistemleri',
          description: 'Kombi, radyatör ve yerden ısıtma sistemleri'
        },
        {
          title: 'Su Deposu ve Pompa',
          description: 'Su deposu temizliği, pompa montaj ve bakımı'
        },
        {
          title: 'Armatür Montajı',
          description: 'Musluk, duş, klozet ve diğer armatür montajları'
        }
      ],
      process: [
        {
          step: 1,
          title: 'Sorun Tespiti',
          description: 'Detaylı inceleme ile sorunun kaynağını belirliyoruz'
        },
        {
          step: 2,
          title: 'Çözüm Önerisi',
          description: 'En uygun ve ekonomik çözüm seçeneklerini sunuyoruz'
        },
        {
          step: 3,
          title: 'Malzeme Temini',
          description: 'Kaliteli ve garantili malzemeleri hızla temin ediyoruz'
        },
        {
          step: 4,
          title: 'Profesyonel Uygulama',
          description: 'Uzman ekibimizle hızlı ve güvenli uygulama'
        },
        {
          step: 5,
          title: 'Test ve Garanti',
          description: 'Sistem testleri ve garanti belgesi ile teslim'
        }
      ],
      features: [
        '24/7 acil servis',
        'Uzman teknisyen ekibi',
        'Kaliteli malzeme kullanımı',
        'Hızlı müdahale',
        'Uygun fiyat garantisi',
        'İşçilik garantisi',
        'Modern ekipman',
        'Temiz çalışma'
      ],
      gallery: [
        'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    }
  }
}

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const [activeTab, setActiveTab] = useState('overview')

  const service = slug ? serviceData[slug as keyof typeof serviceData] : null

  useEffect(() => {
    if (service) {
      document.title = `${service.title} - Servet Dekorasyon`
      document.querySelector('meta[name="description"]')?.setAttribute('content', service.description)
    }
  }, [service])

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-600 mb-4">Hizmet Bulunamadı</h1>
          <Link to="/hizmetler" className="text-[#E67E22] hover:underline">
            Hizmetler sayfasına dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/hizmetler"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Hizmetlere Dön
            </Link>

            <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
              {service.title}
            </h1>
            <h2 className="text-2xl lg:text-3xl text-[#E67E22] font-bold mb-6">
              {service.subtitle}
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl leading-relaxed">
              {service.description}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { icon: Award, value: "27+", label: "Yıl Deneyim" },
                { icon: Users, value: "500+", label: "Mutlu Müşteri" },
                { icon: Clock, value: "24/7", label: "Destek" },
                { icon: Shield, value: "2 Yıl", label: "Garanti" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#E67E22] to-[#F39C12] rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Genel Bilgi' },
              { id: 'services', label: 'Hizmetlerimiz' },
              { id: 'process', label: 'Süreç' },
              { id: 'gallery', label: 'Galeri' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-semibold transition-colors duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#E67E22] text-[#E67E22]'
                    : 'border-transparent text-gray-600 hover:text-[#E67E22]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: service.content.overview }}
                />
              )}

              {activeTab === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold text-[#2C3E50] mb-8">Hizmet Detayları</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.content.services.map((item, index) => (
                      <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-[#2C3E50] mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'process' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl font-bold text-[#2C3E50] mb-8">Çalışma Sürecimiz</h2>
                  {service.content.process.map((step, index) => (
                    <div key={index} className="flex items-start space-x-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E67E22] to-[#F39C12] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'gallery' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <h2 className="text-3xl font-bold text-[#2C3E50] mb-8">Proje Galerisi</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.content.gallery.map((image, index) => (
                      <div key={index} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src={image}
                          alt={`${service.title} - Proje ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                {/* Features */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-6">Özelliklerimiz</h3>
                  <div className="space-y-3">
                    {service.content.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-[#E67E22] mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-gradient-to-br from-[#E67E22] to-[#F39C12] p-6 rounded-2xl text-white">
                  <h3 className="text-xl font-bold mb-4">Ücretsiz Keşif İsteyin</h3>
                  <p className="mb-6">Projeniz için ücretsiz keşif ve danışmanlık hizmeti alın.</p>
                  <div className="space-y-3">
                    <Link
                      to="/iletisim"
                      className="w-full flex items-center justify-center px-6 py-3 bg-white text-[#E67E22] font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      İletişim Formu
                    </Link>
                    <a
                      href="tel:02125550123"
                      className="w-full flex items-center justify-center px-6 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#E67E22] transition-all duration-300"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Hemen Arayın
                    </a>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-4">Hızlı Bilgi</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deneyim:</span>
                      <span className="font-semibold">27+ Yıl</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Garanti:</span>
                      <span className="font-semibold">2 Yıl</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Keşif:</span>
                      <span className="font-semibold">Ücretsiz</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Destek:</span>
                      <span className="font-semibold">24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetail