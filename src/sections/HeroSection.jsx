import React from 'react';
import { ArrowRight, Command, Mail, Calendar, Brain } from 'lucide-react';
import ScrollTriggerText from '../components/UI/ScrollTriggerText';
import MagneticButton from '../components/UI/MagneticButton';
import TiltCard from '../components/UI/TiltCard';
import FloatingWidget from '../components/Animation/FloatingWidget';
import DashboardMockup from '../components/Layout/DashboardMockup';
import useParallax from '../hooks/useParallax';

// Hero Section Component
const HeroSection = () => {
  const heroVisualRef = useParallax(0.05);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative z-10 pt-48 pb-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-[55%] space-y-10 relative">
              <div className="inline-flex items-center space-x-2 bg-white/50 border border-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full animate-in slide-in-from-bottom-4 fade-in duration-1000 shadow-sm mb-6">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold tracking-widest text-zinc-600 uppercase">Astrivya V1.0 Stable</span>
              </div>

              <h1 className="hero-heading text-7xl md:text-8xl lg:text-9xl font-serif font-normal text-black leading-[1.3] tracking-tight pb-4">
                <ScrollTriggerText className="block mb-1" style={{ lineHeight: '1.4' }}>The AI  </ScrollTriggerText>
                <ScrollTriggerText className="block mb-1" style={{ lineHeight: '1.4' }}>That Thinks</ScrollTriggerText>
                <ScrollTriggerText className="block mb-1" style={{ lineHeight: '1.4' }}>
                  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 pr-4">
                    With You
                  </span>
                </ScrollTriggerText>
              </h1>

              <div className="max-w-lg">
                <ScrollTriggerText>
                  <p className="text-xl text-zinc-600 font-light leading-relaxed">
                    Astrivya connects your apps, calendar, and goals into one unified intelligence. It runs autonomously in the background, turning the chaos of daily life into clarity.
                  </p>
                </ScrollTriggerText>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 opacity-0 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-forwards">
                <MagneticButton>
                  <div className="px-8 py-4 bg-black text-white rounded-full hover:bg-zinc-800 transition-all shadow-xl text-lg font-medium flex items-center gap-2 group">
                    Initialize Layer
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </MagneticButton>
                <MagneticButton>
                  <div className="px-8 py-4 bg-white/50 border border-zinc-200 text-zinc-900 rounded-full hover:bg-white transition-colors text-lg font-medium flex items-center gap-2 backdrop-blur-sm">
                    <Command className="w-4 h-4" />
                    View Kernel
                  </div>
                </MagneticButton>
              </div>
            </div>

            {/* Hero Visual with Parallax */}
            <div className="lg:w-[45%] w-full relative perspective-1000" ref={heroVisualRef}>
              {/* Glow Behind Visual */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-orange-500/20 to-purple-500/20 rounded-full blur-[100px] -z-10"></div>

              {/* Floating Widgets */}
              <FloatingWidget icon={Mail} label="Inbox Zero" className="-top-16 -right-6" delay={0} />
              <FloatingWidget icon={Calendar} label="Smart Schedule" className="bottom-20 -left-12" delay={1.5} />
              <FloatingWidget icon={Brain} label="Context" className="-bottom-8 right-10" delay={3} />

              <TiltCard className="animate-float">
                <div className="bg-transparent p-0">
                  <DashboardMockup />
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
