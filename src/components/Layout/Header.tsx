import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logo, setLogo] = useState('/logo.png')
  const [companyName, setCompanyName] = useState('Servet Dekorasyon')
  const location = useLocation()

  React.useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data } = await supabase
        .from('settings')
        .select('key, value')
        .in('key', ['site_logo', 'company_name'])

      if (data) {
        data.forEach((setting: any) => {
          if (setting.key === 'site_logo') setLogo(setting.value)
          if (setting.key === 'company_name') setCompanyName(setting.value)
        })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  const navigation = [
    { name: 'Anasayfa', href: '/' },
    { name: 'Hizmetlerimiz', href: '/hizmetler' },
    { name: 'Referanslar', href: '/referanslar' },
    { name: 'Blog', href: '/blog' },
    { name: 'İletişim', href: '/iletisim' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#2C3E50] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>0212 555 0123</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>info@servetdekorasyontadilat.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>1997'den beri güvenilir hizmet</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-[#2C3E50]">
              {companyName}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-[#E67E22] border-b-2 border-[#E67E22]'
                    : 'text-[#2C3E50] hover:text-[#E67E22]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#2C3E50] hover:text-[#E67E22] transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-[#E67E22] bg-[#ECF0F1]'
                    : 'text-[#2C3E50] hover:text-[#E67E22] hover:bg-[#ECF0F1]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
