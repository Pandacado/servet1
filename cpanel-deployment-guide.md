# 🚀 cPanel Static Deployment Rehberi

## 📋 Gereksinimler
- cPanel erişimi
- File Manager
- FTP erişimi (opsiyonel)

## 🔧 Adım 1: Build Dosyalarını Hazırlama

### Local'de Build Oluşturma:
```bash
npm install
npm run build
```

Bu komut `dist/` klasörü oluşturacak.

## 📁 Adım 2: cPanel File Manager

### 1. cPanel'e Giriş
- cPanel'e giriş yapın
- **File Manager**'a tıklayın

### 2. public_html Klasörüne Gidin
- **public_html** klasörünü açın
- Bu ana domain'inizin klasörüdür

### 3. Mevcut Dosyaları Temizleyin (Opsiyonel)
- Eğer boş bir site ise, mevcut dosyaları silebilirsiniz
- **index.html**, **cgi-bin** dışındakileri silin

## 📤 Adım 3: Dosya Upload

### 1. Build Dosyalarını Upload Edin
`dist/` klasöründeki TÜM dosyaları public_html'e upload edin:

- **index.html**
- **assets/** klasörü (CSS, JS dosyaları)
- Diğer tüm dosyalar

### 2. Upload Yöntemleri:

#### **Yöntem A: File Manager Upload**
- File Manager'da **Upload** butonuna tıklayın
- Dosyaları seçin ve upload edin

#### **Yöntem B: ZIP Upload (Önerilen)**
- `dist/` klasörünü ZIP'leyin
- ZIP dosyasını upload edin
- **Extract** ile çıkarın

#### **Yöntem C: FTP**
- FileZilla gibi FTP client kullanın
- Dosyaları public_html'e upload edin

## ⚙️ Adım 4: .htaccess Dosyası

### public_html'de .htaccess oluşturun:

```apache
RewriteEngine On
RewriteBase /

# Handle React Router (SPA)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Cache Static Assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# Prevent access to sensitive files
<Files ".env">
    Order allow,deny
    Deny from all
</Files>

<Files "*.config.js">
    Order allow,deny
    Deny from all
</Files>
```

## 🔒 Adım 5: SSL Sertifikası

### Let's Encrypt (Ücretsiz):
1. **cPanel → SSL/TLS**
2. **Let's Encrypt**
3. Domain'inizi seçin
4. **Issue** butonuna tıklayın

### Manuel SSL:
1. **cPanel → SSL/TLS → Manage SSL Sites**
2. SSL sertifikanızı upload edin

## 🌐 Adım 6: Domain Ayarları

### Ana Domain:
- Dosyalar `public_html/` içinde olmalı
- `https://yourdomain.com` ile erişim

### Subdomain (Opsiyonel):
1. **cPanel → Subdomains**
2. `app.yourdomain.com` oluşturun
3. Document Root: `/public_html/app`
4. Dosyaları `/public_html/app/` içine upload edin

## 🎯 Adım 7: Test Etme

### 1. Site Erişimi:
- `https://yourdomain.com` açın
- Ana sayfa yüklenmeli

### 2. Routing Testi:
- `https://yourdomain.com/hizmetler` gibi sayfalara gidin
- 404 hatası almamalısınız

### 3. Admin Panel:
- `https://yourdomain.com/admin/login` test edin
- Giriş sayfası açılmalı

## ⚠️ Önemli Notlar

### Admin Panel Sınırlamaları:
- **Database işlemleri çalışmayabilir** (Supabase bağlantısı gerekli)
- **File upload çalışmayabilir**
- **Sadece frontend çalışır**

### Çözümler:
1. **Supabase kullanın** (database için)
2. **External API'ler kullanın**
3. **Static content management**

## 🔧 Sorun Giderme

### Site Açılmıyor:
- **index.html** dosyası public_html'de mi?
- **File permissions** 644 olmalı
- **SSL sertifikası** aktif mi?

### Routing Çalışmıyor:
- **.htaccess** dosyası doğru mu?
- **mod_rewrite** aktif mi? (hosting sağlayıcıya sorun)

### CSS/JS Yüklenmiyor:
- **assets/** klasörü upload edildi mi?
- **File permissions** doğru mu?
- **Cache** temizleyin

## 📊 Performans İpuçları

### 1. Image Optimization:
- Görselleri WebP formatında kullanın
- Boyutları optimize edin

### 2. CDN Kullanımı:
- Cloudflare gibi CDN servisleri
- Static asset'ler için

### 3. Cache Ayarları:
- .htaccess'te cache headers
- Browser caching aktif

## 🎉 Tamamlandı!

Site artık cPanel sunucunuzda çalışıyor olmalı!

### Sonraki Adımlar:
1. **SSL sertifikası ekleyin**
2. **Performance optimizasyonu yapın**
3. **Backup sistemi kurun**
4. **Monitoring ekleyin**

Herhangi bir sorunla karşılaşırsanız, hosting sağlayıcınızın teknik desteğine başvurabilirsiniz.