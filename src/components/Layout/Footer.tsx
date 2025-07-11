import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#2C3E50] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Servet Dekorasyon</h3>
            <p className="text-gray-300 mb-4">
              1997'den beri Vitra & Artema uzmanlığıyla banyo tadilat, dekorasyon ve sıhhi tesisat hizmetleri.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#E67E22] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#E67E22] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#E67E22] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/hizmetler" className="text-gray-300 hover:text-[#E67E22] transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link to="/referanslar" className="text-gray-300 hover:text-[#E67E22] transition-colors">
                  Referanslar
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-[#E67E22] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/iletisim" className="text-gray-300 hover:text-[#E67E22] transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Banyo Tadilatı</li>
              <li className="text-gray-300">Dekorasyon</li>
              <li className="text-gray-300">Sıhhi Tesisat</li>
              <li className="text-gray-300">Vitra & Artema Ürünleri</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-[#E67E22]" />
                <span className="text-gray-300">0212 555 0123</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-[#E67E22]" />
                <span className="text-gray-300">info@servetdekorasyontadilat.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-[#E67E22]" />
                <span className="text-gray-300">İstanbul, Türkiye</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-[#E67E22]" />
                <span className="text-gray-300">Pzt-Cum: 08:00-18:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Servet Dekorasyon Tadilat. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer