import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Turgay Gürler',
    comment: 'İş yapış sürecinde her olumsuzluğa pozitif yaklaşıp işi başarıyla bitirmesi. Güven vermesi açısından rahat süreç oldu. Sonuçta çok başarılı.',
  },
  {
    id: 2,
    name: 'İkbal Köroğlu',
    comment: 'Servet bey ile uzun zaman önce tanıştım, tesisat, seramik, tadilat gibi işlerimde başka usta aramama gerek kalmadı. Ekibine teşekkür ederim.',
  },
  {
    id: 3,
    name: 'Seda Usta',
    comment: 'Banyo tadilatı yaptırdık, zamanından önce işimizi tertemiz teslim etti. Kendisine ve ekibine teşekkür ederiz.',
  },
  {
    id: 4,
    name: 'Seda Akçay',
    comment: 'Ataşehir’deki dairemin tadilatını Servet Bey ve ekibi eksiksiz tamamladı. Temizlik dahil her detayı düşündüler. Herkese tavsiye ediyorum.',
  },
  {
    id: 5,
    name: 'Özgür Bar',
    comment: 'Yoğun çalıştığımız için tadilatla ilgilenemedik, ama Servet Bey her şeyi organize etti ve gününden önce teslim etti. Ailecek teşekkür ederiz.',
  }
]

const TestimonialsSlider = () => {
  return (
    <section className="py-24 bg-[#F9FAFB] overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full text-white text-sm font-semibold mb-4">
            <Quote className="w-4 h-4 mr-2" />
            Müşterilerimiz Ne Diyor?
          </div>
          <h2 className="text-4xl font-extrabold text-gray-800">Gerçek Yorumlar – Servet Dekorasyon</h2>
        </motion.div>

        <motion.div
          className="flex space-x-6 overflow-x-auto scrollbar-hide px-2"
          initial={{ x: 100 }}
          whileInView={{ x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {testimonials.map((item) => (
            <div key={item.id} className="min-w-[320px] max-w-sm bg-white shadow-xl rounded-3xl p-8 flex-shrink-0">
              <div className="flex items-center mb-2">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="text-yellow-400 w-4 h-4 fill-yellow-400 mr-1" />
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">"{item.comment}"</p>
              <h4 className="text-xl font-bold text-[#4F46E5]">{item.name}</h4>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSlider
