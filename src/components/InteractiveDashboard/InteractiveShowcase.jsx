import React, { useState, useEffect, useRef } from 'react';
import {
    Terminal, Cpu, Calendar, GitGraph, MessageSquare,
    Brain, Activity, Sparkles, PenTool, FileText,
    LayoutGrid, Mail, Code, Ghost, Globe, CheckCircle2, ArrowRight,
    Play, Search, Video, MoreHorizontal, ArrowLeft, Zap
} from 'lucide-react';

/* --- INTERACTIVE DEMO SUB-COMPONENTS --- */

const KernelDemo = ({ isActive }) => {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!isActive) {
            setMessages([]);
            return;
        }

        // Sequence of events
        const sequence = [
            { type: 'user', text: "Plan my day based on my emails.", delay: 500 },
            { type: 'typing', delay: 1500 },
            { type: 'ai', text: "I've analyzed 12 unread emails and your Linear backlog. Here's a proposed schedule to maximize deep work:", delay: 3000 },
            { type: 'action', text: "Apply Schedule", delay: 4000 }
        ];

        let timeouts = [];

        sequence.forEach((step, index) => {
            const timeout = setTimeout(() => {
                if (step.type === 'typing') {
                    setIsTyping(true);
                } else if (step.type === 'user') {
                    setMessages(prev => [...prev, { role: 'user', content: step.text }]);
                } else if (step.type === 'ai') {
                    setIsTyping(false);
                    setMessages(prev => [...prev, { role: 'ai', content: step.text }]);
                } else if (step.type === 'action') {
                    setMessages(prev => [...prev, { role: 'system', content: step.text, isAction: true }]);
                }
            }, step.delay);
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
    }, [isActive]);

    return (
        <div className="h-full bg-white p-6 font-sans text-zinc-900 overflow-hidden rounded-xl flex flex-col relative">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <Sparkles size={16} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-zinc-900">Astrivya AI</div>
                        <div className="text-xs text-zinc-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                        </div>
                    </div>
                </div>
                <button className="p-2 hover:bg-zinc-50 rounded-full text-zinc-400 transition-colors">
                    <MoreHorizontal size={18} />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 space-y-6 overflow-y-auto">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                        {msg.role === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 mr-3 mt-1">
                                <Sparkles size={14} />
                            </div>
                        )}

                        {msg.isAction ? (
                            <div className="ml-11 bg-zinc-50 border border-zinc-200 rounded-xl p-4 w-full max-w-xs">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-white rounded-lg border border-zinc-100 flex items-center justify-center shadow-sm">
                                        <Calendar size={20} className="text-zinc-700" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-zinc-900">Optimized Schedule</div>
                                        <div className="text-xs text-zinc-500">Saved 2h of focus time</div>
                                    </div>
                                </div>
                                <button className="w-full py-2 bg-black text-white text-xs font-medium rounded-lg hover:bg-zinc-800 transition-colors">
                                    {msg.content}
                                </button>
                            </div>
                        ) : (
                            <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                ? 'bg-zinc-900 text-white rounded-tr-none'
                                : 'bg-zinc-100 text-zinc-800 rounded-tl-none'
                                }`}>
                                {msg.content}
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start animate-in fade-in duration-300">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0 mr-3">
                            <Sparkles size={14} />
                        </div>
                        <div className="bg-zinc-100 p-4 rounded-2xl rounded-tl-none flex gap-1.5 items-center h-10">
                            <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-150"></div>
                            <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-300"></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="mt-4 relative">
                <input
                    type="text"
                    placeholder="Ask Astrivya..."
                    className="w-full bg-white border border-zinc-200 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    disabled
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400">
                    <ArrowRight size={14} />
                </button>
            </div>
        </div>
    );
};

const TaskmindDemo = ({ isActive }) => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Design Review", time: "11:00", duration: 60, type: 'event', color: 'bg-blue-50 text-blue-700 border-l-4 border-blue-500', attendees: ['AM', 'JD'] },
        { id: 2, title: "Team Sync", time: "13:00", duration: 30, type: 'event', color: 'bg-purple-50 text-purple-700 border-l-4 border-purple-500', attendees: ['Team'] }
    ]);

    const [floatingTasks, setFloatingTasks] = useState([
        { id: 3, title: "Deep Work", duration: 90, priority: 'High', tag: 'Focus' },
        { id: 4, title: "Client Email", duration: 15, priority: 'Med', tag: 'Admin' }
    ]);

    const [dragState, setDragState] = useState({ isDragging: false, taskId: null, y: 0 });
    const [showSmartSlots, setShowSmartSlots] = useState(false);

    useEffect(() => {
        if (!isActive) return;

        // Simulate drag and drop interaction sequence
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 1000));

            // Start dragging "Deep Work"
            setDragState({ isDragging: true, taskId: 3, y: 100 });
            setShowSmartSlots(true);

            // Move drag
            await new Promise(r => setTimeout(r, 800));
            setDragState(prev => ({ ...prev, y: 200 })); // Move towards 9:30 slot

            // Drop
            await new Promise(r => setTimeout(r, 800));
            setDragState({ isDragging: false, taskId: null, y: 0 });
            setShowSmartSlots(false);
            setFloatingTasks(prev => prev.filter(t => t.id !== 3));
            setTasks(prev => [...prev, {
                id: 3,
                title: "Deep Work",
                time: "10:00",
                duration: 60,
                type: 'task',
                color: 'bg-orange-50 text-orange-700 border-l-4 border-orange-500',
                tag: 'Focus',
                isNew: true
            }]);

            // Wait then schedule email
            await new Promise(r => setTimeout(r, 1000));
            setFloatingTasks(prev => prev.filter(t => t.id !== 4));
            setTasks(prev => [...prev, {
                id: 4,
                title: "Client Email",
                time: "14:00",
                duration: 15,
                type: 'task',
                color: 'bg-zinc-50 text-zinc-700 border-l-4 border-zinc-500',
                tag: 'Admin',
                isNew: true
            }]);
        };

        sequence();
    }, [isActive]);

    const hours = [9, 10, 11, 12, 13, 14, 15, 16];
    const HOUR_HEIGHT = 80; // Taller for better detail

    return (
        <div className="h-full bg-white p-6 font-sans text-zinc-900 overflow-hidden rounded-xl flex gap-6">
            {/* Sidebar - Backlog */}
            <div className="w-64 flex flex-col border-r border-zinc-100 pr-4 shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-sm text-zinc-900 flex items-center gap-2">
                        <LayoutGrid size={14} /> Backlog
                    </h4>
                    <span className="bg-zinc-100 text-zinc-500 text-[10px] px-2 py-0.5 rounded-full font-medium">{floatingTasks.length}</span>
                </div>

                <div className="space-y-2 flex-1 overflow-y-auto">
                    {floatingTasks.map(task => (
                        <div
                            key={task.id}
                            className={`p-3 bg-white border border-zinc-200 rounded-lg shadow-sm transition-all cursor-grab active:cursor-grabbing group relative text-sm ${dragState.taskId === task.id ? 'opacity-0' : 'hover:border-zinc-300 hover:shadow-md'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-zinc-800">{task.title}</span>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal size={12} className="text-zinc-400" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] bg-zinc-100 text-zinc-500 px-2 py-1 rounded-md font-medium flex items-center gap-1">
                                    <Calendar size={10} /> {task.duration}m
                                </span>
                                <span className={`text-[10px] px-2 py-1 rounded-md font-medium ${task.priority === 'High' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                                    {task.tag}
                                </span>
                            </div>

                            {/* Drag Handle Simulation */}
                            {dragState.taskId === task.id && (
                                <div
                                    className="fixed z-50 w-56 p-3 bg-white border-2 border-orange-500 rounded-lg shadow-xl rotate-3 pointer-events-none"
                                    style={{
                                        top: '40%',
                                        left: '30%',
                                        transform: `translate(${dragState.y * 0.5}px, ${dragState.y * 0.2}px) rotate(3deg)`
                                    }}
                                >
                                    <div className="text-sm font-semibold text-zinc-800">{task.title}</div>
                                    <div className="text-xs text-zinc-500 mt-1">{task.duration}m • {task.tag}</div>
                                </div>
                            )}
                        </div>
                    ))}

                    {floatingTasks.length === 0 && (
                        <div className="h-24 flex flex-col items-center justify-center text-zinc-300 border-2 border-dashed border-zinc-100 rounded-lg">
                            <CheckCircle2 size={20} className="mb-2" />
                            <p className="text-xs font-medium">All caught up</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Calendar View */}
            <div className="flex-1 flex flex-col relative bg-zinc-50/30 rounded-xl border border-zinc-100 overflow-hidden">
                {/* Calendar Header */}
                <div className="flex items-center justify-between p-3 border-b border-zinc-100 bg-white">
                    <div className="flex items-center gap-3">
                        <h4 className="font-bold text-sm text-zinc-900">Today</h4>
                        <div className="text-xs text-zinc-400 font-medium">Oct 24</div>
                    </div>
                    <div className="flex gap-1">
                        <button className="p-1 hover:bg-zinc-100 rounded-md text-zinc-400 transition-colors"><ArrowLeft size={12} /></button>
                        <button className="p-1 hover:bg-zinc-100 rounded-md text-zinc-400 transition-colors"><ArrowRight size={12} /></button>
                    </div>
                </div>

                <div className="flex-1 relative overflow-y-auto bg-white">
                    <div className="flex min-h-full">
                        {/* Time Labels */}
                        <div className="w-12 shrink-0 border-r border-zinc-100 bg-white z-10">
                            {hours.map((hour) => (
                                <div key={hour} className="relative" style={{ height: `${HOUR_HEIGHT * 0.6}px` }}>
                                    <span className="absolute -top-2 right-2 text-xs font-medium text-zinc-400 tabular-nums">{hour}:00</span>
                                </div>
                            ))}
                        </div>

                        {/* Grid */}
                        <div className="flex-1 relative">
                            {/* Smart Slots Highlight */}
                            {showSmartSlots && (
                                <div
                                    className="absolute left-2 right-2 rounded-lg bg-orange-50/50 border-2 border-dashed border-orange-300 flex items-center justify-center z-20 animate-pulse"
                                    style={{ top: `${(0.5) * HOUR_HEIGHT * 0.6}px`, height: `${1.5 * HOUR_HEIGHT * 0.6}px` }}
                                >
                                    <div className="bg-white px-2 py-1 rounded-full shadow-sm text-xs font-bold text-orange-600 flex items-center gap-1">
                                        <Sparkles size={10} /> Deep Work
                                    </div>
                                </div>
                            )}

                            {/* Grid Lines */}
                            {hours.map((hour) => (
                                <div key={hour} className="border-b border-zinc-50 w-full" style={{ height: `${HOUR_HEIGHT * 0.6}px` }}></div>
                            ))}

                            {/* Events */}
                            {tasks.map(task => {
                                const startHour = parseInt(task.time.split(':')[0]);
                                const startMin = parseInt(task.time.split(':')[1]);
                                const top = ((startHour - 9) * 60 + startMin) * (HOUR_HEIGHT * 0.6 / 60);
                                const height = task.duration * (HOUR_HEIGHT * 0.6 / 60);

                                return (
                                    <div
                                        key={task.id}
                                        className={`absolute left-2 right-2 rounded-lg p-2 text-xs flex flex-col justify-between transition-all duration-500 shadow-sm hover:shadow-md cursor-pointer group z-30 ${task.color} ${task.isNew ? 'animate-in zoom-in-95 fade-in duration-500' : ''}`}
                                        style={{ top: `${top}px`, height: `${height}px` }}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="font-bold text-xs">{task.title}</div>
                                            {task.tag && (
                                                <span className="text-[8px] opacity-70 font-medium px-1 py-0.5 bg-black/5 rounded">{task.tag}</span>
                                            )}
                                        </div>
                                        <div className="flex items-end justify-between opacity-80">
                                            <div className="font-medium text-xs">{task.time} • {task.duration}m</div>
                                            {task.attendees && (
                                                <div className="flex -space-x-1">
                                                    {task.attendees.map((a, i) => (
                                                        <div key={i} className="w-4 h-4 rounded-full bg-white border border-white flex items-center justify-center text-[6px] font-bold text-zinc-600 shadow-sm">
                                                            {a}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Current Time Indicator */}
                            <div className="absolute left-0 right-0 border-t-2 border-red-500 z-40 flex items-center pointer-events-none" style={{ top: `${((14 - 9) * 60 + 15) * (HOUR_HEIGHT * 0.6 / 60)}px` }}>
                                <div className="w-2 h-2 bg-red-500 rounded-full -ml-1 shadow-sm border border-white"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AutonomyDemo = ({ isActive }) => {
    const [integrations, setIntegrations] = useState([
        { id: 1, name: 'Google Calendar', icon: Calendar, status: 'active', lastSync: 'Just now' },
        { id: 2, name: 'Notion', icon: FileText, status: 'syncing', lastSync: 'Syncing...' },
        { id: 3, name: 'Slack', icon: MessageSquare, status: 'active', lastSync: '2m ago' },
        { id: 4, name: 'Linear', icon: CheckCircle2, status: 'active', lastSync: '5m ago' }
    ]);

    const [activities, setActivities] = useState([
        { id: 1, text: 'Rescheduled "Deep Work" to 10 AM', time: '1m ago', type: 'schedule' },
        { id: 2, text: 'Synced 12 new Linear issues', time: '5m ago', type: 'sync' },
        { id: 3, text: 'Drafted reply to @sarah', time: '12m ago', type: 'email' }
    ]);

    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setIntegrations(prev => prev.map(item => {
                if (item.status === 'syncing') {
                    return { ...item, status: 'active', lastSync: 'Just now' };
                }
                if (Math.random() > 0.7) {
                    return { ...item, status: 'syncing', lastSync: 'Syncing...' };
                }
                return item;
            }));
        }, 3000);

        return () => clearInterval(interval);
    }, [isActive]);

    return (
        <div className="h-full bg-zinc-50 p-6 font-sans text-zinc-900 overflow-hidden rounded-xl flex flex-col">
            {/* Header Stats */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                    <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Active Agents</div>
                    <div className="text-2xl font-bold text-zinc-900">4</div>
                </div>
                <div className="flex-1 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                    <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Tasks Automated</div>
                    <div className="text-2xl font-bold text-zinc-900">142</div>
                </div>
                <div className="flex-1 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                    <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">Time Saved</div>
                    <div className="text-2xl font-bold text-zinc-900">2.5h</div>
                </div>
            </div>

            <div className="flex gap-6 flex-1 min-h-0">
                {/* Integrations List */}
                <div className="flex-1 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                        <h4 className="font-semibold text-sm text-zinc-700">Connected Apps</h4>
                        <button className="text-xs font-medium text-orange-600 hover:text-orange-700">+ Add New</button>
                    </div>
                    <div className="overflow-y-auto p-2 space-y-1">
                        {integrations.map(app => (
                            <div key={app.id} className="flex items-center justify-between p-3 hover:bg-zinc-50 rounded-lg transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600">
                                        <app.icon size={16} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-zinc-900">{app.name}</div>
                                        <div className="text-[10px] text-zinc-500">{app.lastSync}</div>
                                    </div>
                                </div>
                                <div className={`px-2 py-1 rounded-full text-[10px] font-medium ${app.status === 'syncing' ? 'bg-orange-50 text-orange-600 animate-pulse' : 'bg-green-50 text-green-600'}`}>
                                    {app.status === 'syncing' ? 'Syncing' : 'Active'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="w-1/3 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
                        <h4 className="font-semibold text-sm text-zinc-700">Activity</h4>
                    </div>
                    <div className="overflow-y-auto p-4 space-y-4">
                        {activities.map(act => (
                            <div key={act.id} className="flex gap-3 items-start">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0"></div>
                                <div>
                                    <p className="text-xs text-zinc-700 leading-relaxed">{act.text}</p>
                                    <span className="text-[10px] text-zinc-400">{act.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MemoryDemo = ({ isActive }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [contexts, setContexts] = useState([
        { id: 1, title: "Project Alpha Specs", type: "doc", source: "Notion", time: "2h ago", relevance: 98 },
        { id: 2, title: "Q3 Design Review", type: "meeting", source: "GCal", time: "Yesterday", relevance: 85 },
        { id: 3, title: "#design-system", type: "chat", source: "Slack", time: "1d ago", relevance: 72 },
        { id: 4, title: "User Interview Notes", type: "doc", source: "Google Docs", time: "3d ago", relevance: 65 }
    ]);

    useEffect(() => {
        if (!isActive) {
            setSearchQuery("");
            return;
        }

        // Simulate typing search
        const target = "design";
        let i = 0;
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (i < target.length) {
                    setSearchQuery(target.slice(0, i + 1));
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 100);
            return () => clearInterval(interval);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [isActive]);

    return (
        <div className="h-full bg-white p-6 font-sans text-zinc-900 overflow-hidden rounded-xl flex flex-col">
            {/* Search Header */}
            <div className="relative mb-6">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                    type="text"
                    value={searchQuery}
                    placeholder="Search context..."
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                    readOnly
                />
                {searchQuery && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-bold animate-in fade-in">
                        4 RESULTS
                    </div>
                )}
            </div>

            {/* Context List */}
            <div className="flex-1 overflow-y-auto space-y-2">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Relevant Context</h4>
                {contexts.map((ctx, i) => {
                    const isMatch = searchQuery && ctx.title.toLowerCase().includes(searchQuery.toLowerCase());
                    return (
                        <div
                            key={ctx.id}
                            className={`p-3 rounded-lg border transition-all duration-300 flex items-center justify-between group cursor-pointer ${isMatch ? 'bg-orange-50/50 border-orange-200 shadow-sm scale-[1.02]' : 'bg-white border-zinc-100 hover:border-zinc-300'
                                }`}
                            style={{ opacity: searchQuery && !isMatch ? 0.5 : 1 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 ${ctx.type === 'doc' ? 'bg-blue-50 text-blue-600' :
                                    ctx.type === 'meeting' ? 'bg-purple-50 text-purple-600' :
                                        'bg-green-50 text-green-600'
                                    }`}>
                                    {ctx.type === 'doc' ? <FileText size={14} /> : ctx.type === 'meeting' ? <Video size={14} /> : <MessageSquare size={14} />}
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-zinc-900 group-hover:text-orange-600 transition-colors">
                                        {ctx.title}
                                    </div>
                                    <div className="text-[10px] text-zinc-500 flex items-center gap-2">
                                        <span>{ctx.source}</span>
                                        <span className="w-0.5 h-0.5 bg-zinc-300 rounded-full"></span>
                                        <span>{ctx.time}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                <div className="text-[10px] font-bold text-zinc-400">{ctx.relevance}% match</div>
                                <div className="w-12 h-1 bg-zinc-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${ctx.relevance}%` }}></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Info */}
            <div className="mt-4 pt-4 border-t border-zinc-100 flex justify-between items-center text-xs text-zinc-400">
                <span>Connected to 14 apps</span>
                <span className="flex items-center gap-1"><GitGraph size={12} /> Knowledge Graph Active</span>
            </div>
        </div>
    );
};

