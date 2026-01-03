import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] bg-orange-300/10 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] bg-amber-200/10 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>

            <div className="w-full max-w-2xl relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-orange-200/20"
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-20 h-20 bg-gradient-to-tr from-orange-400 to-amber-500 rounded-3xl rotate-12 mx-auto mb-10 flex items-center justify-center shadow-lg shadow-orange-500/30"
                    >
                        <span className="text-4xl">🚀</span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6"
                    >
                        Coming Soon
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-zinc-600 mb-12 max-w-lg mx-auto leading-relaxed"
                    >
                        We are working hard to bring you the future of productivity. You are on the list and will be notified as soon as we launch.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-orange-100 text-orange-600 rounded-2xl font-bold text-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            <span>Log Out</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default WelcomePage;
