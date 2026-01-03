const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Initialize Supabase client
// We use a lazy initialization or check in the helper to allow the app to start 
// even if env vars are missing (though it will fail on requests)
const supabase = (supabaseUrl && supabaseKey)
    ? createClient(supabaseUrl, supabaseKey)
    : null;

class DatabaseHelper {
    constructor() {
        if (!supabase) {
            console.error('❌ Supabase client not initialized. Missing SUPABASE_URL or SUPABASE_ANON_KEY.');
        }
        this.supabase = supabase;
    }

    async createUser(user) {
        if (!this.supabase) throw new Error('Database not configured');

        const { data, error } = await this.supabase
            .from('users')
            .insert([
                {
                    name: user.name,
                    email: user.email,
                    otp_code: user.otpCode,
                    otp_expires: user.otpExpires.toISOString(),
                    email_verified: false
                }
            ])
            .select()
            .single();

        if (error) {
            console.error('Supabase createUser error:', error);
            throw error;
        }

        return data;
    }

    async findUserByEmail(email) {
        if (!this.supabase) throw new Error('Database not configured');

        const { data, error } = await this.supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error) {
            // PGRST116 is the code for "The result contains 0 rows" when using .single()
            if (error.code === 'PGRST116') {
                return null;
            }
            console.error('Supabase findUserByEmail error:', error);
            throw error;
        }

        return data;
    }

    async updateUserOTP(email, otpCode, otpExpires) {
        if (!this.supabase) throw new Error('Database not configured');

        const { error } = await this.supabase
            .from('users')
            .update({
                otp_code: otpCode,
                otp_expires: otpExpires.toISOString()
            })
            .eq('email', email);

        if (error) {
            console.error('Supabase updateUserOTP error:', error);
            throw error;
        }
    }

    async verifyAndClearOTP(email, otp) {
        if (!this.supabase) throw new Error('Database not configured');

        // First get the user to check OTP
        const user = await this.findUserByEmail(email);

        if (!user) return null;

        // Check if OTP matches and is not expired
        const now = new Date();
        const expires = new Date(user.otp_expires);

        if (user.otp_code === otp && expires > now) {
            // Update user as verified and clear OTP
            const { data, error } = await this.supabase
                .from('users')
                .update({
                    email_verified: true,
                    otp_code: null,
                    otp_expires: null
                })
                .eq('email', email)
                .select()
                .single();

            if (error) {
                console.error('Supabase verifyAndClearOTP error:', error);
                throw error;
            }

            return data;
        }

        return null;
    }
}

async function setupDatabase() {
    if (!supabaseUrl || !supabaseKey) {
        console.warn('⚠️  Supabase environment variables missing. Database features will not work.');
        return;
    }

    try {
        // Simple query to verify connection
        const { error } = await supabase.from('users').select('count', { count: 'exact', head: true });

        if (error) {
            console.error('❌ Failed to connect to Supabase:', error.message);
        } else {
            console.log('✅ Connected to Supabase');
        }
    } catch (err) {
        console.error('❌ Error connecting to Supabase:', err);
    }
}

module.exports = {
    DatabaseHelper,
    setupDatabase
};
