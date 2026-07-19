const postgres = require('postgres');

const sql = postgres({ 
  host: 'aws-0-eu-central-2.pooler.supabase.com', 
  port: 6543, 
  database: 'postgres', 
  user: 'postgres', 
  password: 'JzFe41TPUFOwzlDY', 
  ssl: 'require' 
});

async function setup() {
  try {
    console.log("Testing connection...");
    const res = await sql`SELECT 1 as x`;
    console.log("Connection OK", res);

    console.log("Creating saninova_expert_applications table...");
    await sql`
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
    `;

    console.log("Enabling RLS...");
    await sql`ALTER TABLE public.saninova_expert_applications ENABLE ROW LEVEL SECURITY;`;

    console.log("Creating policies...");
    // Drop existing policies if any
    await sql`DROP POLICY IF EXISTS "Allow public insert to experts" ON public.saninova_expert_applications;`;
    await sql`DROP POLICY IF EXISTS "Allow public select to experts" ON public.saninova_expert_applications;`;
    await sql`DROP POLICY IF EXISTS "Allow public update to experts" ON public.saninova_expert_applications;`;
    await sql`DROP POLICY IF EXISTS "Allow public delete to experts" ON public.saninova_expert_applications;`;

    // Allow public insert
    await sql`
      CREATE POLICY "Allow public insert to experts" 
      ON public.saninova_expert_applications 
      FOR INSERT 
      WITH CHECK (true);
    `;
    
    await sql`
      CREATE POLICY "Allow public select to experts" 
      ON public.saninova_expert_applications 
      FOR SELECT 
      USING (true);
    `;
    
    await sql`
      CREATE POLICY "Allow public update to experts" 
      ON public.saninova_expert_applications 
      FOR UPDATE
      USING (true);
    `;
    
    await sql`
      CREATE POLICY "Allow public delete to experts" 
      ON public.saninova_expert_applications 
      FOR DELETE
      USING (true);
    `;

    console.log("Done.");
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

setup();
