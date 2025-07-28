import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Heart, ZoomIn, Grid, List, Search, Star, Award, Users } from 'lucide-react'

// *** TÜM GÖRSELLERLE MOCK DATA ***
const referencesMock = [
  {
    id: 1,
    image_url: "https://i.ibb.co/KxTx2FHv/Whats-App-G-rsel-2025-07-26-saat-00-01-48-4472db60.jpg",
    title: "Modern Oturma Alanı",
    description: "Minimalist mobilyalarla şık ve ferah bir yaşam alanı."
  },
  {
    id: 2,
    image_url: "https://i.ibb.co/0VFD53Z0/Whats-App-G-rsel-2025-07-26-saat-00-01-49-bfa2dc71.jpg",
    title: "Doğal Ahşap Detaylar",
    description: "Ahşap ve sıcak tonların birleştiği modern tasarım."
  },
  {
    id: 3,
    image_url: "https://i.ibb.co/G3CTNsz2/Whats-App-G-rsel-2025-07-26-saat-00-01-48-09e2ba3c.jpg",
    title: "Lüks Banyo Konsepti",
    description: "Mermer yüzeylerle lüks bir banyo atmosferi."
  },
  {
    id: 4,
    image_url: "https://i.ibb.co/x8D2byq6/Whats-App-G-rsel-2025-07-26-saat-00-01-49-87ab4960.jpg",
    title: "Açık Mutfak Planı",
    description: "Ada tezgahlı, ferah bir açık mutfak tasarımı."
  },
  {
    id: 5,
    image_url: "https://i.ibb.co/XfRpHgKN/Whats-App-G-rsel-2025-07-26-saat-00-01-49-90bba814.jpg",
    title: "Spa Konseptli Banyo",
    description: "Evde spa keyfi yaşatan taş ve ahşap uyumu."
  },
  {
    id: 6,
    image_url: "https://i.ibb.co/xqW7SsfK/Whats-App-G-rsel-2025-07-26-saat-00-01-49-ed0ba24b.jpg",
    title: "Minimalist Yatak Odası",
    description: "Sade çizgilerle huzurlu bir uyku alanı."
  },
  {
    id: 7,
    image_url: "https://i.ibb.co/sdyd7tQy/Whats-App-G-rsel-2025-07-26-saat-00-01-49-1d33dfbb.jpg",
    title: "Endüstriyel Loft",
    description: "Tuğla duvarlar ve metal detaylı loft yaşam alanı."
  },
  {
    id: 8,
    image_url: "https://i.ibb.co/SwqMyPmY/Whats-App-G-rsel-2025-07-26-saat-00-01-49-4b6f1172.jpg",
    title: "Modern Salon Dekoru",
    description: "Geniş oturma grupları ve modern aksesuarlarla şıklık."
  },
  {
    id: 9,
    image_url: "https://i.ibb.co/7tmDKJ5s/Whats-App-G-rsel-2025-07-26-saat-00-01-49-26ae5c73.jpg",
    title: "Teras Keyfi",
    description: "Açık havada rahat ve modern teras oturma alanı."
  },
  {
    id: 10,
    image_url: "https://i.ibb.co/v4Wbfg1b/Whats-App-G-rsel-2025-07-26-saat-00-01-49-46ce535a.jpg",
    title: "Mutfak ve Yemek Alanı",
    description: "Fonksiyonel ve estetik mutfak-yemek birleşimi."
  },
  {
    id: 11,
    image_url: "https://i.ibb.co/3yp1jB7K/Whats-App-G-rsel-2025-07-26-saat-00-01-49-67d030e0.jpg",
    title: "Klasik Banyo Detayları",
    description: "Zamansız banyo tasarımında klasik dokunuşlar."
  },
  {
    id: 12,
    image_url: "https://i.ibb.co/rRZM0GtR/Whats-App-G-rsel-2025-07-26-saat-00-01-49-df15ae92.jpg",
    title: "Aydınlık Oturma Köşesi",
    description: "Doğal ışık alan huzurlu oturma köşesi tasarımı."
  },
  {
    id: 13,
    image_url: "https://i.ibb.co/G3Wc33Z2/Whats-App-G-rsel-2025-07-26-saat-00-01-48-489f9022.jpg",
    title: "Modern Mutfak Çözümü",
    description: "Kompakt alanlarda işlevsel mutfak planı."
  },
  {
    id: 14,
    image_url: "https://i.ibb.co/0jx1T8q5/Whats-App-G-rsel-2025-07-26-saat-00-01-48-0745fa51.jpg",
    title: "Minimal Banyo",
    description: "Temiz çizgiler ve sade renklerle minimalist banyo."
  },
  {
    id: 15,
    image_url: "https://i.ibb.co/JT5TLPm/Whats-App-G-rsel-2025-07-26-saat-00-01-49-1f96b294.jpg",
    title: "Modern Salon",
    description: "Şık oturma düzeniyle konforlu salon tasarımı."
  },
  {
    id: 16,
    image_url: "https://i.ibb.co/Q3JGwpGB/Whats-App-G-rsel-2025-07-26-saat-00-01-49-5f7a3231.jpg",
    title: "Ahşap Dokulu Mutfak",
    description: "Doğal malzemelerle sıcak bir mutfak atmosferi."
  },
  {
    id: 17,
    image_url: "https://i.ibb.co/0VfzBX7G/Whats-App-G-rsel-2025-07-26-saat-00-01-49-9a6aaee4.jpg",
    title: "Rustik Yatak Odası",
    description: "Ahşap kirişlerle sıcak bir yatak odası konsepti."
  },
  {
    id: 18,
    image_url: "https://i.ibb.co/PZS0CbZg/Whats-App-G-rsel-2025-07-26-saat-00-01-49-383aa18b.jpg",
    title: "Modern Oturma Odası",
    description: "Geniş pencere ve açık plan tasarımla ferahlık."
  },
  {
    id: 19,
    image_url: "https://i.ibb.co/5h3rfR1w/Whats-App-G-rsel-2025-07-26-saat-00-01-47-a17b16c3.jpg",
    title: "Teraslı Loft",
    description: "Şehir manzaralı loft yaşam alanı."
  },
  {
    id: 20,
    image_url: "https://i.ibb.co/5hPmVggz/Whats-App-G-rsel-2025-07-26-saat-00-01-49-1eca9623.jpg",
    title: "Modern Yemek Alanı",
    description: "Minimalist mobilyalarla sade yemek alanı tasarımı."
  },
  {
    id: 21,
    image_url: "https://i.ibb.co/R4T9V1cM/Whats-App-G-rsel-2025-07-26-saat-00-01-49-9dab0442.jpg",
    title: "Teras Dekorasyonu",
    description: "Açık hava oturma gruplarıyla keyifli teras."
  },
  {
    id: 22,
    image_url: "https://i.ibb.co/LhDQ1y1h/Whats-App-G-rsel-2025-07-26-saat-00-01-49-4112d473.jpg",
    title: "Aydınlık Banyo",
    description: "Beyaz tonlarda modern banyo tasarımı."
  },
  {
    id: 23,
    image_url: "https://i.ibb.co/ZzpkL2wS/Whats-App-G-rsel-2025-07-26-saat-00-01-49-b8d9c09e.jpg",
    title: "Modern Ofis Köşesi",
    description: "Ev ofisi için minimalist çalışma alanı."
  },
  {
    id: 24,
    image_url: "https://i.ibb.co/wrrtHsTb/Whats-App-G-rsel-2025-07-26-saat-00-01-49-e1e88a92.jpg",
    title: "Rustik Banyo",
    description: "Doğal taşlar ve ahşap kombinasyonuyla rustik tarz."
  },
  {
    id: 25,
    image_url: "https://i.ibb.co/XrNyDSL2/Whats-App-G-rsel-2025-07-26-saat-00-01-49-f4f38b24.jpg",
    title: "Modern Yatak Odası",
    description: "Yumuşak dokular ve nötr renklerle huzurlu alan."
  },
  {
    id: 26,
    image_url: "https://i.ibb.co/cXbdD7Tf/Whats-App-G-rsel-2025-07-26-saat-00-01-49-76be2a42.jpg",
    title: "Ferah Salon",
    description: "Büyük camlar ve açık renklerle geniş mekan hissi."
  },
  {
    id: 27,
    image_url: "https://i.ibb.co/6cRFy2tg/Whats-App-G-rsel-2025-07-26-saat-00-01-49-550cfd10.jpg",
    title: "Minimal Yemek Odası",
    description: "Sade masa ve modern sandalye kombinasyonu."
  },
  {
    id: 28,
    image_url: "https://i.ibb.co/Z61zTrzL/Whats-App-G-rsel-2025-07-26-saat-00-01-49-8910e341.jpg",
    title: "Loft Oturma Alanı",
    description: "Endüstriyel loft tarzı konforlu oturma alanı."
  },
  {
    id: 29,
    image_url: "https://i.ibb.co/35qnyznj/Whats-App-G-rsel-2025-07-26-saat-00-01-49-13542ab9.jpg",
    title: "Modern Banyo",
    description: "Mermer ve cam detaylarıyla çağdaş banyo tasarımı."
  },
  {
    id: 30,
    image_url: "https://i.ibb.co/qM7Mzdg6/Whats-App-G-rsel-2025-07-26-saat-00-01-49-cb4e7848.jpg",
    title: "Minimal Oturma Alanı",
    description: "Sade mobilyalar ve yumuşak renk geçişleri."
  },
  {
    id: 31,
    image_url: "https://i.ibb.co/LdjGFGFm/Whats-App-G-rsel-2025-07-26-saat-00-01-48-8e758cd7.jpg",
    title: "Açık Plan Oturma Odası",
    description: "Geniş alan ve doğal ışıkla ferah oturma düzeni."
  },
  {
    id: 32,
    image_url: "https://i.ibb.co/XfRN3rrn/Whats-App-G-rsel-2025-07-26-saat-00-01-48-150b79f5.jpg",
    title: "Rustik Oturma Köşesi",
    description: "Ahşap dokularla sıcak oturma alanı."
  },
  {
    id: 33,
    image_url: "https://i.ibb.co/RTnVqdvf/Whats-App-G-rsel-2025-07-26-saat-00-01-48-a12f49dd.jpg",
    title: "Modern Oturma Grubu",
    description: "Konforlu ve şık oturma grubu tasarımı."
  },
  {
    id: 34,
    image_url: "https://i.ibb.co/XkVPjsHy/Whats-App-G-rsel-2025-07-26-saat-00-01-49-d58ffa50.jpg",
    title: "Minimalist Çalışma Alanı",
    description: "Kompakt ve şık ev ofis köşesi."
  },
  {
    id: 35,
    image_url: "https://i.ibb.co/60KfkKVK/Whats-App-G-rsel-2025-07-26-saat-00-01-49-ef695a1e.jpg",
    title: "Açık Hava Oturma",
    description: "Teras ve balkonlar için modern dış mekan mobilyaları."
  }
]

