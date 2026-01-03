import React, { useState, useEffect } from 'react';
import {
  Zap,
  Brain,
  Terminal,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Play
} from 'lucide-react';

// Enhanced Dashboard Mockup from Reference
const EnhancedDashboardMockup = () => {
  const [step, setStep] = useState(0); // 0=Start, 1=Kernel, 2=Calendar, 3=Autonomy, 4=Memory, 5=Reflection, 6=Finish
  const [kernelInput, setKernelInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInsight, setShowInsight] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Client Meeting", time: "10:00 AM", energy: "High", type: "event" },
    { id: 2, title: "Project Review", time: "Unscheduled", energy: "Med", type: "task" },
    { id: 3, title: "Deep Work", time: "Unscheduled", energy: "High", type: "task" }
  ]);

  // Reset demo periodically if idle at finish
  useEffect(() => {
    if (step === 6) {
      const timeout = setTimeout(() => setStep(0), 8000);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  // Helper to simulate typing
  const simulateTyping = (text, callback) => {
    let i = 0;
    const interval = setInterval(() => {
      setKernelInput(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        setTimeout(callback, 500);
      }
    }, 40);
  };

  // --- ACTION HANDLERS ---
  const startDemo = () => {
    setStep(1);
    setTimeout(() => {
      simulateTyping("Plan my day for max focus", () => {
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setStep(2); // Go to Calendar
        }, 1200);
      });
    }, 500);
  };

  const triggerAutoSchedule = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setTasks([
        { id: 1, title: "Client Meeting", time: "10:00 AM", energy: "High", type: "event" },
        { id: 3, title: "Deep Work", time: "11:00 AM", energy: "High", type: "event" }, // Moved
        { id: 2, title: "Project Review", time: "02:00 PM", energy: "Med", type: "event" } // Moved
      ]);
      setIsProcessing(false);
      setTimeout(() => setStep(3), 2000); // Go to Autonomy
    }, 1000);
  };

  // Step 3 Transition
  useEffect(() => {
    if (step === 3) {
      setTimeout(() => setShowInsight(true), 500);
      setTimeout(() => {
        setShowInsight(false);
        setStep(4);
      }, 4000);
    }
  }, [step]);

  // Step 4 Transition
  useEffect(() => {
    if (step === 4) {
      setTimeout(() => setStep(5), 3500);
    }
  }, [step]);

  // Step 5 Transition
  useEffect(() => {
    if (step === 5) {
      setTimeout(() => setStep(6), 4000);
    }
  }, [step]);

  return (
    <div className="bg-[#FAFAFA]/95 backdrop-blur-xl rounded-[1.6rem] overflow-hidden border border-white/60 relative h-[480px] flex flex-col shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08)] transition-all duration-500">
      {/* --- WINDOW HEADER --- */}
      <div className="h-12 border-b border-zinc-100 flex items-center justify-between px-6 bg-white/60 z-50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${step >= i ? 'bg-orange-500' : 'bg-zinc-200'}`}></div>
            ))}
          </div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="flex-1 relative overflow-hidden">

        {/* STAGE 0: START */}
        {step === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 mb-6 text-white">
              <Zap size={32} fill="currentColor" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-zinc-800 mb-2">Astrivya Interactive</h3>
            <p className="text-zinc-500 mb-8">Experience the future of work in 20 seconds.</p>
            <button onClick={startDemo} className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-zinc-800 transition-all hover:scale-105 flex items-center gap-2">
              Start Demo <Play size={16} fill="currentColor" />
            </button>
          </div>
        )}

        {/* STAGE 1: COMMAND KERNEL */}
        {step === 1 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-full max-w-md">
              <div className="bg-white border border-zinc-200 rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <Terminal className="text-orange-500 shrink-0" size={20} />
                <div className="flex-1 font-mono text-sm text-zinc-800 h-5 flex items-center">
                  {kernelInput}
                  <span className="w-1.5 h-4 bg-orange-500 ml-1 animate-pulse"></span>
                </div>
                {isProcessing && <div className="w-4 h-4 border-2 border-zinc-200 border-t-orange-500 rounded-full animate-spin"></div>}
              </div>

              {/* Intent Visualization */}
              <div className={`mt-4 transition-all duration-500 ${isProcessing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="bg-zinc-900 text-white text-xs font-mono p-4 rounded-xl shadow-lg">
                  <div className="flex gap-2 mb-2 text-zinc-500">
                    <span>INTENT:</span> <span className="text-green-400">PLANNING</span>
                  </div>
                  <div className="flex gap-2 mb-2 text-zinc-500">
                    <span>ENTITIES:</span> <span className="text-blue-400">["Today", "Focus"]</span>
                  </div>
                  <div className="flex gap-2 text-zinc-500">
                    <span>ACTION:</span> <span className="text-orange-400">OPTIMIZE_SCHEDULE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: CALENDAR / TASKMIND */}
        {step === 2 && (
          <div className="absolute inset-0 flex p-6 gap-6 animate-in fade-in duration-500">
            {/* Left: Task List */}
            <div className="w-1/2 space-y-3">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Unscheduled Tasks</h4>
              {tasks.filter(t => t.time === "Unscheduled").map(t => (
                <div key={t.id} className="bg-white border border-zinc-100 p-3 rounded-xl shadow-sm flex justify-between items-center animate-in slide-in-from-left-2">
                  <span className="text-sm font-medium text-zinc-700">{t.title}</span>
                  <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-bold">{t.energy} Energy</span>
                </div>
              ))}
              <div className="pt-4">
                <button
                  onClick={triggerAutoSchedule}
                  disabled={isProcessing}
                  className="w-full py-2 bg-zinc-100 hover:bg-orange-50 text-zinc-600 hover:text-orange-600 text-xs font-bold rounded-lg transition-colors flex justify-center items-center gap-2"
                >
                  {isProcessing ? <Sparkles size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  {isProcessing ? 'Optimizing...' : 'Auto-Schedule'}
                </button>
              </div>
            </div>

            {/* Right: Calendar */}
            <div className="w-1/2 bg-white rounded-2xl border border-zinc-100 p-4 relative overflow-hidden">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Timeline</h4>
              <div className="space-y-4 relative">
                {/* Time slots */}
                {[10, 11, 12, 1, 2].map(t => (
                  <div key={t} className="flex gap-3 text-[10px] text-zinc-300 border-b border-zinc-50 pb-4 last:border-0">
                    <span className="w-6 text-right">{t}</span>
                    <div className="flex-1"></div>
                  </div>
                ))}

                {/* Scheduled Items (Absolute positioning for animation) */}
                {tasks.filter(t => t.time !== "Unscheduled").map((t, i) => (
                  <div
                    key={t.id}
                    className="absolute left-10 right-2 bg-orange-500 text-white text-xs p-2 rounded-lg shadow-md animate-in zoom-in-95 duration-500"
                    style={{
                      top: t.id === 1 ? '0px' : t.id === 3 ? '45px' : '135px',
                      height: '35px'
                    }}
                  >
                    {t.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: AUTONOMY ENGINE */}
        {step === 3 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in duration-700">
            {/* Radar Scan Animation */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div className="absolute inset-0 border border-zinc-100 rounded-full"></div>
              <div className="absolute inset-8 border border-zinc-100 rounded-full"></div>
              <div className="absolute inset-16 border border-zinc-100 rounded-full"></div>
              <div className="absolute w-full h-1/2 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent top-0 left-0 origin-bottom animate-spin-slow" style={{ animationDuration: '3s' }}></div>
              <div className="bg-white p-4 rounded-2xl shadow-xl z-10 flex flex-col items-center">
                <Brain size={32} className="text-orange-500 mb-2" />
                <span className="text-xs font-bold text-zinc-400">ANALYZING...</span>
              </div>

              {/* Insight Popups */}
              {showInsight && (
                <div className="absolute top-0 right-0 bg-white p-4 rounded-xl shadow-2xl border border-orange-100 w-48 animate-in slide-in-from-bottom-4 fade-in duration-500">
                  <div className="flex items-start gap-2 mb-2">
                    <Zap size={14} className="text-orange-500 mt-0.5" fill="currentColor" />
                    <span className="text-xs font-bold text-zinc-800">Optimization</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-relaxed">
                    "Project Review" moved to 2 PM to match your afternoon energy slump.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STAGE 4: MEMORY GRAPH */}
        {step === 4 && (
          <div className="absolute inset-0 bg-[#111] text-white p-6 animate-in fade-in duration-500 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-10 left-20 w-32 h-32 bg-blue-500 rounded-full blur-[60px]"></div>
              <div className="absolute bottom-10 right-20 w-32 h-32 bg-purple-500 rounded-full blur-[60px]"></div>
            </div>

            <h3 className="text-lg font-serif mb-8 relative z-10">Associative Memory</h3>

            {/* Node Graph Simulation */}
            <div className="relative w-64 h-64">
              {/* Center Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-bold text-xs shadow-[0_0_30px_rgba(255,255,255,0.3)] z-20">
                Project
              </div>

              {/* Orbiting Nodes */}
              {[
                { l: "Email", x: -60, y: -50, d: 0 },
                { l: "Notes", x: 70, y: -30, d: 0.2 },
                { l: "Tasks", x: -20, y: 80, d: 0.4 },
                { l: "Meeting", x: 60, y: 60, d: 0.6 },
              ].map((node, i) => (
                <React.Fragment key={i}>
                  <div
                    className="absolute top-1/2 left-1/2 w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-[8px] text-zinc-300 border border-zinc-700 animate-in zoom-in duration-700 fill-mode-forwards z-10"
                    style={{
                      transform: `translate(${node.x}px, ${node.y}px)`,
                      animationDelay: `${node.d}s`
                    }}
                  >
                    {node.l}
                  </div>
                  {/* Connecting Lines (Simulated with SVG) */}
                  <svg className="absolute top-1/2 left-1/2 overflow-visible -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
                    <line x1="0" y1="0" x2={node.x} y2={node.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" className="animate-in fade-in duration-1000" />
                  </svg>
                </React.Fragment>
              ))}
            </div>
            <div className="mt-8 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-xs font-mono text-zinc-400 border border-white/10">
              Connected 4 contexts to current task
            </div>
          </div>
        )}

        {/* STAGE 5: REFLECTION */}
        {step === 5 && (
          <div className="absolute inset-0 p-8 flex flex-col items-center justify-center animate-in fade-in duration-500">
            <MessageSquare size={32} className="text-zinc-300 mb-4" />
            <div className="w-full max-w-sm bg-white border border-zinc-200 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-zinc-400 uppercase">Daily Reflection</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <div className="w-2 h-2 rounded-full bg-zinc-200"></div>
                  <div className="w-2 h-2 rounded-full bg-zinc-200"></div>
                </div>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                "You seemed stressed during the morning meeting, but recovered focus after 2 PM. Tomorrow, let's try a lighter morning load?"
              </p>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 py-2 bg-zinc-900 text-white text-xs rounded-lg hover:bg-zinc-700 transition-colors">Accept Plan</button>
                <button className="flex-1 py-2 bg-zinc-100 text-zinc-600 text-xs rounded-lg hover:bg-zinc-200 transition-colors">Dismiss</button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 6: FINISH */}
        {step === 6 && (
          <div className="absolute inset-0 bg-zinc-900 text-white flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
            <CheckCircle2 size={64} className="text-green-400 mb-6 animate-bounce" />
            <h3 className="text-3xl font-serif mb-2">All Systems Go.</h3>
            <p className="text-zinc-400 mb-8 text-center max-w-xs">Your life, optimized by Astrivya.</p>
            <button className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors shadow-xl hover:shadow-2xl">
              Join the Beta
            </button>
            <button onClick={() => setStep(0)} className="mt-6 text-xs text-zinc-500 hover:text-zinc-300 underline">
              Replay Demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedDashboardMockup;
