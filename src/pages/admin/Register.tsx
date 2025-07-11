import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { UserPlus, Mail, Eye, EyeOff, AlertCircle, Shield, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'

interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
  name: string
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterForm>()

  const password = watch('password')

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      setError('Şifreler eşleşmiyor')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Demo mode check
      if (import.meta.env.VITE_SUPABASE_URL === 'https://demo.supabase.co' || 
          !import.meta.env.VITE_SUPABASE_URL || 
          import.meta.env.VITE_SUPABASE_URL === 'demo') {
        setError('Demo modunda kayıt işlemi devre dışıdır. Gerçek Supabase bağlantısı gereklidir.')
        setIsLoading(false)
        return
      }
      
      // Supabase Auth ile kullanıcı oluştur
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            role: 'admin'
          }
        }
      })

      if (authError) {
        throw authError
      }

      // Admin users tablosuna ekle
      if (authData.user) {
        const { error: dbError } = await supabase
          .from('admin_users')
          .insert([
            {
              email: data.email,
              name: data.name,
              role: 'admin'
            }
          ])

        if (dbError) {
          console.error('Database error:', dbError)
        }
      }

      setSuccess(true)
      setTimeout(() => {
        navigate('/admin/login')
      }, 2000)

    } catch (err: any) {
      setError(err.message || 'Kayıt olurken bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20 text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Kayıt Başarılı!</h2>
          <p className="text-gray-300 mb-6">
            Admin hesabınız oluşturuldu. Giriş sayfasına yönlendiriliyorsunuz...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#E67E22] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#3B82F6] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-[#8B5CF6] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E67E22]/20 to-[#F39C12]/20 rounded-3xl blur-xl scale-110"></div>
        
        <div className="relative bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/20">
          {/* Logo/Header */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-[#E67E22] to-[#F39C12] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">Admin Kaydı</h1>
            <p className="text-gray-300">İlk admin hesabınızı oluşturun</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center p-4 bg-red-500/20 border border-red-500/30 rounded-2xl mb-6 backdrop-blur-sm"
            >
              <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
              <p className="text-red-300 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-white mb-3">
                Ad Soyad
              </label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Ad soyad gereklidir' })}
                className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                placeholder="Adınız ve soyadınız"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-white mb-3">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                  placeholder="admin@servetdekorasyon.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-white mb-3">
                Şifre
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password', {
                    required: 'Şifre gereklidir',
                    minLength: {
                      value: 6,
                      message: 'Şifre en az 6 karakter olmalıdır'
                    }
                  })}
                  className="w-full px-4 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold text-white mb-3">
                Şifre Tekrarı
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'Şifre tekrarı gereklidir',
                    validate: value => value === password || 'Şifreler eşleşmiyor'
                  })}
                  className="w-full px-4 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#E67E22] to-[#F39C12] text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-[#E67E22]/25 focus:ring-2 focus:ring-[#E67E22] focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Kaydediliyor...
                </div>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2" />
                  Admin Hesabı Oluştur
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-4">
              Zaten hesabınız var mı?
            </p>
            <Link
              to="/admin/login"
              className="text-[#E67E22] hover:text-[#F39C12] font-semibold transition-colors duration-300"
            >
              Giriş Yap
            </Link>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              © 2024 Servet Dekorasyon Tadilat
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register