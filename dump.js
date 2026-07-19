const postgres = require('postgres');
const fs = require('fs');

const sql = postgres('postgres://postgres:Admin123@db.eqqdjqdbbwmshllqesdt.supabase.co:5432/postgres', { ssl: 'require' });

async function dumpSchema() {
  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
  `;
  
  let ddl = '';
  for (const t of tables) {
    const cols = await sql`
      SELECT column_name, data_type, is_nullable, column_default 
      FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = ${t.table_name}
    `;
    ddl += `CREATE TABLE public.${t.table_name} (\n`;
    const colDefs = cols.map(c => {
      let def = `  ${c.column_name} ${c.data_type === 'USER-DEFINED' ? 'text' : c.data_type}`;
      if (c.is_nullable === 'NO') def += ' NOT NULL';
      if (c.column_default) {
        // Fix up sequence defaults for simple migration
        if (c.column_default.includes('nextval')) {
          def = `  ${c.column_name} SERIAL`; // Fallback to serial for integer PKs
        } else {
          def += ` DEFAULT ${c.column_default}`;
        }
      }
      return def;
    });
    
    // Attempt to fetch Primary Key
    const pks = await sql`
      SELECT c.column_name
      FROM information_schema.table_constraints tc 
      JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_name) 
      JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema
        AND tc.table_name = c.table_name AND ccu.column_name = c.column_name
      WHERE constraint_type = 'PRIMARY KEY' and tc.table_name = ${t.table_name}
    `;
    if (pks.length > 0) {
      colDefs.push(`  PRIMARY KEY (${pks.map(p => p.column_name).join(', ')})`);
    }
    
    ddl += colDefs.join(',\n') + '\n);\n\n';
  }
  
  fs.writeFileSync('schema_dump.sql', ddl);
  console.log('Schema dumped!');
  
  // Now dump the data!
  const allData = {};
  for (const t of tables) {
    const rows = await sql`SELECT * FROM public.${sql(t.table_name)}`;
    allData[t.table_name] = rows;
  }
  fs.writeFileSync('data_dump.json', JSON.stringify(allData, null, 2));
  console.log('Data dumped!');
  
  process.exit(0);
}
dumpSchema().catch(console.error);
