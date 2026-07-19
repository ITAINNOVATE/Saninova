const oldUrl = 'https://eqqdjqdbbwmshllqesdt.supabase.co/rest/v1';
const oldKey = process.env.SUPABASE_OLD_KEY || 'YOUR_OLD_SUPABASE_KEY_HERE';

const newUrl = 'https://zrbtzqcqzfksimmkxjvr.supabase.co/rest/v1';
const newKey = process.env.SUPABASE_NEW_KEY || 'YOUR_NEW_SUPABASE_KEY_HERE';

async function migrateData() {
  console.log('Fetching from saninova_site_settings...');
  const res = await fetch(`${oldUrl}/saninova_site_settings?select=*`, {
    headers: { 'apikey': oldKey }
  });
  const rows = await res.json();
  
  const insertRes = await fetch(`${newUrl}/saninova_site_settings`, {
    method: 'POST',
    headers: {
      'apikey': newKey,
      'Authorization': `Bearer ${newKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(rows)
  });
  
  if (!insertRes.ok) {
    console.error(`Failed to insert into saninova_site_settings:`, await insertRes.text());
  } else {
    console.log(`Successfully migrated saninova_site_settings!`);
  }
}

migrateData().catch(console.error);
