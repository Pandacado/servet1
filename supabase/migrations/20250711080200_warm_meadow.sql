/*
  # Servet Dekorasyon Tadilat - Veritabanı Şeması

  1. Yeni Tablolar
    - `services` - Hizmetler yönetimi
      - `id` (uuid, primary key)
      - `title` (text, hizmet başlığı)
      - `description` (text, açıklama)
      - `icon` (text, ikon adı)
      - `order_index` (integer, sıralama)
      - `created_at` (timestamp)
    
    - `blog_posts` - Blog yazıları
      - `id` (uuid, primary key)
      - `title` (text, başlık)
      - `content` (text, HTML içerik)
      - `excerpt` (text, özet)
      - `category` (text, kategori)
      - `author` (text, yazar)
      - `published_date` (timestamp)
      - `slug` (text, URL slug)
      - `created_at` (timestamp)
    
    - `references` - Referans projeleri
      - `id` (uuid, primary key)
      - `image_url` (text, görsel URL)
      - `title` (text, proje başlığı)
      - `description` (text, açıklama)
      - `created_at` (timestamp)
    
    - `contacts` - İletişim formları
      - `id` (uuid, primary key)
      - `name` (text, ad soyad)
      - `email` (text, e-posta)
      - `phone` (text, telefon)
      - `message` (text, mesaj)
      - `created_at` (timestamp)
    
    - `admin_users` - Admin kullanıcıları
      - `id` (uuid, primary key, auth.users referansı)
      - `email` (text, e-posta)
      - `created_at` (timestamp)

  2. Güvenlik
    - Tüm tablolarda RLS (Row Level Security) aktif
    - Admin kullanıcıları için özel politikalar
    - Public okuma, admin yazma yetkisi

  3. İndeksler
    - Blog slug için unique index
    - Tarih sıralaması için indexler
    - Arama için text indexler
*/

-- Services tablosu
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT 'Bath',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Public okuma izni
CREATE POLICY "Anyone can read services"
  ON services
  FOR SELECT
  TO public
  USING (true);

-- Admin yazma izni
CREATE POLICY "Admins can manage services"
  ON services
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- Blog posts tablosu
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  category text NOT NULL DEFAULT 'Genel',
  author text NOT NULL DEFAULT 'Servet Dekorasyon',
  published_date timestamptz DEFAULT now(),
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public okuma izni
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (true);

-- Admin yazma izni
CREATE POLICY "Admins can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- References tablosu
CREATE TABLE IF NOT EXISTS references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE references ENABLE ROW LEVEL SECURITY;

-- Public okuma izni
CREATE POLICY "Anyone can read references"
  ON references
  FOR SELECT
  TO public
  USING (true);

-- Admin yazma izni
CREATE POLICY "Admins can manage references"
  ON references
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- Contacts tablosu
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Herkes form gönderebilir
CREATE POLICY "Anyone can submit contact form"
  ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Admin okuma izni
CREATE POLICY "Admins can read contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid()
    )
  );

-- Admin users tablosu
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Admin kendi bilgilerini okuyabilir
CREATE POLICY "Admins can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_date ON blog_posts(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(order_index);
CREATE INDEX IF NOT EXISTS idx_references_created_at ON references(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Örnek veri ekleme
INSERT INTO services (title, description, icon, order_index) VALUES
('Banyo Tadilatı', 'Modern ve fonksiyonel banyo tasarımları ile hayalinizdeki banyoyu gerçeğe dönüştürüyoruz. Vitra ve Artema ürünleri ile kaliteli çözümler sunuyoruz.', 'Bath', 1),
('Dekorasyon', 'Yaşam alanlarınızı estetik ve kullanışlı dekorasyon çözümleriyle yeniliyoruz. Modern tasarım anlayışı ile fonksiyonelliği birleştiriyoruz.', 'Palette', 2),
('Sıhhi Tesisat', 'Profesyonel sıhhi tesisat hizmetleri ile su ve ısıtma sistemlerinizi güvence altına alıyoruz. 24/7 acil servis desteği sağlıyoruz.', 'Wrench', 3)
ON CONFLICT DO NOTHING;

INSERT INTO blog_posts (title, content, excerpt, category, slug) VALUES
('Modern Banyo Dekorasyon Trendleri 2024', '<h2>2024 Banyo Tasarım Trendleri</h2><p>Bu yıl banyo dekorasyonunda öne çıkan trendler, minimalist tasarım anlayışı ile fonksiyonelliği birleştiriyor...</p>', '2024 yılında banyo dekorasyonunda hangi trendler öne çıkıyor? Modern tasarım anlayışı ile fonksiyonelliği birleştiren en yeni yaklaşımları keşfedin.', 'Dekorasyon', 'modern-banyo-dekorasyon-trendleri-2024'),
('Vitra Ürünleri ile Banyo Yenileme', '<h2>Vitra ile Banyo Yenileme</h2><p>Kaliteli Vitra ürünleri ile banyonuzu nasıl yenileyebilirsiniz? 27 yıllık deneyimimizle size rehberlik ediyoruz...</p>', 'Kaliteli Vitra ürünleri ile banyonuzu nasıl yenileyebilirsiniz? Uzman önerilerimiz ve uygulama detayları.', 'Tadilat', 'vitra-urunleri-ile-banyo-yenileme'),
('Sıhhi Tesisat Bakım İpuçları', '<h2>Sıhhi Tesisat Bakımı</h2><p>Evinizin sıhhi tesisat sistemlerini nasıl bakımda tutabilirsiniz? Uzmanlarımızdan pratik öneriler...</p>', 'Evinizin sıhhi tesisat sistemlerini nasıl bakımda tutabilirsiniz? Uzmanlarımızdan pratik öneriler.', 'Bakım', 'sihhi-tesisat-bakim-ipuclari')
ON CONFLICT DO NOTHING;

INSERT INTO references (image_url, title, description) VALUES
('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800', 'Modern Banyo Tasarımı', 'Vitra ürünleri ile modern ve şık banyo tasarımı'),
('https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800', 'Lüks Banyo Dekorasyonu', 'Artema armatürleri ile lüks banyo dekorasyonu'),
('https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800', 'Kompakt Banyo Çözümü', 'Küçük alanlarda maksimum verimlilik'),
('https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800', 'Klasik Banyo Tasarımı', 'Zamansız elegans ve fonksiyonellik')
ON CONFLICT DO NOTHING;