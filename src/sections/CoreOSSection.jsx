import React from 'react';
import { LayoutGrid, Activity, Terminal, MessageSquare } from 'lucide-react';
import TextReveal from '../components/UI/TextReveal';
import SpotlightGrid from '../components/UI/SpotlightGrid';
import SpotlightCard from '../components/UI/SpotlightCard';
import { spotlightFeatures } from '../utils/constants';

// Core OS Section Component
const CoreOSSection = () => {
  const iconMap = {
    LayoutGrid,
    Activity,
    Terminal,
    MessageSquare
  };

  return (
    <>
      {/* CORE OS SECTION - SPOTLIGHT GRID */}
      <section id="core-os" className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-orange-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">The Intelligence Layer</span>
            <TextReveal>
              <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">Precision Tools for Thought</h2>
            </TextReveal>
            <p className="text-lg text-zinc-500 font-light">A suite of engines working in unison to elevate your cognitive baseline.</p>
          </div>

          <SpotlightGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {spotlightFeatures.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || iconMap[feature.backgroundIcon] || LayoutGrid;

              return (
                <SpotlightCard
                  key={index}
                  colSpan={feature.colSpan || ""}
                  className={feature.colSpan ? "p-12" : "p-10"}
                  BackgroundIcon={iconMap[feature.backgroundIcon]}
                >
                  <div className={`${feature.colSpan ? '' : 'flex flex-col h-full'}`}>
                    {feature.colSpan !== "md:row-span-2" ? (
                      <>
                        <div className="w-14 h-14 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-center mb-8 text-black shadow-sm relative z-20">
                          <IconComponent size={24} />
                        </div>
                        <h3 className="text-3xl font-serif font-medium mb-4 text-black relative z-20">{feature.title}</h3>
                        <p className="text-zinc-500 mb-8 max-w-lg text-lg font-light relative z-20">
                          {feature.description}
                        </p>
                        {feature.tags && (
                          <div className="flex gap-3 flex-wrap relative z-20">
                            {feature.tags.map((tag, i) => (
                              <div key={i} className="bg-white/50 border border-zinc-200/50 rounded-lg px-4 py-2 text-sm font-medium text-zinc-600">
                                {tag}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="w-14 h-14 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-center mb-8 text-black shadow-sm">
                          <Activity size={24} />
                        </div>
                        <h3 className="text-2xl font-serif mb-4 text-black">{feature.title}</h3>
                        <p className="text-zinc-500 mb-12 leading-relaxed font-light">
                          {feature.description}
                        </p>
                        <div className="mt-auto space-y-4">
                          {feature.agents.map((agent, i) => (
                            <div key={i} className="bg-white/50 p-5 rounded-2xl border border-zinc-100 shadow-sm hover:border-orange-200 transition-colors">
                              <div className="flex items-center gap-2 mb-2">
                                <div className={`w-2 h-2 rounded-full ${agent.status === 'green' ? 'bg-green-500' :
                                    agent.status === 'blue' ? 'bg-blue-500' : 'bg-orange-500'
                                  }`}></div>
                                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{agent.name}</div>
                              </div>
                              <div className="text-sm text-zinc-600 font-medium">{agent.message}</div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </SpotlightCard>
              );
            })}
          </SpotlightGrid>
        </div>
      </section>
    </>
  );
};

export default CoreOSSection;
