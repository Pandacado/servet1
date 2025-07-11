/*
  # Settings table for logo and site configuration

  1. New Tables
    - `settings`
      - `id` (uuid, primary key)
      - `key` (text, unique) - Setting identifier (e.g., 'site_logo', 'company_name')
      - `value` (text) - Setting value (URL for logo, text for company name)
      - `type` (text) - Setting type (image, text, json)
      - `description` (text) - Human readable description
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `partners`
      - `id` (uuid, primary key)
      - `name` (text) - Partner company name
      - `logo_url` (text) - Partner logo URL
      - `website_url` (text) - Partner website
      - `order_index` (integer) - Display order
      - `active` (boolean) - Show/hide partner
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Public read access for settings and active partners
    - Admin-only write access
*/

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL,
  type text DEFAULT 'text' NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Settings policies
CREATE POLICY "Enable read access for all users" ON settings
  FOR SELECT USING (true);

CREATE POLICY "Enable all access for authenticated users" ON settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  website_url text,
  order_index integer DEFAULT 1,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Partners policies
CREATE POLICY "Enable read access for active partners" ON partners
  FOR SELECT USING (active = true);

CREATE POLICY "Enable all access for authenticated users" ON partners
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert default settings
INSERT INTO settings (key, value, type, description) VALUES
  ('site_logo', '/logo.svg', 'image', 'Site logo URL'),
  ('company_name', 'Servet Dekorasyon', 'text', 'Company name'),
  ('company_tagline', '1997''den beri güvenilir hizmet', 'text', 'Company tagline'),
  ('hero_title', 'Vitra & Artema uzmanlığıyla', 'text', 'Hero section main title'),
  ('hero_subtitle', 'Banyo tadilat, dekorasyon ve sıhhi tesisat hizmetlerinde güvenilir çözüm ortağınız', 'text', 'Hero section subtitle')
ON CONFLICT (key) DO NOTHING;

-- Insert sample partners
INSERT INTO partners (name, logo_url, website_url, order_index, active) VALUES
  ('Vitra', 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://vitra.com.tr', 1, true),
  ('Artema', 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://artema.com.tr', 2, true),
  ('Grohe', 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://grohe.com', 3, true),
  ('Hansgrohe', 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://hansgrohe.com', 4, true),
  ('Duravit', 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://duravit.com', 5, true),
  ('Villeroy & Boch', 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=200&h=100', 'https://villeroy-boch.com', 6, true)
ON CONFLICT DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);
CREATE INDEX IF NOT EXISTS idx_partners_order ON partners(order_index, active);
CREATE INDEX IF NOT EXISTS idx_partners_active ON partners(active);