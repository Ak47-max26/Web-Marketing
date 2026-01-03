const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../.env' });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function checkSchema() {
    console.log('Checking schema...');

    const { data, error } = await supabase
        .rpc('get_column_type', { t_name: 'users', c_name: 'otp_expires' });

    // Since we can't easily run SQL directly via client without RPC or RLS setup for system tables,
    // we'll try to infer it or just ask the user.
    // Actually, we can't query information_schema easily with anon key usually.

    // Let's try a different approach: Insert a known timestamp and read it back.

    const testEmail = `test_${Date.now()}@example.com`;
    const now = new Date();
    console.log('Original Date (Local/Node):', now.toString());
    console.log('Original ISO:', now.toISOString());

    const { data: user, error: insertError } = await supabase
        .from('users')
        .insert([{
            name: 'Test',
            email: testEmail,
            otp_expires: now.toISOString()
        }])
        .select()
        .single();

    if (insertError) {
        console.error('Insert error:', insertError);
        return;
    }

    console.log('Stored/Retrieved ISO:', user.otp_expires);

    const retrievedDate = new Date(user.otp_expires);
    console.log('Retrieved Date (Local/Node):', retrievedDate.toString());

    const diff = retrievedDate.getTime() - now.getTime();
    console.log('Difference (ms):', diff);
    console.log('Difference (hours):', diff / 1000 / 60 / 60);
}

checkSchema();
