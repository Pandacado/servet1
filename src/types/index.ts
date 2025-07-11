export interface Service {
  id: number
  title: string
  description: string
  icon: string
  order_index: number
  created_at: string
}

export interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  category: string
  author: string
  published_date: string
  slug: string
  created_at: string
}

export interface Reference {
  id: number
  image_url: string
  title: string
  description: string
  created_at: string
}

export interface Contact {
  id: number
  name: string
  email: string
  phone: string
  message: string
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  created_at: string
}