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

    console.log("Creating saninova_resources table...");
    await sql`
      CREATE TABLE IF NOT EXISTS public.saninova_resources (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        file_type TEXT NOT NULL,
        file_url TEXT NOT NULL,
        is_free BOOLEAN DEFAULT true,
        price_usd NUMERIC DEFAULT 0,
        thumbnail_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    console.log("Enabling RLS...");
    await sql`ALTER TABLE public.saninova_resources ENABLE ROW LEVEL SECURITY;`;

    console.log("Creating policies...");
    // Drop existing policies if any
    await sql`DROP POLICY IF EXISTS "Allow public insert to resources" ON public.saninova_resources;`;
    await sql`DROP POLICY IF EXISTS "Allow public select to resources" ON public.saninova_resources;`;
    await sql`DROP POLICY IF EXISTS "Allow public update to resources" ON public.saninova_resources;`;
    await sql`DROP POLICY IF EXISTS "Allow public delete to resources" ON public.saninova_resources;`;

    // Allow public access (since the admin dashboard needs to mutate, and public needs to read)
    await sql`
      CREATE POLICY "Allow public insert to resources" 
      ON public.saninova_resources 
      FOR INSERT 
      WITH CHECK (true);
    `;
    
    await sql`
      CREATE POLICY "Allow public select to resources" 
      ON public.saninova_resources 
      FOR SELECT 
      USING (true);
    `;
    
    await sql`
      CREATE POLICY "Allow public update to resources" 
      ON public.saninova_resources 
      FOR UPDATE
      USING (true);
    `;
    
    await sql`
      CREATE POLICY "Allow public delete to resources" 
      ON public.saninova_resources 
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
