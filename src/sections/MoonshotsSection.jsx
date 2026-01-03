import React from 'react';
import { ArrowRight, Ghost, Globe } from 'lucide-react';
import useParallax from '../hooks/useParallax';
import { moonshotItems } from '../utils/constants';

// Moonshots Section Component
const MoonshotsSection = () => {
  const moonshotsRef = useParallax(0.03);

  const iconMap = {
    Ghost,
    Globe
  };

  return (
    <>
      {/* MOONSHOTS */}
      <section id="moonshots" className="py-32 px-6 md:px-12 relative" ref={moonshotsRef}>
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-zinc-200/60 pb-10">
                <div>
                    <div className="text-orange-600 font-bold tracking-widest text-xs uppercase mb-4">Experimental Division</div>
                    <h2 className="text-5xl md:text-7xl font-serif text-black">Moonshot Labs</h2>
                </div>
                <p className="text-zinc-500 max-w-sm mt-8 md:mt-0 font-light">
                    Pushing the boundaries of how human consciousness interacts with digital intelligence.
                </p>
            </div>
            <div className="space-y-6">
                {moonshotItems.map((item, index) => {
                  const IconComponent = iconMap[item.icon];
                  return (
                    <div key={index} className="group relative bg-white/60 backdrop-blur-xl rounded-[2rem] p-12 overflow-hidden border border-white hover:border-orange-100 transition-all duration-700 shadow-sm">
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
                            <div className="w-16 h-16 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center text-black shadow-sm group-hover:scale-110 transition-transform duration-500">
                                <IconComponent size={28} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-serif mb-4 text-black">{item.title}</h3>
                                <p className="text-zinc-500 text-lg mb-6 max-w-2xl leading-relaxed font-light">
                                    {item.description}
                                </p>
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 rounded-md bg-zinc-100 text-zinc-500 text-xs font-bold uppercase tracking-wider">{item.category}</span>
                                </div>
                            </div>
                            <div className="hidden md:block text-zinc-300 group-hover:text-black transition-colors">
                                <ArrowRight size={32} />
                            </div>
                        </div>
                    </div>
                  );
                })}
            </div>
        </div>
      </section>
    </>
  );
};

export default MoonshotsSection;
