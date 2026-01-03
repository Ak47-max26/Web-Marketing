import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';

// API URL from environment variables - REQUIRED
const API_URL = process.env.REACT_APP_API_URL;

// Validate environment variables on load
if (!API_URL) {
    console.error(
        '❌ MISSING ENVIRONMENT VARIABLE: REACT_APP_API_URL\n\n' +
        'The API URL is required for the application to function.\n' +
        'Please set REACT_APP_API_URL in your environment variables.\n\n' +
        'For Vercel deployment:\n' +
        '1. Go to Project Settings → Environment Variables\n' +
        '2. Add REACT_APP_API_URL with your backend API URL\n' +
        '3. Example: https://api.astrivya.ai\n\n' +
        'For local development:\n' +
        '1. Create a .env file in the root directory\n' +
        '2. Add: REACT_APP_API_URL=http://localhost:3001\n'
    );
    throw new Error('Missing required environment variable: REACT_APP_API_URL');
}

console.log('✅ Environment configured:', { API_URL });

const SignInPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', otp: '' });
    const [focusedField, setFocusedField] = useState(null);
    const [step, setStep] = useState('email'); // 'email', 'otp'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(0);

    // Countdown for resend OTP
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (step === 'email') {
                // Send Login OTP
                const response = await fetch(`${API_URL}/api/auth/login-otp`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || data.error || 'Failed to send login code');
                }

                setStep('otp');
                setResendTimer(60);
            } else if (step === 'otp') {
                // Verify OTP
                const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email, otp: formData.otp }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Invalid verification code');
                }

                // Success - Navigate to Welcome
                navigate('/welcome');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (resendTimer > 0) return;
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/auth/login-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email }),
            });

            if (!response.ok) throw new Error('Failed to resend code');
            setResendTimer(60);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-orange-300/20 rounded-full mix-blend-multiply filter blur-[90px] animate-blob"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-amber-200/20 rounded-full mix-blend-multiply filter blur-[90px] animate-blob animation-delay-2000"></div>

            <div className="w-full max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-orange-200/20"
                >
                    {/* Header */}
                    <div className="text-center mb-10">
                        <Link to="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
                            <div className="w-12 h-12 rounded flex items-center justify-center mx-auto">
                                <img src="/new11.png" alt="Astrivya Logo" className="w-full h-full object-contain" />
                            </div>
                        </Link>
                        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-zinc-500">Sign in to your Astrivya account</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0, x: [0, -10, 10, -10, 10, 0] }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ type: "tween", duration: 0.4 }}
                                    className="mb-6 p-4 bg-red-50/90 backdrop-blur-sm text-red-600 rounded-2xl border border-red-100 text-center text-sm"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {step === 'email' ? (
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-zinc-700 mb-2 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            placeholder="email@address.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`w-full bg-white/80 backdrop-blur-sm border-2 rounded-2xl py-4 px-6 text-black placeholder:text-zinc-400 focus:outline-none transition-all ${focusedField === 'email'
                                                ? 'border-orange-400 shadow-lg shadow-orange-200/50 scale-[1.02]'
                                                : 'border-white hover:border-orange-200'
                                                }`}
                                            required
                                            autoFocus
                                        />
                                    </div>
                                ) : (
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-zinc-700 mb-2 ml-1">Verification Code</label>
                                        <input
                                            type="text"
                                            placeholder="Enter code"
                                            value={formData.otp}
                                            onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                            onFocus={() => setFocusedField('otp')}
                                            onBlur={() => setFocusedField(null)}
                                            className={`w-full bg-white/80 backdrop-blur-sm border-2 rounded-2xl py-4 px-6 text-black placeholder:text-zinc-400 focus:outline-none transition-all text-center text-2xl tracking-widest font-mono ${focusedField === 'otp'
                                                ? 'border-orange-400 shadow-lg shadow-orange-200/50 scale-[1.02]'
                                                : 'border-white hover:border-orange-200'
                                                }`}
                                            required
                                            maxLength={10}
                                            autoFocus
                                        />
                                        <div className="text-center mt-3">
                                            <button
                                                type="button"
                                                onClick={handleResendOTP}
                                                disabled={resendTimer > 0}
                                                className="text-sm text-orange-600 hover:text-orange-700 disabled:text-gray-400 font-medium transition-colors"
                                            >
                                                {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend code'}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Processing...</span>
                                        </div>
                                    ) : (
                                        <span>{step === 'email' ? 'Send Login Code' : 'Verify & Sign In'}</span>
                                    )}
                                </button>
                            </motion.div>
                        </AnimatePresence>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-zinc-500 text-sm">
                            Don't have an account?{' '}
                            <Link to="/" className="text-orange-600 font-semibold hover:underline">
                                Join Waitlist
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SignInPage;
