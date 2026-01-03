import React from 'react';
import { Brain, Activity, Sparkles } from 'lucide-react';
import TextReveal from '../components/UI/TextReveal';
import TiltCard from '../components/UI/TiltCard';
import { philosophyItems } from '../utils/constants';

// Philosophy Section Component
const PhilosophySection = () => {
  const iconMap = {
    Brain,
    Activity, 
    Sparkles
  };

  return (
    <>
      {/* PHILOSOPHY SECTION - NEAT & CLEAR */}
      <section id="philosophy" className="py-40 px-6 md:px-12 relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-100/20 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-12 gap-16 lg:gap-24">
                {/* Sticky Title & Menu */}
                <div className="md:col-span-5 relative">
                    <div className="sticky top-32">
                        <div className="mb-8">
                            <div className="text-orange-600 font-bold tracking-widest text-xs uppercase mb-4">Core Philosophy</div>
                            <TextReveal>
                                <h2 className="text-5xl md:text-7xl font-serif text-black leading-[1.05]">
                                    Context is <br/>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Everything.</span>
                                </h2>
                            </TextReveal>
                        </div>
                        
                        <TextReveal delay={200}>
                            <p className="text-lg text-zinc-600 leading-relaxed mb-12 font-light max-w-md">
                                Standard tools are passive vaults. Astrivya is an active historian. It connects the dots between your mood, your schedule, and your goals.
                            </p>
                        </TextReveal>

                        <div className="space-y-4">
                            {philosophyItems.map((item, i) => {
                              const IconComponent = iconMap[item.icon];
                              return (
                                <div key={i} className="group relative pl-8 py-4 cursor-default transition-all duration-500">
                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-200 group-hover:bg-orange-500/50 transition-colors duration-500"></div>
                                    <div className="absolute left-[-1px] top-1/2 -translate-y-1/2 w-[3px] h-0 bg-orange-600 group-hover:h-full transition-all duration-500 ease-out"></div>
                                    
                                    <h4 className="font-bold text-black text-lg flex items-center gap-2 group-hover:text-orange-700 transition-colors">
                                        <IconComponent size={18} />
                                        {item.title}
                                    </h4>
                                    <p className="text-zinc-500 text-sm mt-1 leading-relaxed opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto group-hover:mt-2 transition-all duration-500 overflow-hidden">
                                        {item.desc}
                                    </p>
                                </div>
                              );
                            })}
                        </div>
                    </div>
                </div>

                {/* Scrolling Cards */}
                <div className="md:col-span-7 space-y-24 pt-12 md:pt-32">
                    {/* Card 1 */}
                    <div className="relative">
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-24 h-24 bg-orange-500/10 rounded-full blur-xl -z-10"></div>
                        <TiltCard 
                          className="glass-panel p-10 rounded-[2rem] border border-white/60 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] bg-white/80"
                          BackgroundIcon={Brain}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-900 to-black text-white flex items-center justify-center shadow-lg">
                                        <Brain size={18} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Insight</div>
                                        <div className="text-sm font-medium text-zinc-900">Pattern Recognition</div>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider border border-orange-100">Optimization</span>
                            </div>
                            <h3 className="text-3xl font-serif mb-6 text-black leading-tight">"I've noticed a pattern."</h3>
                            <p className="text-zinc-600 leading-relaxed mb-8 font-light text-lg">
                                You consistently struggle with creative tasks after 3 PM on Thursdays. I've reorganized your schedule to move "Deep Design" to Friday Morning when your energy score is typically 92%.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <button className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-lg">Auto-Adjust Schedule</button>
                                <button className="px-5 py-2.5 bg-white border border-zinc-200 text-zinc-600 text-sm font-medium rounded-lg hover:bg-zinc-50 transition-colors">Dismiss</button>
                            </div>
                        </TiltCard>
                    </div>

                     {/* Card 2 */}
                     <div className="relative md:translate-x-12">
                        <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-xl -z-10"></div>
                        <TiltCard 
                          className="glass-panel p-10 rounded-[2rem] border border-white/60 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] bg-white/80"
                          BackgroundIcon={Activity}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-900 to-black text-white flex items-center justify-center shadow-lg">
                                        <Activity size={18} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Health</div>
                                        <div className="text-sm font-medium text-zinc-900">Burnout Guard</div>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider border border-red-100">Alert</span>
                            </div>
                            <h3 className="text-3xl font-serif mb-6 text-black leading-tight">"Cognitive load exceeding baseline."</h3>
                            
                            <div className="h-24 flex items-end gap-1.5 mb-8 opacity-90">
                                {[40, 60, 50, 80, 95, 85, 40, 30, 45, 70].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col justify-end group">
                                        <div className={`w-full rounded-t-sm transition-all duration-500 ${i > 4 ? 'bg-red-500/80' : 'bg-zinc-200'} group-hover:bg-orange-500`} style={{height: `${h}%`}}></div>
                                    </div>
                                ))}
                            </div>
                            
                            <p className="text-zinc-600 leading-relaxed font-light text-lg">
                                Your mental fatigue markers are high. Suggesting a "Low Mode" weekend protocol to recover dopamine levels effectively.
                            </p>
                        </TiltCard>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default PhilosophySection;
