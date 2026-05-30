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
