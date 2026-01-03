import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause,
  SkipForward,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  Plus,
  Check,
  Clock,
  Brain,
  Target,
  ChevronRight,
  Sparkles,
  Activity,
  CheckCircle,
  X,
  Maximize,
  Minimize,
  RotateCcw,
  Zap,
  TrendingUp,
  Users,
  MessageSquare,
  Star,
  Heart,
  Award
} from 'lucide-react';
import gsap from 'gsap';

// Cinematic App Simulation - Ultimate Premium Experience
const CinematicAppSimulation = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [isRunning, setIsRunning] = useState(false);
  const [currentWorkflow, setCurrentWorkflow] = useState(0);
  const [appLoaded, setAppLoaded] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [currentMood, setCurrentMood] = useState('optimistic');
  
  // Advanced Animation refs
  const appRef = useRef(null);
  const windowRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const particleRef = useRef(null);
  const overlayRef = useRef(null);

  // Cinematic workflow steps with storytelling elements
  const workflowSteps = [
    {
      time: "7:00 AM",
      title: "The Morning Awakening",
      screen: "dashboard",
      action: "Astrivya app gracefully awakens with your personalized morning energy",
      interaction: "AI insights emerge like morning sunlight, illuminating your potential",
      color: "from-orange-400 via-yellow-400 to-amber-400",
      emotion: "renewal",
      particles: "sunrise",
      narrative: "Your digital companion starts the day with purpose"
    },
    {
      time: "8:30 AM", 
      title: "The Mind Mirror",
      screen: "journal",
      action: "You share your thoughts, and AI reflects your inner world",
      interaction: "Sentiment blooms like a flower, revealing hidden patterns",
      color: "from-blue-400 via-indigo-400 to-purple-400",
      emotion: "reflection",
      particles: "sparkles",
      narrative: "Every feeling mapped, every pattern discovered"
    },
    {
      time: "10:00 AM",
      title: "The Orchestrator",
      screen: "calendar", 
      action: "Time bends to your will as AI choreographs your perfect day",
      interaction: "Conflicts dissolve, harmony emerges through intelligent scheduling",
      color: "from-green-400 via-emerald-400 to-teal-400",
      emotion: "harmony",
      particles: "harmony",
      narrative: "Where chaos once lived, perfect order now thrives"
    },
    {
      time: "2:00 PM",
      title: "The Achievement Engine", 
      screen: "tasks",
      action: "Momentum builds as tasks transform into victories",
      interaction: "Each completion triggers a cascade of dopamine and progress",
      color: "from-purple-400 via-pink-400 to-rose-400",
      emotion: "triumph",
      particles: "success",
      narrative: "Small wins compound into extraordinary achievements"
    },
    {
      time: "5:30 PM",
      title: "The Insight Oracle",
      screen: "analytics",
      action: "Data transforms into wisdom as patterns reveal themselves",
      interaction: "Future possibilities crystallize through intelligent analysis",
      color: "from-cyan-400 via-blue-400 to-indigo-400",
      emotion: "wisdom",
      particles: "insight",
      narrative: "Your past becomes the key to your future"
    },
    {
      time: "9:00 PM",
      title: "The Tomorrow Weaver",
      screen: "journal",
      action: "Today’s journey becomes tomorrow’s foundation",
      interaction: "AI weaves today’s threads into tomorrow’s tapestry",
      color: "from-indigo-400 via-purple-400 to-pink-400",
      emotion: "anticipation",
      particles: "dreams",
      narrative: "The cycle of growth begins anew"
    }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, color: 'from-orange-400 to-amber-400' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, color: 'from-green-400 to-emerald-400' },
    { id: 'journal', label: 'Journal', icon: FileText, color: 'from-blue-400 to-indigo-400' },
    { id: 'tasks', label: 'Tasks', icon: Target, color: 'from-purple-400 to-pink-400' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'from-cyan-400 to-blue-400' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'from-zinc-400 to-zinc-500' }
  ];

  // Cinematic app launch sequence
  useEffect(() => {
    setTimeout(() => {
      setAppLoaded(true);
      if (appRef.current) {
        // Master timeline for app launch
        const tl = gsap.timeline();
        
        // Window animation with bounce
        tl.fromTo(appRef.current, 
          { 
            scale: 0.3, 
            opacity: 0, 
            y: 100,
            rotationX: 45
          },
          { 
            scale: 1, 
            opacity: 1, 
            y: 0,
            rotationX: 0,
            duration: 1.2, 
            ease: "back.out(1.7)" 
          }
        )
        // Window chrome appearance
        .fromTo(windowRef.current.children[0],
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.8"
        )
        // Sidebar slide-in
        .fromTo(sidebarRef.current,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        // Content fade-in
        .fromTo(contentRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
      }
    }, 800);
  }, []);

  // Cinematic workflow progression
  useEffect(() => {
    if (isRunning && currentWorkflow < workflowSteps.length - 1) {
      const timer = setTimeout(() => {
        advanceWorkflow();
      }, 6000); // Longer duration for cinematic effect
      return () => clearTimeout(timer);
    } else if (currentWorkflow >= workflowSteps.length - 1) {
      setIsRunning(false);
      // Completion celebration
      triggerCompletion();
    }
  }, [isRunning, currentWorkflow]);

  // Advanced screen transition with morphing
  useEffect(() => {
    if (contentRef.current && appLoaded) {
      // Get current screen elements
      const currentElements = contentRef.current.children;
      
      // Outgoing animation
      gsap.to(currentElements, {
        opacity: 0,
        x: -30,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.05
      });

      // Wait for outgoing animation, then render new screen
      setTimeout(() => {
        // Incoming animation
        gsap.fromTo(currentElements,
          { opacity: 0, x: 30, scale: 1.05 },
          { 
            opacity: 1, 
            x: 0, 
            scale: 1,
            duration: 0.6, 
            ease: "power3.out",
            stagger: 0.08
          }
        );
      }, 450);
    }
  }, [activeScreen, appLoaded]);

  const advanceWorkflow = () => {
    const currentStep = workflowSteps[currentWorkflow];
    const nextStep = workflowSteps[currentWorkflow + 1];
    
    // Trigger particle effects
    triggerParticles(currentStep.particles);
    
    // Screen transition with story progression
    setActiveScreen(nextStep.screen);
    setCurrentWorkflow(prev => prev + 1);
    
    // Update mood
    setCurrentMood(nextStep.emotion);
  };

  const triggerParticles = (type) => {
    setShowParticles(true);
    // Particle animation based on type
    if (particleRef.current) {
      const particles = particleRef.current.children;
      gsap.fromTo(particles,
        { 
          opacity: 0, 
          scale: 0, 
          y: 0 
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: -20,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1,
          onComplete: () => {
            gsap.to(particles, {
              opacity: 0,
              scale: 0.5,
              duration: 0.6,
              delay: 0.5,
              stagger: 0.05
            });
          }
        }
      );
    }
  };

  const triggerCompletion = () => {
    // Celebration animation sequence
    if (appRef.current) {
      const tl = gsap.timeline();
      
      // App celebration pulse
      tl.to(appRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      })
      .to(appRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    }
  };

  const toggleWorkflow = () => {
    setIsRunning(!isRunning);
  };

  const nextStep = () => {
    if (currentWorkflow < workflowSteps.length - 1) {
      advanceWorkflow();
    }
  };

  const goToScreen = (screenId) => {
    setActiveScreen(screenId);
  };

  const resetDemo = () => {
    setCurrentWorkflow(0);
    setIsRunning(false);
    setActiveScreen('dashboard');
    setCurrentMood('optimistic');
    setShowParticles(false);
  };

  const currentStep = workflowSteps[currentWorkflow];

  // Enhanced screen content with cinematic elements
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Hero Welcome Section with Particle Effects */}
      <div className="relative">
        <div className={`bg-gradient-to-br ${currentStep.color} rounded-2xl p-8 border border-white/30 shadow-2xl relative overflow-hidden`}>
          {/* Particle Layer */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-3xl font-bold text-white mb-3">
                  Good Morning! 🌅
                </h3>
                <p className="text-white/90 text-lg mb-4">
                  Your AI companion awaits to orchestrate your perfect day
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-white/80">
                    <Heart className="w-5 h-5" />
                    <span>Energy Optimized</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/80">
                    <Zap className="w-5 h-5" />
                    <span>Ready for Greatness</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-white">
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
                <div className="text-white/80 text-lg">Today</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights with Staggered Animation */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/40 shadow-xl">
        <h4 className="font-bold text-2xl text-black mb-6 flex items-center">
          <Brain className="w-7 h-7 mr-3 text-blue-500" />
          AI Intelligence Insights
        </h4>
        <div className="grid gap-6">
          {[
            { 
              text: "Your creative energy peaks in the next 90 minutes", 
              confidence: 96, 
              icon: "🎨",
              color: "from-purple-500 to-pink-500",
              impact: "high"
            },
            { 
              text: "Schedule deep work from 10-12 AM for optimal focus", 
              confidence: 89, 
              icon: "🎯",
              color: "from-blue-500 to-indigo-500",
              impact: "medium"
            },
            { 
              text: "Break after 2 PM meeting will boost afternoon productivity", 
              confidence: 92, 
              icon: "☕",
              color: "from-amber-500 to-orange-500",
              impact: "medium"
            }
          ].map((insight, index) => (
            <div 
              key={index} 
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-gradient-to-r from-white to-white/80 rounded-xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{insight.icon}</div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-black mb-3">{insight.text}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${insight.color} h-2 rounded-full transition-all duration-1000`}
                            style={{width: `${insight.confidence}%`}}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">
                          {insight.confidence}% confident
                        </span>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        insight.impact === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {insight.impact} impact
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Stats with Morphing Effects */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { 
            label: "Focus Time", 
            value: "3h 24m", 
            change: "+18m",
            color: "from-orange-500 to-red-500",
            icon: "🎯",
            trend: "up"
          },
          { 
            label: "Achievements", 
            value: "14", 
            change: "+3",
            color: "from-green-500 to-emerald-500",
            icon: "🏆",
            trend: "up"
          },
          { 
            label: "Energy Score", 
            value: "94/100", 
            change: "+7",
            color: "from-blue-500 to-purple-500",
            icon: "⚡",
            trend: "up"
          }
        ].map((stat, index) => (
          <div key={index} className="group">
            <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all text-center group-hover:scale-105">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className="flex items-center justify-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Enhanced other screens with similar cinematic treatment...
  const renderCalendar = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-black mb-4">Today's Perfect Symphony</h3>
        <p className="text-gray-600 text-lg">Where every moment is thoughtfully composed</p>
      </div>

      <div className="space-y-4">
        {[
          { time: "9:00 AM", title: "Morning Reflection", type: "mindfulness", duration: "15 min", color: "bg-gradient-to-r from-orange-400 to-yellow-400", icon: "🧘" },
          { time: "10:00 AM", title: "Deep Creative Work", type: "focus", duration: "2h 30m", color: "bg-gradient-to-r from-blue-500 to-indigo-500", icon: "🎨" },
          { time: "12:30 PM", title: "Nourishing Break", type: "renewal", duration: "1h", color: "bg-gradient-to-r from-green-400 to-emerald-400", icon: "🥗" },
          { time: "2:00 PM", title: "Team Collaboration", type: "connection", duration: "1h", color: "bg-gradient-to-r from-purple-500 to-pink-500", icon: "👥" },
          { time: "4:00 PM", title: "Strategic Planning", type: "vision", duration: "1h 30m", color: "bg-gradient-to-r from-cyan-500 to-blue-500", icon: "📈" },
          { time: "6:00 PM", title: "Day Integration", type: "reflection", duration: "30 min", color: "bg-gradient-to-r from-indigo-500 to-purple-500", icon: "🌅" }
        ].map((slot, index) => (
          <div key={index} className="group cursor-pointer">
            <div className={`${slot.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{slot.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold">{slot.title}</h4>
                    <p className="text-white/90 capitalize">{slot.type} • {slot.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{slot.time}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderJournal = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-black mb-4">Your Mind's Canvas</h3>
        <p className="text-gray-600 text-lg">Where thoughts become insights</p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-2xl font-bold text-black">Evening Reflection</h4>
            <span className="text-gray-500">Today • 9:15 PM</span>
          </div>
          <textarea 
            className="w-full h-40 p-6 border-2 border-blue-200 rounded-xl resize-none focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 text-lg leading-relaxed"
            placeholder="What moved you today? What did you discover about yourself? How did you grow?"
          ></textarea>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200">
          <h5 className="font-bold text-xl text-black mb-4 flex items-center">
            <Brain className="w-6 h-6 mr-2 text-blue-500" />
            AI Mind Analysis
          </h5>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-2">Emotional State</div>
              <div className="flex items-center space-x-3">
                <span className="text-3xl">😊</span>
                <div>
                  <div className="font-semibold text-black">Optimistic & Reflective</div>
                  <div className="text-sm text-gray-500">Grateful for growth</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">Energy Pattern</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Morning</span>
                  <span className="font-semibold">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2 rounded-full" style={{width: '87%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-black mb-4">Your Victory Arsenal</h3>
        <p className="text-gray-600 text-lg">Where achievements are forged</p>
      </div>

      <div className="space-y-6">
        {[
          { 
            title: "Complete Strategic Vision Document", 
            completed: true, 
            time: "Completed 2h ago", 
            priority: "critical",
            category: "Vision",
            impact: "High strategic impact"
          },
          { 
            title: "Client Presentation Mastery", 
            completed: false, 
            time: "Due 3 PM", 
            priority: "critical",
            category: "Client",
            impact: "Revenue impact"
          },
          { 
            title: "Team Innovation Session", 
            completed: false, 
            time: "Tomorrow 10 AM", 
            priority: "high",
            category: "Team",
            impact: "Culture building"
          }
        ].map((task, index) => (
          <div key={index} className="group cursor-pointer">
            <div className={`bg-white rounded-2xl p-6 border-2 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${
              task.completed ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-blue-300'
            }`}>
              <div className="flex items-start space-x-4">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  task.completed 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-300 group-hover:border-blue-400'
                }`}>
                  {task.completed && <Check className="w-5 h-5 text-white" />}
                </div>
                <div className="flex-1">
                  <h5 className={`text-xl font-bold mb-2 ${task.completed ? 'text-green-700 line-through' : 'text-black'}`}>
                    {task.title}
                  </h5>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-gray-600">{task.time}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      task.priority === 'critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-sm text-gray-500">{task.category}</span>
                  </div>
                  <div className="text-sm text-blue-600 font-medium">{task.impact}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-black mb-4">Your Success Blueprint</h3>
        <p className="text-gray-600 text-lg">Where data becomes destiny</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: "Focus Score", 
            value: "96", 
            unit: "/100", 
            color: "from-green-500 to-emerald-500", 
            trend: "+8",
            icon: "🎯"
          },
          { 
            label: "Tasks Mastered", 
            value: "23", 
            unit: "", 
            color: "from-blue-500 to-indigo-500", 
            trend: "+5",
            icon: "🏆"
          },
          { 
            label: "Deep Work", 
            value: "4.2", 
            unit: "h", 
            color: "from-purple-500 to-pink-500", 
            trend: "+0.8h",
            icon: "🧠"
          },
          { 
            label: "Energy Peak", 
            value: "94", 
            unit: "%", 
            color: "from-orange-500 to-red-500", 
            trend: "+6%",
            icon: "⚡"
          }
        ].map((metric, index) => (
          <div key={index} className="group">
            <div className="bg-white/80 backdrop-blur-xl rounded-xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all text-center group-hover:scale-105">
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                {metric.value}{metric.unit}
              </div>
              <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
              <div className="flex items-center justify-center space-x-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">{metric.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
        <h4 className="font-bold text-2xl text-black mb-6 flex items-center">
          <Sparkles className="w-7 h-7 mr-3 text-purple-500" />
          AI Wisdom Insights
        </h4>
        <div className="grid gap-4">
          <div className="bg-white/80 rounded-xl p-4 border border-purple-200">
            <p className="text-lg text-gray-800">🚀 Your productivity peaks on Fridays - schedule important launches then</p>
          </div>
          <div className="bg-white/80 rounded-xl p-4 border border-purple-200">
            <p className="text-lg text-gray-800">🧠 You're 34% more creative when you start with journaling</p>
          </div>
          <div className="bg-white/80 rounded-xl p-4 border border-purple-200">
            <p className="text-lg text-gray-800">⚡ Energy optimization: Take breaks every 90 minutes for peak performance</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard': return renderDashboard();
      case 'calendar': return renderCalendar();
      case 'journal': return renderJournal();
      case 'tasks': return renderTasks();
      case 'analytics': return renderAnalytics();
      default: return renderDashboard();
    }
  };

  return (
    <div 
      ref={appRef}
      className={`bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-3xl p-10 border border-white/60 shadow-2xl overflow-hidden transition-all duration-1000 ${
        appLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        background: `linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eff6ff 100%)`
      }}
    >
      {/* Cinematic Header */}
      <div className="text-center mb-12 relative">
        <h2 className="text-5xl font-bold text-black mb-4">
          Astrivya: The Experience
        </h2>
        <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Witness the future of productivity in motion
        </p>
        
        {/* Floating Particles */}
        <div ref={particleRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      </div>

      {/* App Window */}
      <div 
        ref={windowRef}
        className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 max-w-6xl mx-auto"
      >
        {/* Enhanced Window Controls */}
        <div className="h-16 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-400 to-red-500 shadow-lg"></div>
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg"></div>
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-lg"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">System Active</span>
            </div>
          </div>
        </div>

        {/* App Content */}
        <div className="flex h-[700px]">
          {/* Enhanced Sidebar */}
          <div ref={sidebarRef} className="w-72 bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 p-6">
            <div className="flex items-center space-x-4 mb-12">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="font-bold text-2xl text-black">Astrivya</span>
                <div className="text-sm text-gray-500">AI Productivity</div>
              </div>
            </div>

            <nav className="space-y-3">
              {navigationItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => goToScreen(item.id)}
                  className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all transform hover:scale-105 ${
                    activeScreen === item.id 
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="font-semibold text-lg">{item.label}</span>
                  {activeScreen === item.id && (
                    <Sparkles className="w-4 h-4 ml-auto animate-pulse" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content with Cinematic Effects */}
          <div className="flex-1 p-8 bg-gradient-to-br from-white to-blue-50/30">
            <div ref={contentRef} className="h-full overflow-y-auto">
              {renderScreen()}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Workflow Controls */}
      <div className="flex items-center justify-center space-x-6 mt-12">
        <button
          onClick={toggleWorkflow}
          className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          <span>{isRunning ? 'Pause Story' : 'Begin Journey'}</span>
          <Sparkles className="w-5 h-5 group-hover:animate-spin" />
        </button>

        <button
          onClick={nextStep}
          disabled={currentWorkflow >= workflowSteps.length - 1}
          className="flex items-center space-x-3 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SkipForward className="w-6 h-6" />
          <span>Next Chapter</span>
        </button>

        <button
          onClick={resetDemo}
          className="flex items-center space-x-3 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          <RotateCcw className="w-6 h-6" />
          <span>Restart Story</span>
        </button>
      </div>

      {/* Cinematic Progress */}
      <div className="mt-10 text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          {workflowSteps.map((step, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentWorkflow(index);
                setActiveScreen(step.screen);
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all transform hover:scale-110 ${
                index === currentWorkflow 
                  ? `bg-gradient-to-r ${step.color} text-white shadow-xl` 
                  : index < currentWorkflow
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}
            >
              {index < currentWorkflow ? <CheckCircle className="w-6 h-6" /> : index + 1}
            </button>
          ))}
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-lg inline-block">
          <h4 className="text-2xl font-bold text-black mb-2">{currentStep.title}</h4>
          <p className="text-lg text-gray-600 mb-3">{currentStep.narrative}</p>
          <div className="text-sm text-gray-500">
            Chapter {currentWorkflow + 1} of {workflowSteps.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicAppSimulation;
