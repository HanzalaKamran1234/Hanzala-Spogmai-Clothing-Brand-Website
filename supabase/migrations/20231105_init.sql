-- 20231105_init.sql – Supabase migration for Spogmai e‑commerce
-- Run this with `supabase db push` or paste into the Supabase SQL editor.

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================
-- 1. USERS & PROFILES (Supabase auth provides the users table)
-- =============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- =============================================================
-- 2. TAXONOMY – CATEGORIES & COLLECTIONS
-- =============================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.collections (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now()
);

-- =============================================================
-- 3. PRODUCTS & VARIANTS
-- =============================================================
CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  price numeric(12,2) NOT NULL,
  sale_price numeric(12,2),
  sku text,
  category_id uuid REFERENCES public.categories(id),
  collection_id uuid REFERENCES public.collections(id),
  is_featured boolean DEFAULT false,
  is_best_seller boolean DEFAULT false,
  is_new_arrival boolean DEFAULT false,
  published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.product_images (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  url text NOT NULL,
  position int,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.product_variants (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  colour text,
  size text,
  sku text,
  stock int DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- =============================================================
-- 4. INVENTORY – separate table for atomic updates
-- =============================================================
CREATE TABLE IF NOT EXISTS public.inventory (
  variant_id uuid PRIMARY KEY REFERENCES public.product_variants(id) ON DELETE CASCADE,
  quantity int NOT NULL,
  updated_at timestamp with time zone DEFAULT now()
);

-- =============================================================
-- 5. COUPONS
-- =============================================================
CREATE TABLE IF NOT EXISTS public.coupons (
  code text PRIMARY KEY,
  discount_type text NOT NULL CHECK (discount_type IN ('percent','fixed')),
  discount_value numeric(6,2) NOT NULL,
  expires_at timestamp with time zone,
  min_order_value numeric(12,2),
  usage_limit int,
  used_count int DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- =============================================================
-- 6. ORDERS & ORDER_ITEMS
-- =============================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  status text NOT NULL DEFAULT 'pending',
  total numeric(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'PKR',
  shipping_address jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  variant_id uuid REFERENCES public.product_variants(id),
  quantity int NOT NULL,
  price_at_purchase numeric(12,2) NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- =============================================================
-- 7. WISHLISTS
-- =============================================================
CREATE TABLE IF NOT EXISTS public.wishlists (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.wishlist_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  wishlist_id uuid REFERENCES public.wishlists(id) ON DELETE CASCADE,
  variant_id uuid REFERENCES public.product_variants(id),
  created_at timestamp with time zone DEFAULT now()
);

-- =============================================================
-- 8. SITE SETTINGS & HOME PAGE SECTIONS (content management)
-- =============================================================
CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value text,
  updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.homepage_sections (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  type text NOT NULL,
  content jsonb,
  position int,
  created_at timestamp with time zone DEFAULT now()
);

-- =============================================================
-- 9. ROW‑LEVEL SECURITY (RLS) POLICIES
-- =============================================================
-- Enable RLS on all tables
SELECT
  enable_row_level_security('profiles'),
  enable_row_level_security('categories'),
  enable_row_level_security('collections'),
  enable_row_level_security('products'),
  enable_row_level_security('product_images'),
  enable_row_level_security('product_variants'),
  enable_row_level_security('inventory'),
  enable_row_level_security('coupons'),
  enable_row_level_security('orders'),
  enable_row_level_security('order_items'),
  enable_row_level_security('wishlists'),
  enable_row_level_security('wishlist_items'),
  enable_row_level_security('site_settings'),
  enable_row_level_security('homepage_sections');

-- PUBLIC READ POLICIES
CREATE POLICY "public read published products"
  ON public.products
  FOR SELECT USING (published = true);

CREATE POLICY "public read categories"
  ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "public read collections"
  ON public.collections
  FOR SELECT USING (true);

-- ADMIN WRITE POLICIES (requires role = 'admin')
CREATE POLICY "admin manage products"
  ON public.products
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');

CREATE POLICY "admin manage categories"
  ON public.categories
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');

CREATE POLICY "admin manage collections"
  ON public.collections
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');

CREATE POLICY "admin manage variants"
  ON public.product_variants
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');

CREATE POLICY "admin manage inventory"
  ON public.inventory
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');

CREATE POLICY "admin manage coupons"
  ON public.coupons
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');

CREATE POLICY "admin manage orders"
  ON public.orders
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');

CREATE POLICY "admin manage order_items"
  ON public.order_items
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');

CREATE POLICY "admin manage wishlist"
  ON public.wishlists
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');

CREATE POLICY "admin manage wishlist_items"
  ON public.wishlist_items
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');

CREATE POLICY "admin manage site settings"
  ON public.site_settings
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');

CREATE POLICY "admin manage homepage sections"
  ON public.homepage_sections
  FOR ALL USING (auth.role() = 'admin') WITH CHECK (auth.role() = 'admin');

-- USER‑LEVEL POLICIES
-- Profiles: each user can read/write their own profile
CREATE POLICY "profile owner"
  ON public.profiles
  FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Wishlists: each user owns a single wishlist (created on demand)
CREATE POLICY "wishlist owner"
  ON public.wishlists
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "wishlist items owner"
  ON public.wishlist_items
  USING (EXISTS (SELECT 1 FROM public.wishlists w WHERE w.id = wishlist_id AND w.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.wishlists w WHERE w.id = wishlist_id AND w.user_id = auth.uid()));

-- Orders: users can read/write their own orders; admin can manage all
CREATE POLICY "order owner"
  ON public.orders
  FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'admin');

CREATE POLICY "order write owner"
  ON public.orders
  FOR INSERT, UPDATE, DELETE USING (auth.uid() = user_id OR auth.role() = 'admin');

CREATE POLICY "order_items owner"
  ON public.order_items
  USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR auth.role() = 'admin')));

-- -------------------------------------------------
-- 10. SERVER‑SIDE FUNCTION FOR ATOMIC STOCK DECREMENT
-- -------------------------------------------------
CREATE OR REPLACE FUNCTION public.decrement_stock(p_variant_id uuid, p_qty int)
RETURNS void AS $$
BEGIN
  UPDATE public.inventory
  SET quantity = quantity - p_qty,
      updated_at = now()
  WHERE variant_id = p_variant_id AND quantity >= p_qty;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient stock for variant %', p_variant_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant the function to the anon role (it will be called via RPC)
GRANT EXECUTE ON FUNCTION public.decrement_stock(uuid, int) TO anon;

-- End of migration
