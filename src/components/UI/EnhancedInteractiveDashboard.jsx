import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Brain, 
  Calendar, 
  Target, 
  FileText, 
  Network,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Zap,
  Clock,
  CheckCircle,
  TrendingUp,
  Heart,
  Users,
  BarChart3,
  Sparkles,
  AlertCircle
} from 'lucide-react';

// Enhanced Interactive Dashboard Component with All Core Modules
const EnhancedInteractiveDashboard = () => {
  const [activeModule, setActiveModule] = useState('command-kernel');
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [command, setCommand] = useState('');
  const [processedCommand, setProcessedCommand] = useState(null);

  // Command Kernel State
  const [commandHistory] = useState([
    { text: "Create task: Finish presentation by tomorrow 5pm", intent: "task", processed: true },
    { text: "Summarize today's journal", intent: "query", processed: true },
    { text: "Plan my next 3 days", intent: "goal", processed: true },
    { text: "Optimize my schedule", intent: "action", processed: true }
  ]);

  // Autonomy Engine State
  const [autonomySteps] = useState([
    { step: "Journal scanned", status: "completed", progress: 100 },
    { step: "Emotions detected", status: "completed", progress: 100 },
    { step: "Tasks analyzed", status: "in-progress", progress: 75 },
    { step: "Insights generated", status: "pending", progress: 0 }
  ]);

  // Task Intelligence State
  const [tasks] = useState([
    { 
      title: "Finish presentation", 
      complexity: 8, 
      energy: 6, 
      priority: "high",
      category: "Work",
      autoScheduled: false
    },
    { 
      title: "Team standup", 
      complexity: 3, 
      energy: 8, 
      priority: "medium",
      category: "Meetings", 
      autoScheduled: true
    },
    { 
      title: "Code review", 
      complexity: 5, 
      energy: 7, 
      priority: "high",
      category: "Development",
      autoScheduled: true
    }
  ]);

  // Journal Analysis State
  const [journalEntry] = useState({
    text: "Today was productive but exhausting. Had three back-to-back meetings which drained my energy. The presentation is coming together well though...",
    sentiment: "Mixed",
    emotions: ["Tired", "Accomplished", "Frustrated"],
    topics: ["Workload", "Meetings", "Energy Management"]
  });

  // Memory Graph State
  const [memoryNodes] = useState([
    { id: 1, type: "task", title: "Presentation Project", connections: 3 },
    { id: 2, type: "person", title: "Team Lead Sarah", connections: 2 },
    { id: 3, type: "note", title: "Q4 Goals Discussion", connections: 1 },
    { id: 4, type: "project", title: "Client Demo", connections: 2 }
  ]);

  const modules = [
    { id: 'command-kernel', label: 'Command Kernel', icon: Send, color: 'from-blue-500 to-indigo-500' },
    { id: 'autonomy-engine', label: 'Autonomy Engine', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { id: 'task-intelligence', label: 'Taskmind', icon: Target, color: 'from-orange-500 to-amber-500' },
    { id: 'calendar-scheduler', label: 'Smart Calendar', icon: Calendar, color: 'from-green-500 to-emerald-500' },
    { id: 'journal-reflection', label: 'Journal AI', icon: FileText, color: 'from-cyan-500 to-blue-500' },
    { id: 'memory-graph', label: 'Memory Graph', icon: Network, color: 'from-red-500 to-rose-500' }
  ];

  const renderCommandKernel = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-black mb-2">Command Kernel</h3>
        <p className="text-zinc-600">Type natural commands and watch AI interpret them in real-time</p>
      </div>

      {/* Command Input */}
      <div className="bg-white/60 rounded-xl p-6 border border-white/80">
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Try: 'Plan my day' or 'Optimize my schedule'"
              className="w-full px-4 py-3 rounded-lg border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="absolute right-2 top-2 px-4 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Example Commands */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {commandHistory.map((cmd, index) => (
            <button
              key={index}
              onClick={() => setCommand(cmd.text)}
              className="text-left px-3 py-2 text-sm bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
            >
              "{cmd.text}"
            </button>
          ))}
        </div>

        {/* Command Processing Visualization */}
        {command && (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Processing command...</span>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Detected Intent:</span>
                <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">TASK</span>
              </div>
              <div className="text-sm text-zinc-700">
                Command parsed → Structure interpreted → AI result generated
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAutonomyEngine = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-black mb-2">Autonomy Engine</h3>
        <p className="text-zinc-600">AI agents working autonomously to analyze and optimize your workflow</p>
      </div>

      {/* Processing Timeline */}
      <div className="space-y-4">
        {autonomySteps.map((step, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step.status === 'completed' ? 'bg-green-500' :
              step.status === 'in-progress' ? 'bg-orange-500' : 'bg-zinc-300'
            }`}>
              {step.status === 'completed' && <CheckCircle className="w-4 h-4 text-white" />}
              {step.status === 'in-progress' && <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              {step.status === 'pending' && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{step.step}</span>
                <span className="text-sm text-zinc-500">{step.progress}%</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    step.status === 'completed' ? 'bg-green-500' :
                    step.status === 'in-progress' ? 'bg-orange-500' : 'bg-zinc-300'
                  }`}
                  style={{ width: `${step.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Generated Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { type: "insight", title: "High energy tasks clustered", desc: "Consider spreading high-energy work throughout the day" },
          { type: "action", title: "Auto-schedule 2 tasks", desc: "Moved 'Code review' to 3 PM focus slot" },
          { type: "mood", title: "Energy dip detected", desc: "Suggested 15-min break after lunch" }
        ].map((card, index) => (
          <div key={index} className="bg-white/60 rounded-xl p-4 border border-white/80 hover:bg-white/80 transition-all">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${
                card.type === 'insight' ? 'bg-blue-500' :
                card.type === 'action' ? 'bg-green-500' : 'bg-purple-500'
              }`}></div>
              <span className="text-xs font-medium text-zinc-600 uppercase">{card.type}</span>
            </div>
            <h4 className="font-semibold text-black mb-1">{card.title}</h4>
            <p className="text-sm text-zinc-600">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTaskIntelligence = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-black mb-2">Task Intelligence (Temporal Taskmind)</h3>
        <p className="text-zinc-600">AI analyzes and optimizes your task load in real-time</p>
      </div>

      {/* Auto-Schedule Button */}
      <div className="text-center">
        <button className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-medium hover:shadow-lg transition-all">
          <Zap className="w-4 h-4" />
          <span>Auto-Schedule All Tasks</span>
        </button>
      </div>

      {/* Task List with Scores */}
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div key={index} className="bg-white/60 rounded-xl p-4 border border-white/80 hover:bg-white/80 transition-all">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-black">{task.title}</h4>
              <button className="px-3 py-1 bg-orange-500 text-white text-xs rounded-full hover:bg-orange-600 transition-colors">
                Auto-Schedule
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-sm text-zinc-600 mb-1">Complexity</div>
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-zinc-300 rounded-full"></div>
                  <div className="w-4 h-4 bg-zinc-300 rounded-full"></div>
                </div>
                <div className="text-xs font-medium mt-1">{task.complexity}/10</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-zinc-600 mb-1">Energy</div>
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-zinc-300 rounded-full"></div>
                </div>
                <div className="text-xs font-medium mt-1">{task.energy}/10</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-zinc-600 mb-1">Priority</div>
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {task.priority}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Auto-Scheduling Animation Preview */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
        <h4 className="font-semibold text-black mb-3 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-orange-500" />
          Smart Scheduling Results
        </h4>
        <div className="space-y-2 text-sm text-zinc-700">
          <div>• "Finish presentation" scheduled for 2-4 PM (high energy slot)</div>
          <div>• "Team standup" moved to 10 AM (social energy match)</div>
          <div>• "Code review" placed in deep focus block (high complexity)</div>
        </div>
      </div>
    </div>
  );

  const renderCalendarScheduler = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-black mb-2">Smart Calendar Scheduler</h3>
        <p className="text-zinc-600">Intelligent scheduling with conflict resolution</p>
      </div>

      {/* Mini Calendar View */}
      <div className="bg-white/60 rounded-xl p-6 border border-white/80">
        <div className="text-center mb-4">
          <h4 className="font-semibold text-black">Today's Optimized Schedule</h4>
        </div>
        
        <div className="space-y-2">
          {[
            { time: "9:00 AM", task: "Team Standup", type: "meeting", color: "bg-blue-500" },
            { time: "10:30 AM", task: "Deep Work: Presentation", type: "focus", color: "bg-orange-500", energy: "High Energy Required" },
            { time: "2:00 PM", task: "Code Review Session", type: "development", color: "bg-green-500" },
            { time: "4:00 PM", task: "Client Call Prep", type: "prep", color: "bg-purple-500" }
          ].map((item, index) => (
            <div key={index} className="flex items-center p-3 bg-white rounded-lg border border-zinc-200 hover:shadow-md transition-all cursor-pointer">
              <div className={`w-3 h-3 ${item.color} rounded-full mr-3`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-black">{item.task}</span>
                  <span className="text-sm text-zinc-500">{item.time}</span>
                </div>
                {item.energy && (
                  <div className="text-xs text-orange-600 mt-1">{item.energy}</div>
                )}
              </div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Conflict Resolution Demo */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-200">
        <h4 className="font-semibold text-black mb-2 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
          Conflict Resolution
        </h4>
        <div className="space-y-2 text-sm text-zinc-700">
          <div>• Detected conflict: "Meeting" overlaps with "Deep Work"</div>
          <div>• Solution: Moved meeting to 9 AM, added 15-min break</div>
          <div>• Energy optimization: High-energy tasks placed in optimal time slots</div>
        </div>
      </div>
    </div>
  );

  const renderJournalReflection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-black mb-2">Journal + Reflection AI</h3>
        <p className="text-zinc-600">AI analyzes your journal entries for insights and patterns</p>
      </div>

      {/* Journal Entry */}
      <div className="bg-white/60 rounded-xl p-6 border border-white/80">
        <h4 className="font-semibold text-black mb-3">Today's Journal Entry</h4>
        <div className="bg-zinc-50 rounded-lg p-4 mb-4 border border-zinc-200">
          <p className="text-zinc-700 italic">"{journalEntry.text}"</p>
        </div>
        
        <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
          <Brain className="w-4 h-4 inline mr-2" />
          Analyze Journal
        </button>
      </div>

      {/* Analysis Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/60 rounded-xl p-4 border border-white/80">
          <h4 className="font-semibold text-black mb-3 flex items-center">
            <Heart className="w-4 h-4 mr-2 text-red-500" />
            Sentiment Analysis
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Overall Sentiment:</span>
              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                {journalEntry.sentiment}
              </span>
            </div>
            <div>
              <div className="text-sm mb-2">Detected Emotions:</div>
              <div className="flex flex-wrap gap-1">
                {journalEntry.emotions.map((emotion, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                    {emotion}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/60 rounded-xl p-4 border border-white/80">
          <h4 className="font-semibold text-black mb-3 flex items-center">
            <Target className="w-4 h-4 mr-2 text-blue-500" />
            Topic Extraction
          </h4>
          <div className="space-y-2">
            <div className="text-sm mb-2">Key Topics:</div>
            <div className="flex flex-wrap gap-1">
              {journalEntry.topics.map((topic, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Reflection Summary */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h4 className="font-semibold text-black mb-3 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
          AI Reflection Summary
        </h4>
        <p className="text-zinc-700 leading-relaxed">
          Based on your journal entry, I notice you've been managing a heavy workload. 
          Your energy seems depleted after meetings, but you're making good progress on your presentation. 
          Consider scheduling more breaks between back-to-back meetings to maintain energy levels.
        </p>
      </div>
    </div>
  );

  const renderMemoryGraph = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-black mb-2">Memory Graph</h3>
        <p className="text-zinc-600">Visual map of your knowledge, tasks, and connections</p>
      </div>

      {/* Node Graph Visualization */}
      <div className="bg-white/60 rounded-xl p-6 border border-white/80 min-h-[300px] relative overflow-hidden">
        <div className="text-center text-zinc-500 mb-4">
          Interactive Knowledge Graph (Demo)
        </div>
        
        {/* Simulated Node Positions */}
        <div className="relative h-48">
          {memoryNodes.map((node, index) => {
            const positions = [
              { x: '20%', y: '30%' },
              { x: '70%', y: '25%' },
              { x: '30%', y: '70%' },
              { x: '75%', y: '65%' }
            ];
            
            return (
              <div
                key={node.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group`}
                style={{ left: positions[index].x, top: positions[index].y }}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  node.type === 'task' ? 'bg-orange-500' :
                  node.type === 'person' ? 'bg-blue-500' :
                  node.type === 'note' ? 'bg-green-500' : 'bg-purple-500'
                } shadow-lg group-hover:scale-110 transition-transform`}>
                  {node.title.charAt(0)}
                </div>
                <div className="absolute top-14 left-1/2 transform -translate-x-1/2 text-xs text-center">
                  <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {node.title} ({node.connections} connections)
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Connection Lines (simulated) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="20%" y1="30%" x2="70%" y2="25%" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="2" />
            <line x1="30%" y1="70%" x2="75%" y2="65%" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" />
            <line x1="70%" y1="25%" x2="75%" y2="65%" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Connection Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/60 rounded-xl p-4 border border-white/80">
          <h4 className="font-semibold text-black mb-3">Active Connections</h4>
          <div className="space-y-2 text-sm text-zinc-700">
            <div>• "Presentation Project" → Team Lead Sarah</div>
            <div>• "Client Demo" → Q4 Goals Discussion</div>
            <div>• "Code Review" → Team collaboration</div>
          </div>
        </div>
        
        <div className="bg-white/60 rounded-xl p-4 border border-white/80">
          <h4 className="font-semibold text-black mb-3">AI Insights</h4>
          <div className="space-y-2 text-sm text-zinc-700">
            <div>• Strong pattern: Work projects connect through team members</div>
            <div>• Opportunity: Group similar tasks for efficiency</div>
            <div>• Suggestion: Add more personal notes to enhance context</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentModule = () => {
    switch (activeModule) {
      case 'command-kernel':
        return renderCommandKernel();
      case 'autonomy-engine':
        return renderAutonomyEngine();
      case 'task-intelligence':
        return renderTaskIntelligence();
      case 'calendar-scheduler':
        return renderCalendarScheduler();
      case 'journal-reflection':
        return renderJournalReflection();
      case 'memory-graph':
        return renderMemoryGraph();
      default:
        return renderCommandKernel();
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-white/80 shadow-xl">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-black mb-2">Enhanced Interactive Demo</h2>
          <p className="text-zinc-600">Experience Astrivya's AI-powered modules in action</p>
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
          
          <button 
            onClick={() => {
              setCurrentStep(0);
              setProcessedCommand(null);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Module Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 bg-white/60 rounded-xl p-2">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => setActiveModule(module.id)}
            className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition-all ${
              activeModule === module.id 
                ? `bg-gradient-to-r ${module.color} text-white shadow-md` 
                : 'text-zinc-600 hover:text-black hover:bg-white/60'
            }`}
          >
            <module.icon className="w-4 h-4" />
            <span className="font-medium text-sm">{module.label}</span>
          </button>
        ))}
      </div>

      {/* Module Content */}
      <div className="min-h-[500px]">
        {renderCurrentModule()}
      </div>

      {/* Next Steps CTA */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-full font-medium shadow-xl hover:shadow-2xl transition-shadow">
          <span>Want the real Astrivya experience?</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default EnhancedInteractiveDashboard;
