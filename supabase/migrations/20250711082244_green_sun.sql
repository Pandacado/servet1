@@ .. @@
   created_at timestamptz DEFAULT now()
 );

+-- Settings table for site configuration
+CREATE TABLE IF NOT EXISTS settings (
+  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
+  key text UNIQUE NOT NULL,
+  value text NOT NULL,
+  type text DEFAULT 'text' NOT NULL,
+  description text,
+  created_at timestamptz DEFAULT now(),
+  updated_at timestamptz DEFAULT now()
+);

+-- Partners table for partner logos
+CREATE TABLE IF NOT EXISTS partners (
+  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
+  name text NOT NULL,
+  logo_url text NOT NULL,
+  website_url text,
+  order_index integer DEFAULT 1,
+  active boolean DEFAULT true,
+  created_at timestamptz DEFAULT now()
+);

 -- Enable RLS on all tables
 ALTER TABLE services ENABLE ROW LEVEL SECURITY;
@@ .. @@
 ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
 ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
 ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
+ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
+ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

 -- Create policies for services
@@ .. @@
 CREATE POLICY "Enable read for authenticated users only"
   ON admin_users FOR SELECT
   TO public
   USING (role() = 'authenticated'::text);

+-- Create policies for settings
+CREATE POLICY "Enable read access for all users"
+  ON settings FOR SELECT
+  TO public
+  USING (true);

+CREATE POLICY "Enable all access for authenticated users"
+  ON settings FOR ALL
+  TO public
+  USING (role() = 'authenticated'::text);

+-- Create policies for partners
+CREATE POLICY "Enable read access for active partners"
+  ON partners FOR SELECT
+  TO public
+  USING (active = true);

+CREATE POLICY "Enable all access for authenticated users"
+  ON partners FOR ALL
+  TO public
+  USING (role() = 'authenticated'::text);

 -- Create indexes for better performance
@@ .. @@
 CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (published, created_at DESC);
 CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);
 CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts (created_at DESC);
+CREATE INDEX IF NOT EXISTS idx_settings_key ON settings (key);
+CREATE INDEX IF NOT EXISTS idx_partners_order ON partners (order_index, active);
+CREATE INDEX IF NOT EXISTS idx_partners_active ON partners (active);

 -- Insert sample data
@@ .. @@
   ('Sıhhi Tesisat', 'Profesyonel sıhhi tesisat hizmetleri ile su ve ısıtma sistemlerinizi güvence altına alıyoruz. 24/7 acil servis desteği sağlıyoruz.', 'Wrench', 3);

+-- Insert default settings
+INSERT INTO settings (key, value, type, description) VALUES
+  ('site_logo', '/logo.svg', 'image', 'Site logosu'),
+  ('company_name', 'Servet Dekorasyon', 'text', 'Şirket adı'),
+  ('company_tagline', '1997''den beri güvenilir hizmet', 'text', 'Şirket sloganı'),
+  ('hero_title', 'Banyo Tadilat ve Dekorasyon Uzmanı', 'text', 'Ana sayfa başlığı'),
+  ('hero_subtitle', 'Vitra & Artema ürünleri ile hayalinizdeki banyo', 'text', 'Ana sayfa alt başlığı'),
+  ('whatsapp_number', '905551234567', 'tel', 'WhatsApp telefon numarası'),
+  ('whatsapp_message', 'Merhaba! Web sitenizden geliyorum. Banyo tadilat/dekorasyon hizmetleriniz hakkında bilgi almak istiyorum.', 'textarea', 'WhatsApp varsayılan mesajı');

+-- Insert sample partners
+INSERT INTO partners (name, logo_url, website_url, order_index, active) VALUES
+  ('Vitra', 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://vitra.com.tr', 1, true),
+  ('Artema', 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://artema.com.tr', 2, true),
+  ('Grohe', 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://grohe.com', 3, true),
+  ('Hansgrohe', 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://hansgrohe.com', 4, true),
+  ('Duravit', 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://duravit.com', 5, true),
+  ('Villeroy & Boch', 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://villeroy-boch.com', 6, true);

 -- Insert sample references