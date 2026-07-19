const postgres = require('postgres');

const oldSql = postgres({ host: 'aws-0-eu-west-1.pooler.supabase.com', port: 6543, database: 'postgres', user: 'postgres.eqqdjqdbbwmshllqesdt', password: 'dsMvBbmt8tpP4EsS', ssl: 'require' });
const newSql = postgres({ host: 'aws-0-eu-central-2.pooler.supabase.com', port: 6543, database: 'postgres', user: 'postgres.zrbtzqcqzfksimmkxjvr', password: 'JzFe41TPUFOwzlDY', ssl: 'require' });

async function migrate() {
  try {
    console.log('Fetching tables from old database...');
    // We only care about specific tables to avoid system tables or migrations
    const tables = [
      'saninova_site_settings', 'saninova_contacts', 'saninova_publications', 
      'saninova_comments', 'academy_trainings', 'academy_registrations', 
      'academy_announcements', 'academy_events'
    ];

    for (const tableName of tables) {
      console.log(`Processing table: ${tableName}`);
      
      // 1. Fetch schema
      const cols = await oldSql`
        SELECT column_name, data_type, is_nullable, column_default, character_maximum_length
        FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = ${tableName}
      `;
      
      if (cols.length === 0) {
        console.log(`Table ${tableName} not found in old DB. Skipping.`);
        continue;
      }
      
      // 2. Build DDL
      let ddl = `CREATE TABLE IF NOT EXISTS public.${tableName} (\n`;
      const colDefs = cols.map(c => {
        let type = c.data_type;
        if (type === 'USER-DEFINED') type = 'text'; // Fallback
        if (type === 'character varying' && c.character_maximum_length) {
            type = `varchar(${c.character_maximum_length})`;
        }
        
        let def = `  "${c.column_name}" ${type}`;
        
        // Handle defaults and nullability
        if (c.column_default) {
          if (c.column_default.includes('nextval')) {
            def = `  "${c.column_name}" SERIAL`;
          } else {
            def += ` DEFAULT ${c.column_default}`;
          }
        }
        if (c.is_nullable === 'NO' && !c.column_default?.includes('nextval')) {
           def += ' NOT NULL';
        }
        return def;
      });
      
      // Primary keys
      const pks = await oldSql`
        SELECT c.column_name
        FROM information_schema.table_constraints tc 
        JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_name) 
        JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema
          AND tc.table_name = c.table_name AND ccu.column_name = c.column_name
        WHERE constraint_type = 'PRIMARY KEY' and tc.table_name = ${tableName}
      `;
      if (pks.length > 0) {
        colDefs.push(`  PRIMARY KEY (${pks.map(p => `"${p.column_name}"`).join(', ')})`);
      }
      
      ddl += colDefs.join(',\n') + '\n);';
      
      // 3. Create table in new DB
      console.log(`Creating table ${tableName} in new DB...`);
      await newSql.unsafe(ddl);
      
      // 4. Copy data
      const rows = await oldSql`SELECT * FROM public.${oldSql(tableName)}`;
      if (rows.length > 0) {
        console.log(`Inserting ${rows.length} rows into ${tableName}...`);
        await newSql`INSERT INTO public.${newSql(tableName)} ${newSql(rows)}`;
      } else {
        console.log(`No data to insert for ${tableName}.`);
      }
      
      // 5. Add RLS Policies for the tables
      // For SaniNova, we usually want public read/write depending on the table.
      // We will allow all operations for now, as it's an internal admin-managed system mostly,
      // and RLS was blocking likes earlier.
      await newSql.unsafe(`ALTER TABLE public.${tableName} ENABLE ROW LEVEL SECURITY;`);
      await newSql.unsafe(`
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM pg_policies WHERE tablename = '${tableName}' AND policyname = 'Allow public access to ${tableName}'
            ) THEN
                CREATE POLICY "Allow public access to ${tableName}" ON public.${tableName} FOR ALL USING (true) WITH CHECK (true);
            END IF;
        END
        $$;
      `);
      console.log(`Done with ${tableName}`);
    }
    
    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
