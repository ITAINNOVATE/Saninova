-- ==========================================
-- CREATE EXPERT APPLICATIONS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.saninova_expert_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  domain TEXT NOT NULL,
  cv_link TEXT,
  message TEXT,
  status TEXT DEFAULT 'Nouveau',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.saninova_expert_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert to experts" ON public.saninova_expert_applications;
DROP POLICY IF EXISTS "Allow public select to experts" ON public.saninova_expert_applications;
DROP POLICY IF EXISTS "Allow public update to experts" ON public.saninova_expert_applications;
DROP POLICY IF EXISTS "Allow public delete to experts" ON public.saninova_expert_applications;

CREATE POLICY "Allow public insert to experts" ON public.saninova_expert_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select to experts" ON public.saninova_expert_applications FOR SELECT USING (true);
CREATE POLICY "Allow public update to experts" ON public.saninova_expert_applications FOR UPDATE USING (true);
CREATE POLICY "Allow public delete to experts" ON public.saninova_expert_applications FOR DELETE USING (true);

-- ==========================================
-- CREATE PUBLICATION SUBMISSIONS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.saninova_publication_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  structure TEXT NOT NULL,
  author TEXT NOT NULL,
  title TEXT NOT NULL,
  content_file_url TEXT NOT NULL,
  image_url TEXT,
  email TEXT NOT NULL,
  contact TEXT,
  status TEXT DEFAULT 'Nouveau',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.saninova_publication_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert to pub submissions" ON public.saninova_publication_submissions;
DROP POLICY IF EXISTS "Allow public select to pub submissions" ON public.saninova_publication_submissions;
DROP POLICY IF EXISTS "Allow public update to pub submissions" ON public.saninova_publication_submissions;
DROP POLICY IF EXISTS "Allow public delete to pub submissions" ON public.saninova_publication_submissions;

CREATE POLICY "Allow public insert to pub submissions" ON public.saninova_publication_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select to pub submissions" ON public.saninova_publication_submissions FOR SELECT USING (true);
CREATE POLICY "Allow public update to pub submissions" ON public.saninova_publication_submissions FOR UPDATE USING (true);
CREATE POLICY "Allow public delete to pub submissions" ON public.saninova_publication_submissions FOR DELETE USING (true);

-- ==========================================
-- CREATE NEWSLETTER SUBSCRIBERS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.saninova_newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.saninova_newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert to newsletter" ON public.saninova_newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public select to newsletter" ON public.saninova_newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public update to newsletter" ON public.saninova_newsletter_subscribers;
DROP POLICY IF EXISTS "Allow public delete to newsletter" ON public.saninova_newsletter_subscribers;

CREATE POLICY "Allow public insert to newsletter" ON public.saninova_newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select to newsletter" ON public.saninova_newsletter_subscribers FOR SELECT USING (true);
CREATE POLICY "Allow public update to newsletter" ON public.saninova_newsletter_subscribers FOR UPDATE USING (true);
CREATE POLICY "Allow public delete to newsletter" ON public.saninova_newsletter_subscribers FOR DELETE USING (true);

