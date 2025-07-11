import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Error handling for missing root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
  document.body.innerHTML = '<div style="padding: 20px; font-family: Arial;"><h1>Yükleme Hatası</h1><p>Sayfa yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.</p></div>';
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('React render error:', error);
    rootElement.innerHTML = '<div style="padding: 20px; font-family: Arial;"><h1>Uygulama Hatası</h1><p>Uygulama başlatılırken bir hata oluştu. Lütfen sayfayı yenileyin.</p></div>';
  }
}