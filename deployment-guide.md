# 🚀 cPanel Linux Sunucuda React Uygulaması Deployment Rehberi

## 📋 Gereksinimler
- cPanel erişimi
- Node.js desteği (cPanel'de Node.js App)
- SSH erişimi (tercihen)
- Git desteği

## 🔧 Yöntem 1: cPanel File Manager ile

### 1. Projeyi Build Etme (Local'de)
```bash
npm install
npm run build
```

### 2. Build Dosyalarını Upload Etme
1. **cPanel → File Manager**
2. **public_html** klasörüne gidin
3. **dist** klasöründeki tüm dosyaları upload edin
4. **index.html, assets/ klasörü** vs. hepsini public_html'e kopyalayın

### 3. .htaccess Dosyası Oluşturma
public_html'de `.htaccess` dosyası oluşturun:

```apache
RewriteEngine On
RewriteBase /

# Handle SPA routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
</IfModule>
```

## 🚀 Yöntem 2: Node.js App ile (Önerilen)

### 1. cPanel'de Node.js App Oluşturma
1. **cPanel → Node.js App**
2. **Create Application**
3. **Node.js Version**: 18.x
4. **Application Root**: `servet-dekorasyon`
5. **Application URL**: `/` (ana domain için)
6. **Application Startup File**: `server.js`

### 2. SSH ile Bağlanma
```bash
ssh username@your-domain.com
cd servet-dekorasyon
```

### 3. Projeyi Clone Etme
```bash
git clone https://github.com/Pandacado/servet.git .
npm install
npm run build
```

### 4. Express Server Oluşturma
`server.js` dosyası oluşturun:

```javascript
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### 5. Package.json Güncelleme
```json
{
  "scripts": {
    "start": "node server.js",
    "build": "vite build"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

### 6. Express Kurma ve Başlatma
```bash
npm install express
npm run build
npm start
```

## 🔧 Yöntem 3: Subdomain ile

### 1. Subdomain Oluşturma
1. **cPanel → Subdomains**
2. **Create Subdomain**: `app.yourdomain.com`
3. **Document Root**: `/public_html/app`

### 2. Build Dosyalarını Upload
- Build dosyalarını `/public_html/app/` klasörüne upload edin

## ⚙️ Environment Variables

### cPanel'de Environment Variables
1. **cPanel → Node.js App → Environment Variables**
2. Şu değişkenleri ekleyin:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### .env Dosyası (Alternatif)
```bash
# .env dosyası oluşturun
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🔒 SSL Sertifikası

### Let's Encrypt (Ücretsiz)
1. **cPanel → SSL/TLS → Let's Encrypt**
2. **Domain seçin**
3. **Issue** butonuna tıklayın

## 📊 Performans Optimizasyonu

### Gzip Compression
`.htaccess` dosyasına ekleyin:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
</IfModule>
```

### Cache Headers
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 year"
</IfModule>
```

## 🎯 Hangi Yöntemi Seçmeli?

### **Basit Static Site**: Yöntem 1
- Sadece build dosyalarını upload
- En hızlı ve basit
- Admin paneli çalışmayabilir

### **Full Stack App**: Yöntem 2
- Node.js server ile
- Admin paneli çalışır
- Daha profesyonel

### **Test Amaçlı**: Yöntem 3
- Subdomain ile test
- Ana site etkilenmez

## 🚀 Önerilen Adımlar

1. **Yöntem 2'yi deneyin** (Node.js App)
2. **SSL sertifikası ekleyin**
3. **Environment variables ayarlayın**
4. **Performance optimizasyonu yapın**

Hangi yöntemi tercih ediyorsunuz? Size özel adımları detaylandırayım! 🎯