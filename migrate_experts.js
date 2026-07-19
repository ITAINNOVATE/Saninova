const postgres = require('postgres');
const sql = postgres('postgres://postgres:Admin123@db.eqqdjqdbbwmshllqesdt.supabase.co:5432/postgres', { ssl: 'require' });

async function run() {
  try {
    await sql`DROP TABLE IF EXISTS public.saninova_expert_applications CASCADE;`;
    
    await sql`
      CREATE TABLE public.saninova_expert_applications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        last_name TEXT NOT NULL,
        first_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        country TEXT NOT NULL,
        city TEXT,
        professional_status TEXT NOT NULL,
        job_title TEXT,
        institution TEXT,
        experience_years TEXT NOT NULL,
        education_level TEXT,
        domains JSONB NOT NULL DEFAULT '[]'::jsonb,
        collaboration_types JSONB DEFAULT '[]'::jsonb,
        availability TEXT,
        languages JSONB DEFAULT '[]'::jsonb,
        biography TEXT,
        cv_link TEXT,
        consent BOOLEAN NOT NULL DEFAULT false,
        status TEXT NOT NULL DEFAULT 'Nouveau',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    console.log("Table recreated successfully.");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

run();
