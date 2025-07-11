import React, { useEffect, useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Mail, 
  Award, 
  LogOut, 
  Menu, 
  X,
  User,
  Settings as SettingsIcon
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { signOut, getCurrentUser } from '../../lib/supabase'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      navigate('/admin/login')
    } else {
      setUser(currentUser)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const navigation = [
    {
      name: 'Ana Sayfa',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      color: 'from-[#E67E22] to-[#F39C12]'
    },
    {
      name: 'Blog Yazıları',
      href: '/admin/blog',
      icon: FileText,
      color: 'from-[#3B82F6] to-[#1D4ED8]'
    },
    {
      name: 'Referanslar',
      href: '/admin/references',
      icon: Image,
      color: 'from-[#8B5CF6] to-[#7C3AED]'
    },
    {
      name: 'Hizmetler',
      href: '/admin/services',
      icon: Award,
      color: 'from-[#10B981] to-[#059669]'
    },
    {
      name: 'İletişim Formları',
      href: '/admin/contacts',
      icon: Mail,
      color: 'from-[#F59E0B] to-[#D97706]'
    },
    {
      name: 'Site Ayarları',
      href: '/admin/settings',
      icon: SettingsIcon,
      color: 'from-[#6B7280] to-[#4B5563]'
    }
  ]

  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : -320
        }}
        className="fixed top-0 left-0 z-50 w-80 h-full bg-white/90 backdrop-blur-md shadow-2xl border-r border-white/20 lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-[#E67E22] to-[#F39C12] rounded-2xl flex items-center justify-center mr-3">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-[#2C3E50]">Yönetim Paneli</h1>
                <p className="text-sm text-gray-600">Servet Dekorasyon</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-4 py-3 rounded-2xl transition-all duration-300 ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-[#E67E22]/10 to-[#F39C12]/10 border-2 border-[#E67E22]/20'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 transition-all duration-300 ${
                      isActive(item.href)
                        ? `bg-gradient-to-br ${item.color} shadow-lg`
                        : 'bg-gray-200 group-hover:bg-gray-300'
                    }`}>
                      <item.icon className={`w-5 h-5 ${
                        isActive(item.href) ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <span className={`font-semibold transition-colors duration-300 ${
                      isActive(item.href) ? 'text-[#E67E22]' : 'text-gray-700 group-hover:text-[#2C3E50]'
                    }`}>
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </nav>

          {/* User Info & Logout */}
          <div className="p-6 border-t border-gray-200">
            {user && (
              <div className="flex items-center mb-4 p-3 rounded-2xl bg-gray-50">
                <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-xl flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#2C3E50] truncate">
                    {user.email}
                  </div>
                  <div className="text-xs text-gray-600">Admin</div>
                </div>
              </div>
            )}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 group"
            >
              <LogOut className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
              <span className="font-semibold">Çıkış Yap</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:ml-80">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                target="_blank"
                className="px-4 py-2 bg-gradient-to-r from-[#E67E22] to-[#F39C12] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
              >
                Siteyi Görüntüle
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout