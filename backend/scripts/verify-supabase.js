const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConnection() {
    console.log('Testing Supabase connection...');
    console.log('URL:', supabaseUrl);

    try {
        // Check if we can connect
        const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });

        if (error) {
            console.error('❌ Connection failed:', error.message);
            if (error.code === '42P01') {
                console.error('💡 Hint: The "users" table does not exist. Please run the SQL query from the walkthrough.');
            }
        } else {
            console.log('✅ Successfully connected to Supabase!');
            console.log('✅ "users" table exists.');
        }
    } catch (err) {
        console.error('❌ Unexpected error:', err);
    }
}

checkConnection();
