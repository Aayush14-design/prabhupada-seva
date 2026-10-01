-- ========================================================
-- Prabhupada Seva - Supabase Database Schema
-- Run this script in the Supabase SQL Editor to create tables
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Sources Table
CREATE TABLE IF NOT EXISTS public.sources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    publisher TEXT,
    author TEXT,
    url TEXT,
    type TEXT,
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Timeline Table
CREATE TABLE IF NOT EXISTS public.timeline (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    year TEXT NOT NULL,
    title TEXT NOT NULL,
    era TEXT NOT NULL, -- 'early', 'preparation', 'jaladuta', 'west', 'expansion'
    summary TEXT NOT NULL,
    details TEXT,
    source_id TEXT REFERENCES public.sources(id) ON DELETE SET NULL,
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Lilas & Remembrances Table
CREATE TABLE IF NOT EXISTS public.lilas (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    period TEXT,
    category TEXT NOT NULL, -- 'preparation', 'jaladuta', 'west', 'general'
    status TEXT DEFAULT 'draft', -- 'draft', 'verified'
    content_type TEXT DEFAULT 'devotee-account', -- 'devotee-account', 'historical-fact', 'reflection'
    summary TEXT NOT NULL,
    full_story TEXT NOT NULL,
    source_title TEXT NOT NULL,
    source_author TEXT,
    reflection TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Teachings Table
CREATE TABLE IF NOT EXISTS public.teachings (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    level TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    key_takeaways TEXT[], -- Array of strings
    citation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Books Table
CREATE TABLE IF NOT EXISTS public.books (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    language TEXT,
    category TEXT,
    summary TEXT NOT NULL,
    authorized_url TEXT,
    cover_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================================
-- Row Level Security (RLS) Policies
-- ========================================================

ALTER TABLE public.sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lilas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access to all tables
CREATE POLICY "Allow public read access on sources" ON public.sources FOR SELECT USING (true);
CREATE POLICY "Allow public read access on timeline" ON public.timeline FOR SELECT USING (true);
CREATE POLICY "Allow public read access on lilas" ON public.lilas FOR SELECT USING (true);
CREATE POLICY "Allow public read access on teachings" ON public.teachings FOR SELECT USING (true);
CREATE POLICY "Allow public read access on books" ON public.books FOR SELECT USING (true);

-- Allow Anonymous/Authenticated Insert & Update for Admin Portal
CREATE POLICY "Allow insert on lilas" ON public.lilas FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert on timeline" ON public.timeline FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert on sources" ON public.sources FOR INSERT WITH CHECK (true);

-- ========================================================
-- Seed Initial Data
-- ========================================================

INSERT INTO public.sources (id, name, publisher, url, type, verified) VALUES
('gbc-biography', 'Official Biography of Srila Prabhupada', 'ISKCON Governing Body Commission', 'https://gbc.iskcon.org/srila-prabhupada/', 'Official institutional biography', true),
('iskcon-history', 'History & Evolution of ISKCON', 'ISKCON Communications', 'https://iskcon.org/history/', 'Official institutional history', true),
('prabhupada-lilamrita', 'Srila Prabhupada-lilamrta', 'Bhaktivedanta Book Trust (BBT)', 'https://vedabase.io/en/library/spl/', 'Authorized biography', true),
('vedabase-archives', 'Bhaktivedanta Vedabase Digital Archives', 'BBT Archives', 'https://vedabase.io/', 'Primary source archives', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.timeline (id, year, title, era, summary, details, source_id, verified) VALUES
('t1', '1896', 'Appearance in Calcutta', 'early', 'Born as Abhay Charan De on September 1, 1896, in Calcutta on the day of Nandotsava.', 'His parents, Gour Mohan De and Rajani De, were devout Vaishnavas who nurtured his spiritual inclination.', 'gbc-biography', true),
('t2', '1922', 'First Meeting with Srila Bhaktisiddhanta', 'preparation', 'Met his spiritual master, Srila Bhaktisiddhanta Sarasvati Goswami Maharaja, in Calcutta.', 'During their very first meeting, Srila Bhaktisiddhanta requested Abhay to preach the message of Chaitanya Mahaprabhu in English.', 'prabhupada-lilamrita', true),
('t3', '1965', 'Historic Voyage on the Jaladuta', 'jaladuta', 'Boarded the cargo ship Jaladuta bound for New York City at age 69.', 'During the 38-day journey across ocean storms, he suffered two heart attacks before arriving safely in Boston.', 'iskcon-history', true)
ON CONFLICT (id) DO NOTHING;