const ReflectionDemo = ({ isActive }) => {
    return (
        <div className="h-full bg-white p-6 font-sans text-zinc-900 overflow-hidden rounded-xl flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Daily Insights</h3>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-zinc-100 rounded-lg text-xs font-medium text-zinc-600">Day</button>
                    <button className="px-3 py-1 bg-white rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-600">Week</button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <div className="flex items-center gap-2 mb-2 text-orange-700">
                        <Zap size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Focus Score</span>
                    </div>
                    <div className="text-3xl font-bold text-zinc-900 mb-1">92<span className="text-sm font-normal text-zinc-400 ml-1">/100</span></div>
                    <div className="text-[10px] text-orange-600 font-medium">+12% vs yesterday</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-2 text-blue-700">
                        <Activity size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Energy</span>
                    </div>
                    <div className="text-3xl font-bold text-zinc-900 mb-1">High<span className="text-sm font-normal text-zinc-400 ml-1">Peak</span></div>
                    <div className="text-[10px] text-blue-600 font-medium">Optimal for deep work</div>
                </div>
            </div>

            <div className="flex-1 bg-zinc-50 rounded-xl border border-zinc-100 p-4 relative overflow-hidden">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Energy vs Focus</h4>

                {/* Chart Simulation */}
                <div className="flex items-end justify-between h-24 px-2 gap-2">
                    {[40, 60, 75, 85, 90, 60, 50, 45, 70, 80].map((h, i) => (
                        <div key={i} className="w-full bg-zinc-200 rounded-t-sm relative group">
                            <div
                                className="absolute bottom-0 left-0 right-0 bg-zinc-900 rounded-t-sm transition-all duration-1000 ease-out"
                                style={{ height: isActive ? `${h}%` : '0%' }}
                            ></div>
                            {/* Tooltip */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                {h}% Focus
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-zinc-400 font-mono">
                    <span>9 AM</span>
                    <span>12 PM</span>
                    <span>5 PM</span>
                </div>
            </div>

            <div className="mt-4 bg-zinc-900 text-white p-3 rounded-lg flex items-center gap-3 shadow-lg animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Sparkles size={14} className="text-orange-400" />
                </div>
                <div className="text-xs">
                    <span className="font-bold text-orange-400">Suggestion:</span> Schedule creative work for tomorrow morning (9-11 AM).
                </div>
            </div>
        </div>
    );
};

/* --- 5. INTERACTIVE DEMO SHOWCASE --- */
const InteractiveShowcase = () => {
    const [activeTab, setActiveTab] = useState('kernel');
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsLoaded(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const tabs = [
        { id: 'kernel', label: 'AI Assistant', icon: Terminal, desc: "Natural Language Processing" },
        { id: 'autonomy', label: 'Autonomy Agents', icon: Cpu, desc: "Background Agents" },
        { id: 'taskmind', label: 'Smart Calendar', icon: Calendar, desc: "Energy-Based Scheduling" },
        { id: 'memory', label: 'Context Hub', icon: GitGraph, desc: "Contextual Association" },
        { id: 'reflection', label: 'Insights', icon: MessageSquare, desc: "Emotional Intelligence" },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24" ref={containerRef}>
            <div className={`text-center mb-16 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl md:text-5xl font-serif text-black mb-4">The Layer That Connects It All</h2>
                <p className="text-zinc-500 max-w-2xl mx-auto">See how Astrivya unifies your stack, from raw thought to executed action.</p>
            </div>

            <div className={`bg-white border border-zinc-200 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] max-h-[700px] transition-all duration-1000 delay-300 transform ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                {/* Sidebar Navigation */}
                <div className="w-full md:w-72 bg-zinc-50 border-r border-zinc-200 p-6 flex flex-col gap-2 overflow-x-auto md:overflow-visible flex-nowrap md:flex-col flex-shrink-0">
                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4 px-3 hidden md:block">Modules</div>
                    <div className="flex md:flex-col gap-2 min-w-max md:min-w-0">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left whitespace-nowrap md:whitespace-normal ${activeTab === tab.id
                                    ? 'bg-white text-black shadow-md border border-zinc-100 scale-105'
                                    : 'text-zinc-500 hover:bg-white/50 hover:text-zinc-700'
                                    }`}
                            >
                                <div className={`p-2 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-orange-50 text-orange-600' : 'bg-transparent'}`}>
                                    <tab.icon size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span>{tab.label}</span>
                                    <span className="text-[10px] font-normal opacity-60 hidden md:block">{tab.desc}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 relative bg-white p-6 md:p-8 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

                    {/* Content Transition Wrapper */}
                    <div className="w-full h-full flex flex-col relative z-10">
                        <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
                            {activeTab === 'kernel' && <KernelDemo isActive={true} />}
                            {activeTab === 'autonomy' && <AutonomyDemo isActive={true} />}
                            {activeTab === 'taskmind' && <TaskmindDemo isActive={true} />}
                            {activeTab === 'memory' && <MemoryDemo isActive={true} />}
                            {activeTab === 'reflection' && <ReflectionDemo isActive={true} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InteractiveShowcase;
