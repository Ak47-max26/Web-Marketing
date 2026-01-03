import React, { useEffect, useState } from 'react';
import {
    Slack, Mail, Calendar, Figma, Github, Database,
    Search, CheckCircle2, Clock, ArrowRight,
    LayoutGrid, Zap
} from 'lucide-react';

export const ConnectVisual = () => {
    return (
        <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
            {/* Central Hub */}
            <div className="relative z-10 w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20 animate-pulse-glow">
                <Zap className="text-orange-500 fill-orange-500" size={32} />
            </div>

            {/* Floating Icons */}
            {[
                { Icon: Slack, color: "text-purple-500", delay: "0s", x: "-80px", y: "-40px" },
                { Icon: Mail, color: "text-red-500", delay: "1s", x: "80px", y: "-40px" },
                { Icon: Calendar, color: "text-blue-500", delay: "2s", x: "-80px", y: "40px" },
                { Icon: Figma, color: "text-pink-500", delay: "3s", x: "80px", y: "40px" },
                { Icon: Github, color: "text-zinc-800", delay: "1.5s", x: "0px", y: "-70px" },
                { Icon: Database, color: "text-emerald-500", delay: "2.5s", x: "0px", y: "70px" }
            ].map((item, i) => (
                <div
                    key={i}
                    className={`absolute bg-white p-2.5 rounded-xl shadow-sm border border-zinc-100 ${item.color}`}
                    style={{
                        animation: `float-in 3s ease-in-out infinite`,
                        animationDelay: item.delay,
                        transform: `translate(${item.x}, ${item.y})`
                    }}
                >
                    <item.Icon size={20} />
                </div>
            ))}

            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20">
                <circle cx="50%" cy="50%" r="60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-zinc-400 animate-spin-slow" />
            </svg>
        </div>
    );
};

export const LearnVisual = () => {
    return (
        <div className="relative w-full h-48 bg-zinc-50 rounded-xl overflow-hidden border border-zinc-100 flex flex-col items-center justify-center p-6">
            {/* Mock Calendar/List */}
            <div className="w-full max-w-[200px] space-y-2 relative z-10">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 bg-white rounded-md border border-zinc-200 w-full flex items-center px-3 gap-2 shadow-sm">
                        <div className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-orange-500' : 'bg-zinc-300'}`}></div>
                        <div className="h-1.5 bg-zinc-100 rounded-full w-2/3"></div>
                    </div>
                ))}
            </div>

            {/* Scanning Beam */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.5)] animate-scanline z-20"></div>

            {/* Analysis Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <div className="bg-black/80 backdrop-blur-sm text-white text-[10px] font-mono px-3 py-1 rounded-full opacity-0 animate-fade-in-out">
                    Pattern Detected: Deep Work
                </div>
            </div>
        </div>
    );
};

export const AutonomyVisual = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % 3);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-48 flex items-center justify-center bg-zinc-50 rounded-xl border border-zinc-100 overflow-hidden">
            <div className="relative w-48 h-32">
                {/* Slot 1 */}
                <div className={`absolute top-0 left-0 w-full h-8 border border-dashed border-zinc-300 rounded-md flex items-center justify-center text-xs text-zinc-400 transition-colors duration-500 ${step === 1 ? 'bg-orange-50 border-orange-200 text-orange-500' : ''}`}>
                    {step === 1 ? 'Optimized Slot' : '09:00 AM'}
                </div>

                {/* Moving Block */}
                <div
                    className="absolute w-full h-8 bg-white border-l-4 border-orange-500 rounded-r-md shadow-md flex items-center px-3 gap-2 transition-all duration-1000 ease-in-out z-10"
                    style={{
                        top: step === 0 ? '80px' : step === 1 ? '0px' : '0px',
                        transform: step === 2 ? 'scale(1.02)' : 'scale(1)',
                        borderColor: step === 2 ? '#22c55e' : '#f97316'
                    }}
                >
                    <div className="text-xs font-medium text-zinc-800">Deep Work Session</div>
                    {step === 2 && <CheckCircle2 size={14} className="ml-auto text-green-500 animate-in zoom-in" />}
                </div>

                {/* Slot 2 */}
                <div className="absolute top-10 left-0 w-full h-8 bg-zinc-100 rounded-md border border-zinc-200 opacity-50"></div>
                {/* Slot 3 */}
                <div className="absolute top-20 left-0 w-full h-8 bg-zinc-100 rounded-md border border-zinc-200 opacity-50"></div>
            </div>

            {/* Cursor/Hand Hint */}
            <div
                className="absolute transition-all duration-1000 ease-in-out pointer-events-none"
                style={{
                    top: step === 0 ? '100px' : '20px',
                    left: '60%',
                    opacity: step === 2 ? 0 : 1
                }}
            >
                <div className="w-4 h-4 bg-black/20 rounded-full blur-sm"></div>
            </div>
        </div>
    );
};
