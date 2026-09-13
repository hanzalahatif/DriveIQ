/*
# Create cars and categories tables (single-tenant, no auth)

1. New Tables
- `categories`
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `description` (text)
  - `image_url` (text)
  - `vehicle_count` (integer, default 0)
  - `display_order` (integer, default 0)
  - `created_at` (timestamp)
- `cars`
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `price` (text, not null)
  - `fuel_type` (text, not null)
  - `transmission` (text, not null)
  - `match_score` (integer, default 0)
  - `image_url` (text)
  - `category_id` (uuid, foreign key to categories, nullable)
  - `is_trending` (boolean, default false)
  - `created_at` (timestamp)

2. Security
- Enable RLS on both tables.
- Allow anon + authenticated CRUD because this is a single-tenant app with no sign-in.
- All data is intentionally public/shared.

3. Notes
- Categories table stores the 8 vehicle types shown on the homepage.
- Cars table stores trending vehicles and all car listings.
- `is_trending` flag controls which cars appear in the Trending carousel.
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  vehicle_count integer NOT NULL DEFAULT 0,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_categories" ON categories;
CREATE POLICY "anon_insert_categories" ON categories FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_categories" ON categories;
CREATE POLICY "anon_update_categories" ON categories FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_categories" ON categories;
CREATE POLICY "anon_delete_categories" ON categories FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price text NOT NULL,
  fuel_type text NOT NULL,
  transmission text NOT NULL,
  match_score integer NOT NULL DEFAULT 0,
  image_url text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  is_trending boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_cars" ON cars;
CREATE POLICY "anon_select_cars" ON cars FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_cars" ON cars;
CREATE POLICY "anon_insert_cars" ON cars FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_cars" ON cars;
CREATE POLICY "anon_update_cars" ON cars FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_cars" ON cars;
CREATE POLICY "anon_delete_cars" ON cars FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_cars_category_id ON cars(category_id);
CREATE INDEX IF NOT EXISTS idx_cars_is_trending ON cars(is_trending);
