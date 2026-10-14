-- =====================================================================
-- SaniNova Academy : documents de formation réservés aux participants
-- À exécuter UNE FOIS dans Supabase > SQL Editor > New query > Run
-- =====================================================================

-- 1. Table des métadonnées des documents
create table if not exists public.academy_course_documents (
  id uuid primary key default gen_random_uuid(),
  training_slug text not null default 'officine-moderne',
  title text not null,
  description text,
  file_url text not null,
  file_type text default 'PDF',
  category text default 'Support de cours',
  target_audience text default 'all',
  participant_email text,
  participant_name text,
  created_at timestamptz not null default now()
);

-- Ajout des colonnes pour les bases existantes
alter table public.academy_course_documents add column if not exists target_audience text default 'all';
alter table public.academy_course_documents add column if not exists participant_email text;
alter table public.academy_course_documents add column if not exists participant_name text;

alter table public.academy_course_documents enable row level security;

drop policy if exists "academy_docs_select" on public.academy_course_documents;
drop policy if exists "academy_docs_insert" on public.academy_course_documents;
drop policy if exists "academy_docs_update" on public.academy_course_documents;
drop policy if exists "academy_docs_delete" on public.academy_course_documents;

create policy "academy_docs_select" on public.academy_course_documents for select using (true);
create policy "academy_docs_insert" on public.academy_course_documents for insert with check (true);
create policy "academy_docs_update" on public.academy_course_documents for update using (true);
create policy "academy_docs_delete" on public.academy_course_documents for delete using (true);

-- 2. Bucket de stockage public pour les fichiers (PDF, Word, PPTX...)
insert into storage.buckets (id, name, public, file_size_limit)
values ('academy-documents', 'academy-documents', true, 52428800) -- 50 Mo max par fichier
on conflict (id) do update set public = true, file_size_limit = 52428800;

drop policy if exists "academy_docs_storage_read"   on storage.objects;
drop policy if exists "academy_docs_storage_insert" on storage.objects;
drop policy if exists "academy_docs_storage_delete" on storage.objects;

create policy "academy_docs_storage_read"   on storage.objects for select using (bucket_id = 'academy-documents');
create policy "academy_docs_storage_insert" on storage.objects for insert with check (bucket_id = 'academy-documents');
create policy "academy_docs_storage_delete" on storage.objects for delete using (bucket_id = 'academy-documents');

-- 3. Document initial (programme officiel déjà présent sur le site)
insert into public.academy_course_documents (training_slug, title, description, file_url, file_type, category)
select 'officine-moderne',
       'Programme Officiel & Calendrier de la Formation - Gestion d''une Officine Moderne',
       'Guide complet du participant, planning des modules et objectifs pédagogiques détaillés.',
       '/documents/resources/2ws8idp802j_1782039755614.pdf', 'PDF', 'Agenda'
where not exists (select 1 from public.academy_course_documents);
