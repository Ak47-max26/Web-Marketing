import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Target, 
  Zap, 
  Brain, 
  Users, 
  BarChart3, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

// Interactive Dashboard Component
const InteractiveDashboard = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [isRunning, setIsRunning] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Real-time updates
  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning]);

  // Simulated data
  const [tasks, setTasks] = useState([
    { id: 1, title: "Review quarterly goals", status: "pending", priority: "high", category: "Planning" },
    { id: 2, title: "Team standup meeting", status: "completed", priority: "medium", category: "Meetings" },
    { id: 3, title: "AI model optimization", status: "in-progress", priority: "high", category: "Development" },
    { id: 4, title: "Client presentation prep", status: "pending", priority: "high", category: "Presentations" }
  ]);

  const [metrics] = useState({
    productivity: 87,
    tasksCompleted: 12,
    hoursSaved: 5.2,
    focusScore: 92
  });

  const [aiSuggestions] = useState([
    { type: "schedule", message: "Schedule deep work session at 2 PM", confidence: 95 },
    { type: "task", message: "Prioritize AI optimization task", confidence: 88 },
    { type: "break", message: "Take a 15-minute break after current meeting", confidence: 92 }
  ]);

  // Calendar events (simulated)
  const [events] = useState([
    { time: "9:00 AM", title: "Team Standup", type: "meeting", duration: 30 },
    { time: "10:30 AM", title: "Deep Work: AI Development", type: "focus", duration: 120 },
    { time: "2:00 PM", title: "Client Call", type: "meeting", duration: 60 },
    { time: "4:00 PM", title: "Code Review Session", type: "development", duration: 90 }
  ]);

  const tabs = [
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'tasks', label: 'Tasks', icon: CheckCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'ai', label: 'AI Assistant', icon: Brain }
  ];

  const renderCalendar = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-black">Today's Schedule</h3>
        <div className="flex items-center space-x-2 text-sm text-zinc-600">
          <Clock className="w-4 h-4" />
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {events.map((event, index) => (
          <div key={index} className="flex items-center p-3 bg-white/60 rounded-xl border border-white/80 hover:bg-white/80 transition-all cursor-pointer">
            <div className={`w-3 h-3 rounded-full mr-3 ${
              event.type === 'meeting' ? 'bg-blue-500' :
              event.type === 'focus' ? 'bg-orange-500' : 'bg-green-500'
            }`}></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-black">{event.title}</h4>
                <span className="text-sm text-zinc-500">{event.time}</span>
              </div>
              <p className="text-sm text-zinc-600">{event.duration} minutes • {event.type}</p>
            </div>
            {event.type === 'focus' && (
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-black">Smart Task Management</h3>
        <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Quick Add</span>
        </button>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center p-3 bg-white/60 rounded-xl border border-white/80 hover:bg-white/80 transition-all cursor-pointer">
            <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
              task.status === 'completed' ? 'bg-green-500' :
              task.status === 'in-progress' ? 'bg-orange-500' : 'bg-zinc-300'
            }`}>
              {task.status === 'completed' && <CheckCircle className="w-3 h-3 text-white" />}
              {task.status === 'in-progress' && <Play className="w-3 h-3 text-white" />}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-black">{task.title}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs bg-zinc-100 text-zinc-700 px-2 py-1 rounded-full">{task.category}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {task.priority} priority
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-black">Productivity Analytics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/60 rounded-xl p-4 border border-white/80">
          <div className="flex items-center justify-between">
            <span className="text-zinc-600">Productivity Score</span>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-black mt-2">{metrics.productivity}%</div>
          <div className="w-full bg-zinc-200 rounded-full h-2 mt-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${metrics.productivity}%` }}></div>
          </div>
        </div>
        
        <div className="bg-white/60 rounded-xl p-4 border border-white/80">
          <div className="flex items-center justify-between">
            <span className="text-zinc-600">Focus Score</span>
            <Target className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-black mt-2">{metrics.focusScore}/100</div>
          <div className="w-full bg-zinc-200 rounded-full h-2 mt-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${metrics.focusScore}%` }}></div>
          </div>
        </div>
        
        <div className="bg-white/60 rounded-xl p-4 border border-white/80">
          <div className="flex items-center justify-between">
            <span className="text-zinc-600">Tasks Completed</span>
            <CheckCircle className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-black mt-2">{metrics.tasksCompleted}</div>
          <p className="text-xs text-zinc-500 mt-1">Today</p>
        </div>
        
        <div className="bg-white/60 rounded-xl p-4 border border-white/80">
          <div className="flex items-center justify-between">
            <span className="text-zinc-600">Time Saved</span>
            <Clock className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-black mt-2">{metrics.hoursSaved}h</div>
          <p className="text-xs text-zinc-500 mt-1">This week</p>
        </div>
      </div>
    </div>
  );

  const renderAIAssistant = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-black">AI Assistant</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-zinc-600">Active</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {aiSuggestions.map((suggestion, index) => (
          <div key={index} className="flex items-start p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-black font-medium">{suggestion.message}</p>
              <div className="flex items-center mt-2">
                <span className="text-xs text-zinc-600 mr-2">Confidence: {suggestion.confidence}%</span>
                <div className="w-16 bg-zinc-200 rounded-full h-1">
                  <div 
                    className="bg-blue-500 h-1 rounded-full" 
                    style={{ width: `${suggestion.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white/60 rounded-xl p-4 border border-white/80">
        <h4 className="font-medium text-black mb-2">AI Context</h4>
        <p className="text-sm text-zinc-600">
          Based on your current workload and patterns, I recommend focusing on high-priority tasks during your next deep work session.
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-white/80 shadow-xl">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-black mb-2">Interactive Dashboard</h2>
          <p className="text-zinc-600">Experience Astrivya's AI-powered productivity in action</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
              isRunning ? 'bg-green-500 text-white' : 'bg-zinc-200 text-zinc-700'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Live' : 'Paused'}</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-white/60 rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
              activeTab === tab.id 
                ? 'bg-orange-500 text-white shadow-md' 
                : 'text-zinc-600 hover:text-black hover:bg-white/60'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'analytics' && renderAnalytics()}
        {activeTab === 'ai' && renderAIAssistant()}
      </div>
    </div>
  );
};

export default InteractiveDashboard;