const References = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedImage, setSelectedImage] = useState<any | null>(null)

  const filteredReferences = referencesMock.filter(ref =>
    ref.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ref.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = [
    { icon: Award, value: "500+", label: "Tamamlanan Proje", color: "from-[#E67E22] to-[#F39C12]" },
    { icon: Users, value: "98%", label: "Müşteri Memnuniyeti", color: "from-[#3B82F6] to-[#1D4ED8]" },
    { icon: Star, value: "27", label: "Yıl Deneyim", color: "from-[#8B5CF6] to-[#7C3AED]" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#ECF0F1]/30 to-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#E67E22] to-[#F39C12] rounded-full mb-8 shadow-2xl">
              <Eye className="w-5 h-5 mr-2" /> Başarılı Projelerimiz
            </div>
            <h1 className="text-6xl lg:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">
              Referanslarımız
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-12">
              27 yıllık deneyimimizle gerçekleştirdiğimiz 
              <span className="text-[#E67E22] font-bold"> 500+ başarılı proje</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center group"
                >
                  <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl mx-auto mb-4`}>
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Kontroller */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            {/* Arama */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Proje ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#E67E22] transition-all"
              />
            </div>

            {/* Görünüm Değiştir */}
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl ${viewMode === 'grid' ? 'bg-gradient-to-r from-[#E67E22] to-[#F39C12] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-gradient-to-r from-[#E67E22] to-[#F39C12] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Kartlar */}
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-8'}`}>
            {filteredReferences.map((reference, index) => (
              <motion.div
                key={reference.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`group cursor-pointer ${viewMode === 'list' ? 'flex gap-8 items-center' : ''}`}
                onClick={() => setSelectedImage(reference)}
              >
                <div className={`relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${viewMode === 'list' ? 'w-80 flex-shrink-0' : ''}`}>
                  <div className={`${viewMode === 'grid' ? 'aspect-[4/3]' : 'aspect-[16/10]'} overflow-hidden relative`}>
                    <img
                      src={reference.image_url}
                      alt={reference.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    {viewMode === 'grid' && (
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-[#E67E22] transition-colors">
                          {reference.title}
                        </h3>
                        <p className="text-gray-200 leading-relaxed line-clamp-2">
                          {reference.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {viewMode === 'list' && (
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-[#2C3E50] mb-4 group-hover:text-[#E67E22]">
                      {reference.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {reference.description}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#E67E22] text-2xl font-bold"
            >
              ✕
            </button>
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              <img src={selectedImage.image_url} alt={selectedImage.title} className="w-full h-96 object-cover" />
              <div className="p-8">
                <h3 className="text-3xl font-bold text-[#2C3E50] mb-4">{selectedImage.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{selectedImage.description}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default References
