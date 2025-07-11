import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import References from './pages/References'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Login from './pages/admin/Login'
import Register from './pages/admin/Register'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import BlogManagement from './pages/admin/BlogManagement'
import ReferencesManagement from './pages/admin/ReferencesManagement'
import ContactsManagement from './pages/admin/ContactsManagement'
import ServicesManagement from './pages/admin/ServicesManagement'
import Settings from './pages/admin/Settings'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="blog" element={<BlogManagement />} />
            <Route path="references" element={<ReferencesManagement />} />
            <Route path="contacts" element={<ContactsManagement />} />
            <Route path="services" element={<ServicesManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Public Routes */}
          <Route path="/*" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/hizmetler" element={<Services />} />
                  <Route path="/referanslar" element={<References />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/iletisim" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppButton />
            </div>
          } />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App