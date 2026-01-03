import React, { useState, useEffect } from 'react';
import FloatingNav from '../components/Layout/FloatingNav';
import HeroSection from '../sections/HeroSection';
import LogoMarqueeSection from '../sections/LogoMarqueeSection';
import PhilosophySection from '../sections/PhilosophySection';
import FeaturesSection from '../sections/FeaturesSection';
import CoreOSSection from '../sections/CoreOSSection';
import MoonshotsSection from '../sections/MoonshotsSection';
import FooterSection from '../sections/FooterSection';
import { navigationItems } from '../utils/constants';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle Scroll for Navbar
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* NAVIGATION */}
            <FloatingNav
                scrolled={scrolled}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                navigationItems={navigationItems}
            />

            {/* PAGE SECTIONS */}
            <main role="main">
                <HeroSection />
                <LogoMarqueeSection />
                <PhilosophySection />
                <FeaturesSection />
                <CoreOSSection />
                <MoonshotsSection />
                <FooterSection />
            </main>
        </>
    );
};

export default LandingPage;
