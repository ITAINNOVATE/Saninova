-- Table pour stocker les réponses aux enquêtes de satisfaction de la SaniNova Academy
CREATE TABLE IF NOT EXISTS public.academy_satisfaction_surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  training_slug TEXT NOT NULL DEFAULT 'officine-moderne',
  participant_name TEXT NOT NULL,
  participant_email TEXT NOT NULL,
  participant_role TEXT,
  answers JSONB NOT NULL,
  suggestions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour optimiser les requêtes par formation et email
CREATE INDEX IF NOT EXISTS idx_academy_surveys_training ON public.academy_satisfaction_surveys (training_slug);
CREATE INDEX IF NOT EXISTS idx_academy_surveys_email ON public.academy_satisfaction_surveys (participant_email);

-- Politiques de sécurité RLS (Row Level Security)
ALTER TABLE public.academy_satisfaction_surveys ENABLE ROW LEVEL SECURITY;

-- Lecture publique ou authentifiée
CREATE POLICY "Allow public select on academy_satisfaction_surveys"
  ON public.academy_satisfaction_surveys
  FOR SELECT
  USING (true);

-- Insertion autorisée pour tout apprenant qui soumet son formulaire
CREATE POLICY "Allow public insert on academy_satisfaction_surveys"
  ON public.academy_satisfaction_surveys
  FOR INSERT
  WITH CHECK (true);

-- Mise à jour autorisée (ex: correction ou modification)
CREATE POLICY "Allow public update on academy_satisfaction_surveys"
  ON public.academy_satisfaction_surveys
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
