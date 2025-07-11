@@ .. @@
 -- Enable RLS
 ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
 
+-- Create settings table
+CREATE TABLE IF NOT EXISTS settings (
+  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
+  key text UNIQUE NOT NULL,
+  value text NOT NULL,
+  type text NOT NULL DEFAULT 'text',
+  description text,
+  created_at timestamptz DEFAULT now(),
+  updated_at timestamptz DEFAULT now()
+);
+
+-- Create indexes for settings
+CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);
+
+-- Enable RLS for settings
+ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
+
+-- Create partners table
+CREATE TABLE IF NOT EXISTS partners (
+  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
+  name text NOT NULL,
+  logo_url text NOT NULL,
+  website_url text,
+  order_index integer DEFAULT 1,
+  active boolean DEFAULT true,
+  created_at timestamptz DEFAULT now()
+);
+
+-- Create indexes for partners
+CREATE INDEX IF NOT EXISTS idx_partners_order ON partners(order_index, active);
+CREATE INDEX IF NOT EXISTS idx_partners_active ON partners(active);
+
+-- Enable RLS for partners
+ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
+
 -- Create policies for blog_posts
 CREATE POLICY "Enable read access for published posts" ON blog_posts
   FOR SELECT USING (published = true);
@@ .. @@
 CREATE POLICY "Enable read for authenticated users only" ON contacts
   FOR SELECT TO authenticated USING (true);
 
+-- Create policies for settings
+CREATE POLICY "Enable read access for all users" ON settings
+  FOR SELECT USING (true);
+
+CREATE POLICY "Enable all access for authenticated users" ON settings
+  FOR ALL TO authenticated USING (true);
+
+-- Create policies for partners
+CREATE POLICY "Enable read access for active partners" ON partners
+  FOR SELECT USING (active = true);
+
+CREATE POLICY "Enable all access for authenticated users" ON partners
+  FOR ALL TO authenticated USING (true);
+
 -- Insert sample data for services
 INSERT INTO services (title, description, icon, order_index) VALUES
   ('Banyo Tadilatı', 'Modern ve fonksiyonel banyo tasarımları ile hayalinizdeki banyoyu gerçeğe dönüştürüyoruz. Vitra ve Artema ürünleri ile kaliteli çözümler sunuyoruz.', 'Bath', 1),
@@ .. @@
   ('Artema Armatürleri ile Lüks Dokunuş', 'Artema''nın premium armatürleri ile banyonuza lüks bir dokunuş katın. Kalite ve estetik bir arada.', 'Artema''nın premium armatürleri ile banyonuza lüks bir dokunuş katın.', 'Ürünler', 'Servet Dekorasyon', true, 'artema-armaturleri-ile-luks-dokunush', '<h2>Artema Armatürleri</h2><p>Artema''nın premium armatürleri ile banyonuza lüks bir dokunuş katın.</p>'),
   ('Banyo Aydınlatması Nasıl Olmalı?', 'Doğru aydınlatma ile banyonuzun atmosferini değiştirin. LED teknolojisi ve tasarım önerileri.', 'Doğru aydınlatma ile banyonuzun atmosferini değiştirin.', 'Aydınlatma', 'Servet Dekorasyon', true, 'banyo-aydinlatmasi-nasil-olmali', '<h2>Banyo Aydınlatması</h2><p>Doğru aydınlatma ile banyonuzun atmosferini değiştirin.</p>');
+
+-- Insert sample data for settings
+INSERT INTO settings (key, value, type, description) VALUES
+  ('site_logo', '/logo.svg', 'image', 'Site logosu'),
+  ('company_name', 'Servet Dekorasyon', 'text', 'Şirket adı'),
+  ('company_tagline', '1997''den beri güvenilir hizmet', 'text', 'Şirket sloganı'),
+  ('hero_title', 'Modern Banyo Tasarımları', 'text', 'Ana sayfa başlığı'),
+  ('hero_subtitle', 'Vitra & Artema ürünleri ile hayalinizdeki banyo', 'text', 'Ana sayfa alt başlığı');
+
+-- Insert sample data for partners
+INSERT INTO partners (name, logo_url, website_url, order_index, active) VALUES
+  ('Vitra', 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://vitra.com.tr', 1, true),
+  ('Artema', 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://artema.com.tr', 2, true),
+  ('Grohe', 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://grohe.com', 3, true),
+  ('Hansgrohe', 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://hansgrohe.com', 4, true),
+  ('Duravit', 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://duravit.com', 5, true),
+  ('Villeroy & Boch', 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://villeroy-boch.com', 6, true);