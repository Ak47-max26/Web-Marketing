import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause,
  SkipForward,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  User,
  Search,
  Plus,
  Check,
  Clock,
  Zap,
  Brain,
  Target,
  Coffee,
  Briefcase,
  Moon,
  Sunrise,
  ChevronRight,
  Sparkles,
  Activity,
  ArrowRight,
  CheckCircle,
  X,
  Maximize,
  Minimize,
  RotateCcw
} from 'lucide-react';
import gsap from 'gsap';

// Premium App Simulation - Ultimate Interactive Experience
const PremiumAppSimulation = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [isRunning, setIsRunning] = useState(false);
  const [currentWorkflow, setCurrentWorkflow] = useState(0);
  const [appLoaded, setAppLoaded] = useState(false);
  
  // Animation refs
  const appRef = useRef(null);
  const windowRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);

  // Workflow steps with realistic app interactions
  const workflowSteps = [
    {
      time: "7:00 AM",
      title: "Morning App Launch",
      screen: "dashboard",
      action: "Astrivya app opens with personalized morning dashboard",
      interaction: "AI suggestion appears with energy optimization tips",
      color: "from-orange-400 to-yellow-400"
    },
    {
      time: "8:30 AM", 
      title: "Journal Entry",
      screen: "journal",
      action: "Open journal, start typing about yesterday's challenges",
      interaction: "Real-time sentiment analysis with color-coded emotions",
      color: "from-blue-400 to-indigo-400"
    },
    {
      time: "10:00 AM",
      title: "Smart Calendar",
      screen: "calendar", 
      action: "Drag tasks to calendar, AI auto-schedules optimally",
      interaction: "Conflict resolution with intelligent time blocking",
      color: "from-green-400 to-emerald-400"
    },
    {
      time: "2:00 PM",
      title: "Task Management", 
      screen: "tasks",
      action: "Complete high-priority tasks with AI guidance",
      interaction: "Real-time progress tracking and completion celebrations",
      color: "from-purple-400 to-pink-400"
    },
    {
      time: "5:30 PM",
      title: "Analytics Dashboard",
      screen: "analytics",
      action: "Review day's performance metrics and insights",
      interaction: "Interactive charts showing productivity patterns",
      color: "from-cyan-400 to-blue-400"
    },
    {
      time: "9:00 PM",
      title: "Evening Reflection",
      screen: "journal",
      action: "Reflect on day's learnings and plan tomorrow",
      interaction: "AI generates personalized tomorrow's agenda",
      color: "from-indigo-400 to-purple-400"
    }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'journal', label: 'Journal', icon: FileText },
    { id: 'tasks', label: 'Tasks', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // App loading animation
  useEffect(() => {
    setTimeout(() => {
      setAppLoaded(true);
      if (appRef.current) {
        gsap.fromTo(appRef.current, 
          { scale: 0.8, opacity: 0, y: 50 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
        );
      }
    }, 500);
  }, []);

  // Workflow progression animation
  useEffect(() => {
    if (isRunning && currentWorkflow < workflowSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentWorkflow(prev => prev + 1);
      }, 5000);
      return () => clearTimeout(timer);
    } else if (currentWorkflow >= workflowSteps.length - 1) {
      setIsRunning(false);
    }
  }, [isRunning, currentWorkflow]);

  // Screen transition animation
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [activeScreen]);

  const toggleWorkflow = () => {
    setIsRunning(!isRunning);
  };

  const nextStep = () => {
    if (currentWorkflow < workflowSteps.length - 1) {
      setCurrentWorkflow(currentWorkflow + 1);
    }
  };

  const goToScreen = (screenId) => {
    setActiveScreen(screenId);
  };

  const currentStep = workflowSteps[currentWorkflow];

  // Screen content components
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">Good Morning! 🌅</h3>
            <p className="text-zinc-600">Your AI is ready to optimize your day</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            <div className="text-sm text-zinc-500">Today</div>
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-white rounded-xl p-6 border border-zinc-200">
        <h4 className="font-semibold text-black mb-4 flex items-center">
          <Brain className="w-5 h-5 mr-2 text-blue-500" />
          AI Suggestions
        </h4>
        <div className="space-y-3">
          {[
            { text: "Start with creative work - your energy is highest now", confidence: 94, icon: "🎨" },
            { text: "Schedule deep focus from 10-12 AM for best results", confidence: 87, icon: "🎯" },
            { text: "Take a 15-min break after your 2 PM meeting", confidence: 91, icon: "☕" }
          ].map((suggestion, index) => (
            <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-2xl mr-3">{suggestion.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-black">{suggestion.text}</p>
                <div className="flex items-center mt-1">
                  <div className="w-16 bg-blue-200 rounded-full h-1 mr-2">
                    <div className="bg-blue-500 h-1 rounded-full" style={{width: `${suggestion.confidence}%`}}></div>
                  </div>
                  <span className="text-xs text-zinc-500">{suggestion.confidence}% confident</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Focus Time", value: "2h 30m", color: "text-orange-500" },
          { label: "Tasks Done", value: "12", color: "text-green-500" },
          { label: "Energy Score", value: "94/100", color: "text-blue-500" }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-zinc-200 text-center">
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-black">Today's Schedule</h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-zinc-100 rounded-lg">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <span className="font-medium">November 20, 2025</span>
          <button className="p-2 hover:bg-zinc-100 rounded-lg">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Time Slots */}
      <div className="space-y-3">
        {[
          { time: "9:00 AM", title: "Morning Planning", type: "focus", duration: "30 min", color: "bg-orange-500" },
          { time: "10:00 AM", title: "Deep Work: Product Design", type: "deep-work", duration: "2h", color: "bg-blue-500" },
          { time: "12:00 PM", title: "Lunch Break", type: "break", duration: "1h", color: "bg-green-500" },
          { time: "1:00 PM", title: "Team Standup", type: "meeting", duration: "30 min", color: "bg-purple-500" },
          { time: "2:00 PM", title: "Client Review", type: "meeting", duration: "1h", color: "bg-purple-500" },
          { time: "4:00 PM", title: "Strategy Session", type: "meeting", duration: "1h", color: "bg-purple-500" },
          { time: "5:30 PM", title: "Day Reflection", type: "reflection", duration: "30 min", color: "bg-indigo-500" }
        ].map((slot, index) => (
          <div key={index} className="flex items-center p-4 bg-white rounded-xl border border-zinc-200 hover:shadow-md transition-all cursor-pointer group">
            <div className={`w-3 h-3 ${slot.color} rounded-full mr-4`}></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-black">{slot.title}</h4>
                <span className="text-sm text-zinc-500">{slot.time} • {slot.duration}</span>
              </div>
              <span className="text-xs text-zinc-400 uppercase tracking-wider">{slot.type}</span>
            </div>
            <div className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-2 h-2 bg-zinc-400 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderJournal = () => (
    <div className="space-y-6">
      {/* Journal Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-black">Today's Journal</h3>
        <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4" />
          <span>New Entry</span>
        </button>
      </div>

      {/* Journal Entry */}
      <div className="bg-white rounded-xl border border-zinc-200">
        <div className="p-6 border-b border-zinc-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-black">Evening Reflection</h4>
            <span className="text-sm text-zinc-500">Today • 9:15 PM</span>
          </div>
          <textarea 
            className="w-full h-32 p-4 border border-zinc-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="How did today go? What did you learn? How do you feel?"
          ></textarea>
        </div>
        
        {/* AI Analysis */}
        <div className="p-6 bg-blue-50">
          <h4 className="font-semibold text-black mb-3 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-blue-500" />
            AI Analysis
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-zinc-600 mb-1">Mood</div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">😊</span>
                <span className="font-medium">Positive</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-zinc-600 mb-1">Energy</div>
              <div className="flex items-center">
                <div className="w-20 bg-zinc-200 rounded-full h-2 mr-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
                <span className="font-medium">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      {/* Tasks Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-black">My Tasks</h3>
        <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Task Lists */}
      <div className="space-y-6">
        {/* Today's Priority */}
        <div>
          <h4 className="font-medium text-black mb-3 flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            Today's Priority
          </h4>
          {[
            { title: "Complete Q4 Strategy Review", completed: true, time: "Done", priority: "high" },
            { title: "Prepare client presentation", completed: false, time: "Due 3 PM", priority: "high" },
            { title: "Team code review session", completed: false, time: "4 PM", priority: "medium" }
          ].map((task, index) => (
            <div key={index} className="flex items-center p-4 bg-white rounded-xl border border-zinc-200 mb-3 hover:shadow-md transition-all cursor-pointer group">
              <div className={`w-6 h-6 rounded-full border mr-4 flex items-center justify-center transition-all ${
                task.completed ? 'bg-green-500 border-green-500' : 'border-zinc-300 group-hover:border-green-400'
              }`}>
                {task.completed && <Check className="w-4 h-4 text-white" />}
              </div>
              <div className="flex-1">
                <h5 className={`font-medium ${task.completed ? 'text-zinc-400 line-through' : 'text-black'}`}>
                  {task.title}
                </h5>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-zinc-500">{task.time}</span>
                  <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tomorrow's Preview */}
        <div>
          <h4 className="font-medium text-black mb-3 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Tomorrow's Preview
          </h4>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <p className="text-sm text-zinc-700 mb-2">AI has prepared 3 focus blocks based on your patterns:</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 text-blue-500 mr-2" />
                <span>9-11 AM: Deep creative work (your peak hours)</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 text-blue-500 mr-2" />
                <span>1-3 PM: Team collaboration & meetings</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 text-blue-500 mr-2" />
                <span>4-6 PM: Strategy & planning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-black">Performance Analytics</h3>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-zinc-100 rounded-lg text-sm">Today</button>
          <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm">Week</button>
          <button className="px-3 py-1 bg-zinc-100 rounded-lg text-sm">Month</button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Focus Score", value: "94", unit: "/100", color: "text-green-500", trend: "+5" },
          { label: "Tasks Done", value: "12", unit: "", color: "text-blue-500", trend: "+3" },
          { label: "Deep Work", value: "3.5", unit: "h", color: "text-purple-500", trend: "+0.5h" },
          { label: "Energy", value: "87", unit: "%", color: "text-orange-500", trend: "+2%" }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-zinc-200">
            <div className="text-sm text-zinc-500 mb-1">{metric.label}</div>
            <div className="flex items-baseline">
              <span className={`text-2xl font-bold ${metric.color}`}>{metric.value}</span>
              <span className="text-sm text-zinc-400 ml-1">{metric.unit}</span>
            </div>
            <div className="text-xs text-green-500 mt-1">{metric.trend} from yesterday</div>
          </div>
        ))}
      </div>

      {/* Productivity Chart */}
      <div className="bg-white rounded-xl p-6 border border-zinc-200">
        <h4 className="font-semibold text-black mb-4">Weekly Productivity Trend</h4>
        <div className="h-48 flex items-end space-x-2">
          {[65, 78, 82, 75, 89, 94, 87].map((height, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000"
                style={{height: `${height}%`}}
              ></div>
              <span className="text-xs text-zinc-500 mt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h4 className="font-semibold text-black mb-3 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
          AI Insights
        </h4>
        <div className="space-y-3">
          <p className="text-sm text-zinc-700">📈 Your productivity peaks on Fridays - consider scheduling important work then</p>
          <p className="text-sm text-zinc-700">🎯 You're 23% more focused when you start with creative work in the morning</p>
          <p className="text-sm text-zinc-700">⚡ Your energy drops significantly after 3 PM - schedule lighter tasks for afternoons</p>
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
      className={`bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-white/80 shadow-2xl overflow-hidden transition-all duration-1000 ${
        appLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-black mb-3">
          Astrivya Live Demo
        </h2>
        <p className="text-xl text-zinc-600">
          Experience the complete app interface with daily workflow integration
        </p>
      </div>

      {/* App Window */}
      <div 
        ref={windowRef}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 max-w-4xl mx-auto"
      >
        {/* Window Controls */}
        <div className="h-12 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-zinc-200 rounded">
              <Minimize className="w-4 h-4 text-zinc-600" />
            </button>
            <button className="p-1 hover:bg-zinc-200 rounded">
              <Maximize className="w-4 h-4 text-zinc-600" />
            </button>
            <button className="p-1 hover:bg-zinc-200 rounded">
              <X className="w-4 h-4 text-zinc-600" />
            </button>
          </div>
        </div>

        {/* App Content */}
        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div ref={sidebarRef} className="w-64 bg-zinc-50 border-r border-zinc-200 p-4">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-black">Astrivya</span>
            </div>

            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => goToScreen(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                    activeScreen === item.id 
                      ? 'bg-orange-500 text-white' 
                      : 'text-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 bg-white">
            <div ref={contentRef}>
              {renderScreen()}
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Controls */}
      <div className="flex items-center justify-center space-x-4 mt-8">
        <button
          onClick={toggleWorkflow}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span>{isRunning ? 'Pause Demo' : 'Start Workflow'}</span>
        </button>

        <button
          onClick={nextStep}
          disabled={currentWorkflow >= workflowSteps.length - 1}
          className="flex items-center space-x-2 px-6 py-3 bg-white border border-zinc-200 text-zinc-700 rounded-full font-medium hover:bg-zinc-50 transition-all disabled:opacity-50"
        >
          <SkipForward className="w-5 h-5" />
          <span>Next Step</span>
        </button>

        <button
          onClick={() => {
            setCurrentWorkflow(0);
            setIsRunning(false);
            setActiveScreen('dashboard');
          }}
          className="flex items-center space-x-2 px-6 py-3 bg-white border border-zinc-200 text-zinc-700 rounded-full font-medium hover:bg-zinc-50 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Workflow Progress */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          {workflowSteps.map((step, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentWorkflow(index);
                setActiveScreen(step.screen);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                index === currentWorkflow 
                  ? `bg-gradient-to-r ${step.color} text-white` 
                  : index < currentWorkflow
                  ? 'bg-green-500 text-white'
                  : 'bg-zinc-200 text-zinc-500'
              }`}
            >
              {index < currentWorkflow ? <CheckCircle className="w-4 h-4" /> : index + 1}
            </button>
          ))}
        </div>
        <p className="text-sm text-zinc-600">
          Step {currentWorkflow + 1} of {workflowSteps.length}: {currentStep.title}
        </p>
      </div>
    </div>
  );
};

export default PremiumAppSimulation;
