import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual simple parsing of .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envStr = fs.readFileSync(envPath, 'utf-8');
const env: Record<string, string> = {};
for (const line of envStr.split('\n')) {
  if (line.includes('=')) {
    const [k, ...v] = line.split('=');
    env[k.trim()] = v.join('=').trim().replace(/^['"]|['"]$/g, '');
  }
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  const { data, error } = await supabase.from('invitations').select('*').limit(1);
  if (error) {
    console.error('Error fetching invitations:', error);
    return;
  }
  
  if (data && data.length > 0) {
    console.log('Columns in invitations:');
    console.log(Object.keys(data[0]));
  } else {
    console.log('Table exists but is empty. Fetching from information_schema via RPC...');
    const { data: cols, error: colsErr } = await supabase.rpc('get_columns', { table_name: 'invitations' });
    if (colsErr) {
       console.log('Failed RPC, error:', colsErr);
       // Try an invalid query to force a specific postgres error containing column names?
    } else {
       console.log('Info Schema:', cols);
    }
  }
}

checkSchema();
