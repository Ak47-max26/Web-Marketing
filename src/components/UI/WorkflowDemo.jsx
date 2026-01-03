import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward,
  Clock,
  Coffee,
  Briefcase,
  Moon,
  Sunrise,
  Zap,
  Brain,
  Calendar,
  Target,
  FileText,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Heart,
  Users,
  TrendingUp,
  Mic
} from 'lucide-react';
import gsap from 'gsap';

// Workflow Demo Component - Shows complete day integration
const WorkflowDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Animation refs
  const timelineRef = useRef(null);
  const progressBarRef = useRef(null);
  const workflowContainerRef = useRef(null);

  // Daily workflow steps
  const workflowSteps = [
    {
      time: "7:00 AM",
      icon: Sunrise,
      title: "Morning Journal Entry",
      description: "You write in your journal about yesterday's challenges and today's goals",
      action: "Astrivya analyzes your entry and detects stress patterns",
      result: "AI suggests starting with a lighter task to build momentum",
      color: "from-orange-400 to-yellow-400",
      bgColor: "bg-gradient-to-br from-orange-50 to-yellow-50",
      module: "journal"
    },
    {
      time: "8:30 AM",
      icon: Coffee,
      title: "Smart Schedule Creation",
      description: "Ask: 'Plan my day for maximum productivity'",
      action: "Command Kernel processes your natural language request",
      result: "Tasks automatically organized by energy levels and priorities",
      color: "from-blue-400 to-indigo-400",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      module: "command"
    },
    {
      time: "10:00 AM",
      icon: Briefcase,
      title: "Focus Time Protection",
      description: "Meeting request arrives for your deep work block",
      action: "Autonomy Engine detects scheduling conflict",
      result: "Automatically reschedules meeting and inserts focus time",
      color: "from-green-400 to-emerald-400",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      module: "autonomy"
    },
    {
      time: "2:00 PM",
      icon: Users,
      title: "Team Collaboration",
      description: "Team members need input on urgent project",
      action: "Memory Graph suggests relevant context from past discussions",
      result: "AI retrieves relevant information and prepares response",
      color: "from-purple-400 to-pink-400",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      module: "memory"
    },
    {
      time: "5:30 PM",
      icon: TrendingUp,
      title: "End-of-Day Analysis",
      description: "Review completed tasks and insights gained",
      action: "AI analyzes patterns and suggests tomorrow's priorities",
      result: "Personalized recommendations based on your performance",
      color: "from-cyan-400 to-blue-400",
      bgColor: "bg-gradient-to-br from-cyan-50 to-blue-50",
      module: "analytics"
    },
    {
      time: "9:00 PM",
      icon: Moon,
      title: "Evening Reflection",
      description: "Write about today's experiences and feelings",
      action: "AI identifies energy patterns and emotional trends",
      result: "Automated reflection summary with tomorrow's suggestions",
      color: "from-indigo-400 to-purple-400",
      bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50",
      module: "reflection"
    }
  ];

  // Auto-advance workflow
  useEffect(() => {
    if (isPlaying && currentStep < workflowSteps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 4000); // 4 seconds per step

      return () => clearTimeout(timer);
    } else if (currentStep >= workflowSteps.length - 1) {
      setIsPlaying(false);
      setIsCompleted(true);
    }
  }, [isPlaying, currentStep, workflowSteps.length]);

  // GSAP animations
  useEffect(() => {
    if (workflowContainerRef.current) {
      gsap.fromTo(
        workflowContainerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (progressBarRef.current) {
      const progress = ((currentStep + 1) / workflowSteps.length) * 100;
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [currentStep, workflowSteps.length]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const nextStep = () => {
    if (currentStep < workflowSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsCompleted(false);
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
    setIsPlaying(false);
    setIsCompleted(false);
  };

  const currentWorkflow = workflowSteps[currentStep];

  return (
    <div 
      ref={workflowContainerRef}
      className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-white/80 shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-black mb-3">
          A Day in the Life with Astrivya
        </h2>
        <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
          Experience how Astrivya seamlessly integrates into your daily workflow
        </p>
      </div>

      {/* Progress Timeline */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-zinc-600">Workflow Progress</span>
          <span className="text-sm text-zinc-500">{currentStep + 1} of {workflowSteps.length}</span>
        </div>
        <div className="w-full bg-zinc-200 rounded-full h-3 overflow-hidden">
          <div 
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
            style={{ width: '0%' }}
          ></div>
        </div>
      </div>

      {/* Main Workflow Display */}
      <div className={`${currentWorkflow.bgColor} rounded-2xl p-8 mb-8 border border-white/60 transition-all duration-1000`}>
        {/* Time Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/60">
            <currentWorkflow.icon className="w-6 h-6 text-zinc-700" />
            <span className="text-lg font-semibold text-black">{currentWorkflow.time}</span>
          </div>
        </div>

        {/* Workflow Content */}
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-black mb-2">{currentWorkflow.title}</h3>
            <p className="text-lg text-zinc-700">{currentWorkflow.description}</p>
          </div>

          {/* Workflow Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* User Action */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/80">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <h4 className="font-semibold text-black">Your Action</h4>
              </div>
              <p className="text-zinc-700 text-sm">{currentWorkflow.action}</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-zinc-400" />
            </div>

            {/* AI Result */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/80">
              <div className="flex items-center mb-3">
                <div className={`w-8 h-8 bg-gradient-to-r ${currentWorkflow.color} rounded-full flex items-center justify-center mr-3`}>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-black">AI Result</h4>
              </div>
              <p className="text-zinc-700 text-sm">{currentWorkflow.result}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <button
          onClick={togglePlayback}
          disabled={isCompleted}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span>{isPlaying ? 'Pause Demo' : 'Start Demo'}</span>
        </button>

        <button
          onClick={nextStep}
          disabled={currentStep >= workflowSteps.length - 1}
          className="flex items-center space-x-2 px-6 py-3 bg-white border border-zinc-200 text-zinc-700 rounded-full font-medium hover:bg-zinc-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SkipForward className="w-5 h-5" />
          <span>Next Step</span>
        </button>

        <button
          onClick={resetDemo}
          className="flex items-center space-x-2 px-6 py-3 bg-white border border-zinc-200 text-zinc-700 rounded-full font-medium hover:bg-zinc-50 transition-all"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
          <span>Reset</span>
        </button>
      </div>

      {/* Step Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {workflowSteps.map((step, index) => (
          <button
            key={index}
            onClick={() => goToStep(index)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              index === currentStep
                ? `bg-gradient-to-r ${step.color} text-white shadow-md`
                : index < currentStep
                ? 'bg-green-500 text-white'
                : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
            }`}
          >
            {index < currentStep && <CheckCircle className="w-4 h-4" />}
            <step.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{step.time}</span>
          </button>
        ))}
      </div>

      {/* Completion Message */}
      {isCompleted && (
        <div className="text-center bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl">
          <h4 className="text-2xl font-bold mb-2">🎉 Workflow Demo Complete!</h4>
          <p className="mb-4">You've experienced how Astrivya seamlessly integrates into every part of your day.</p>
          <button className="bg-white text-green-600 px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all">
            Try Astrivya for Yourself
          </button>
        </div>
      )}

      {/* Quick Feature Highlights */}
      {!isCompleted && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {[
            { icon: Brain, label: "AI Analysis", active: ['journal', 'reflection'] },
            { icon: Mic, label: "Voice Commands", active: ['command'] },
            { icon: Calendar, label: "Smart Scheduling", active: ['autonomy', 'command'] },
            { icon: Target, label: "Task Intelligence", active: ['autonomy'] },
            { icon: TrendingUp, label: "Performance Analytics", active: ['analytics'] },
            { icon: FileText, label: "Memory Graph", active: ['memory'] }
          ].map((feature, index) => {
            const isActive = feature.active.includes(currentWorkflow.module);
            return (
              <div
                key={index}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive 
                    ? 'bg-white/80 text-black border border-orange-200' 
                    : 'bg-zinc-100 text-zinc-500'
                }`}
              >
                <feature.icon className={`w-4 h-4 ${isActive ? 'text-orange-500' : ''}`} />
                <span>{feature.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WorkflowDemo;
