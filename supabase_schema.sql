-- 1. Create tables

-- Payments table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL CHECK (type IN ('donation', 'purchase')),
    amount NUMERIC NOT NULL,
    phone TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
    checkout_request_id TEXT UNIQUE NOT NULL,
    mpesa_receipt TEXT,
    product_id UUID,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Products (Magazines) table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    file_path TEXT NOT NULL,
    image_path TEXT,
    type TEXT DEFAULT 'Digital',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Downloads table (for secure delivery)
CREATE TABLE IF NOT EXISTS public.downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID REFERENCES public.payments(id),
    token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    download_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enquiries table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Indexes
CREATE INDEX IF NOT EXISTS idx_payments_checkout_id ON public.payments(checkout_request_id);
CREATE INDEX IF NOT EXISTS idx_payments_receipt ON public.payments(mpesa_receipt);
CREATE INDEX IF NOT EXISTS idx_downloads_token ON public.downloads(token);

-- 3. Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies

-- Products: Everyone can view, only Admin can manage
CREATE POLICY "Products are viewable by everyone" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage products" ON public.products
    FOR ALL USING (auth.role() = 'authenticated');

-- Payments: Public can insert (via API), only Admin can select
CREATE POLICY "Public can insert payments" ON public.payments
    FOR INSERT WITH CHECK (true);

-- Enquiries: Public can insert, only Admin can select
CREATE POLICY "Public can insert enquiries" ON public.enquiries
    FOR INSERT WITH CHECK (true);

-- Donations table
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    amount NUMERIC NOT NULL,
    cause TEXT NOT NULL,
    phone_number TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for donations
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Donations: Public can insert, only Admin can select
CREATE POLICY "Public can insert donations" ON public.donations
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all donations" ON public.donations
    FOR SELECT USING (auth.role() = 'authenticated');
