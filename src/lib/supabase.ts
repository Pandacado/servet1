import { createClient } from '@supabase/supabase-js'

// Fallback values for when environment variables are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbW8iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MjU0MjM4MCwiZXhwIjoxOTU4MTE4MzgwfQ.demo'

// Check if we have valid URLs
const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Create client with error handling
export const supabase = (() => {
  try {
    if (!isValidUrl(supabaseUrl)) {
      console.warn('Invalid Supabase URL, using demo mode')
      return createClient('https://demo.supabase.co', 'demo-key', {
        auth: { persistSession: false }
      })
    }
    
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false }
    })
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    // Return a mock client that won't break the app
    return {
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        delete: () => ({ data: null, error: null })
      }),
      auth: {
        signInWithPassword: () => ({ data: null, error: { message: 'Demo mode' } }),
        signOut: () => ({ error: null }),
        getUser: () => ({ data: { user: null } })
      },
      storage: {
        from: () => ({
          upload: () => ({ data: null, error: { message: 'Demo mode' } }),
          getPublicUrl: () => ({ data: { publicUrl: '' } })
        })
      }
    }
  }
})()

// Auth helpers with error handling
export const signIn = async (email: string, password: string) => {
  try {
    // Check if we're in demo mode
    if (supabaseUrl === 'https://demo.supabase.co') {
      console.warn('Demo mode: Auth disabled')
      return { data: null, error: { message: 'Demo mode - Auth devre dışı' } }
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  } catch (error) {
    console.error('Sign in error:', error)
    return { data: null, error: { message: 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.' } }
  }
}

export const signOut = async () => {
  try {
    // Check if we're in demo mode
    if (supabaseUrl === 'https://demo.supabase.co') {
      return { error: null }
    }
    
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (error) {
    console.error('Sign out error:', error)
    return { error: null }
  }
}

export const getCurrentUser = async () => {
  try {
    // Check if we're in demo mode
    if (supabaseUrl === 'https://demo.supabase.co') {
      return null
    }
    
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
}