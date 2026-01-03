import React from 'react';
import { Zap } from 'lucide-react';
import ScrollTriggerText from '../components/UI/ScrollTriggerText';
import TiltCard from '../components/UI/TiltCard';
import InteractiveShowcase from '../components/InteractiveDashboard/InteractiveShowcase';
import useParallax from '../hooks/useParallax';

// Features Section Component with Interactive Dashboard
const FeaturesSection = () => {
  const featuresRef = useParallax(0.1);

  return (
    <section id="features" className="relative z-10 py-32 px-6 md:px-12" ref={featuresRef}>
      <div className="max-w-7xl mx-auto">
        {/* Interactive Dashboard Showcase */}
        <div>
          <ScrollTriggerText delay={200}>
            <InteractiveShowcase />
          </ScrollTriggerText>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
