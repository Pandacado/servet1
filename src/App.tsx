import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'

// Lazy load components
const Header = React.lazy(() => import('./components/Layout/Header'))
const Footer = React.lazy(() => import('./components/Layout/Footer'))
const Home = React.lazy(() => import('./pages/Home'))
const Services = React.lazy(() => import('./pages/Services'))
const References = React.lazy(() => import('./pages/References'))
const Blog = React.lazy(() => import('./pages/Blog'))
const BlogPost = React.lazy(() => import('./pages/BlogPost'))
const Contact = React.lazy(() => import('./pages/Contact'))
const Login = React.lazy(() => import('./pages/admin/Login'))
const Register = React.lazy(() => import('./pages/admin/Register'))
const AdminLayout = React.lazy(() => import('./pages/admin/AdminLayout'))
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'))
const BlogManagement = React.lazy(() => import('./pages/admin/BlogManagement'))
const ReferencesManagement = React.lazy(() => import('./pages/admin/ReferencesManagement'))
const ContactsManagement = React.lazy(() => import('./pages/admin/ContactsManagement'))
const ServicesManagement = React.lazy(() => import('./pages/admin/ServicesManagement'))
const Settings = React.lazy(() => import('./pages/admin/Settings'))
const WhatsAppButton = React.lazy(() => import('./components/WhatsAppButton'))

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E67E22] mx-auto mb-4"></div>
      <p className="text-gray-600">Yükleniyor...</p>
    </div>
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
      </Router>
    </ErrorBoundary>
  )
}

export default App