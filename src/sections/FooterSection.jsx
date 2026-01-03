import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

// Footer Section Component
const FooterSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', otp: '' });
  const [focusedField, setFocusedField] = useState(null);
  const [step, setStep] = useState('register'); // 'register', 'verify', 'success'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
      if (step === 'register') {
        // Send OTP
        const response = await fetch(`${API_URL}/api/auth/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formData.name, email: formData.email }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (data.code === 'EMAIL_ALREADY_REGISTERED') {
            setStep('success');
            setSuccessMessage('You are already on the waitlist!');
            return;
          }
          throw new Error(data.error || 'Failed to send verification code');
        }

        setStep('verify');
        setResendTimer(60); // 60 seconds cooldown
        setSuccessMessage('Verification code sent to your email!');

      } else if (step === 'verify') {
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

        setStep('success');
        setSuccessMessage('Welcome to Astrivya! Check your email for next steps.');
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
      const response = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, email: formData.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend code');
      }

      setResendTimer(60);
      setSuccessMessage('New verification code sent!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', otp: '' });
    setStep('register');
    setError('');
    setSuccessMessage('');
    setResendTimer(0);
  };

  return (
    <>
      {/* FINAL CTA */}
      <section id="waitlist" className="py-32 md:py-40 px-6 md:px-12 relative overflow-hidden border-t border-zinc-100">
        {/* Background Animation - Preserved */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-orange-200/20 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Main Content Card */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-orange-200/20">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
                <span>Early Access</span>
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 text-black tracking-tight leading-tight">
                Upgrade your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">existence.</span>
              </h2>

              <p id="waitlist-text" className="text-zinc-600 text-lg md:text-xl font-light max-w-2xl mx-auto mb-4">
                Join the Astrivya Early Access Waitlist and be among the first to experience the future of productivity.
              </p>

              {/* Trust Indicator */}
              <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M20 6 9 17l-5-5"></path></svg>
                <span>Join 250+ early adopters</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative min-h-[300px]">
              <AnimatePresence mode="wait">
                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0, x: [0, -10, 10, -10, 10, 0] }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: "tween", duration: 0.4 }}
                    className="mb-6 p-4 bg-red-50/90 backdrop-blur-sm text-red-600 rounded-2xl border border-red-100 text-center shadow-lg shadow-red-100/20"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Success Message (Toast style) */}
                {successMessage && step !== 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-green-50/90 backdrop-blur-sm text-green-600 rounded-2xl border border-green-100 text-center shadow-lg shadow-green-100/20"
                  >
                    {successMessage}
                  </motion.div>
                )}

                {step === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                      transition={{
                        scale: { type: "spring", stiffness: 200, delay: 0.2 },
                        rotate: { type: "tween", duration: 0.5, delay: 0.2 }
                      }}
                      className="w-20 h-20 bg-gradient-to-tr from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-400/30"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl font-bold text-gray-800 mb-3"
                    >
                      You're on the list!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-gray-600 text-lg"
                    >
                      Welcome to Astrivya. We'll be in touch soon.
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      type="button"
                      onClick={resetForm}
                      className="mt-8 text-orange-600 font-semibold hover:text-orange-700 hover:underline underline-offset-4 transition-all"
                    >
                      Register another email
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      {step === 'register' ? (
                        <>
                          {/* Name Field */}
                          <div className="flex-1 relative">
                            <input
                              type="text"
                              placeholder="Your name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full bg-white/80 backdrop-blur-sm border-2 rounded-2xl py-4 px-6 text-black placeholder:text-zinc-400 focus:outline-none transition-all ${focusedField === 'name'
                                ? 'border-orange-400 shadow-lg shadow-orange-200/50 scale-[1.02]'
                                : 'border-white hover:border-orange-200'
                                }`}
                              required
                            />
                          </div>

                          {/* Email Field */}
                          <div className="flex-1 relative">
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
                            />
                          </div>
                        </>
                      ) : (
                        /* OTP Field */
                        <div className="w-full relative">
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full"
                          >
                            <input
                              type="text"
                              placeholder="Enter verification code"
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
                          </motion.div>
                          <div className="text-center mt-4">
                            <button
                              type="button"
                              onClick={handleResendOTP}
                              disabled={resendTimer > 0}
                              className="text-sm text-orange-600 hover:text-orange-700 disabled:text-gray-400 font-medium transition-colors"
                            >
                              {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend verification code'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full md:w-auto md:min-w-[200px] px-10 py-4 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 mx-auto disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                        <>
                          <span>{step === 'register' ? 'Join Waitlist' : 'Verify Email'}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </>
                      )}
                    </button>

                    {/* Privacy Note */}
                    <p className="text-center text-xs text-zinc-500 mt-6">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>


      <footer className="bg-white/60 backdrop-blur-xl text-zinc-600 py-16 px-6 md:px-12 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            {/* Brand Column */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded flex items-center justify-center p-0">
                  <img src="/new11.png" alt="Astrivya Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-black tracking-widest text-lg">ASTRIVYA</span>
              </div>
              <p className="text-sm text-zinc-500 mb-6 leading-relaxed max-w-xs">
                The intelligent productivity layer that adapts to your workflow.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/company/astrivya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-zinc-100 hover:bg-orange-100 flex items-center justify-center text-zinc-600 hover:text-orange-600 transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a
                  href="https://x.com/AstrivyaAI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-zinc-100 hover:bg-orange-100 flex items-center justify-center text-zinc-600 hover:text-orange-600 transition-all hover:scale-110 font-bold text-lg"
                  aria-label="X (Twitter)"
                >
                  𝕏
                </a>
                <a
                  href="mailto:hello@astrivya.ai"
                  className="w-10 h-10 rounded-xl bg-zinc-100 hover:bg-orange-100 flex items-center justify-center text-zinc-600 hover:text-orange-600 transition-all hover:scale-110"
                  aria-label="Email"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </a>
              </div>
            </div>

            {/* Essential Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="hover:text-orange-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-orange-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-orange-600 transition-colors">Contact</a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>© 2025 Astrivya Systems. All rights reserved.</p>
            <p className="flex items-center gap-2">
              Made with <span className="text-orange-500 animate-pulse">♥</span> for productivity enthusiasts
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSection;
