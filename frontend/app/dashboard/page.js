'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Coins, MessageSquare, X, Activity, ArrowUpRight, Plus, Target, CheckCircle2 } from 'lucide-react';

// Utility function to replace cn
const cn = (...classes) => classes.filter(Boolean).join(' ');

const METRIC_COLORS = {
  Move: "#FF2D55",
  Exercise: "#2CD758",
  Stand: "#007AFF",
};

function CardDetails({
  category = "Activity",
  title = "Today's Progress",
  metrics = [],
  dailyGoals = [],
  onAddGoal,
  onToggleGoal,
  onViewDetails,
  className,
}) {
  const [isHovering, setIsHovering] = useState(null);

  const handleGoalToggle = (goalId) => {
    onToggleGoal?.(goalId);
  };

  return (
    <div
      className={cn(
        "relative h-full rounded-3xl p-6",
        "bg-gray-900/50 backdrop-blur-lg",
        "border border-gray-800",
        "hover:border-purple-500/50",
        "transition-all duration-300",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-gray-800/50">
          <Activity className="w-5 h-5 text-[#FF2D55]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{category}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setIsHovering(metric.label)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-gray-800/50" />
              <div
                className={cn(
                  "absolute inset-0 rounded-full border-4 transition-all duration-500",
                  isHovering === metric.label && "scale-105",
                )}
                style={{
                  borderColor: METRIC_COLORS[metric.label],
                  clipPath: `polygon(0 0, 100% 0, 100% ${metric.trend}%, 0 ${metric.trend}%)`,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-white">{metric.value}</span>
                <span className="text-xs text-gray-400">{metric.unit}</span>
              </div>
            </div>
            <span className="mt-3 text-sm font-medium text-gray-300">{metric.label}</span>
            <span className="text-xs text-gray-500">{metric.trend}%</span>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        <div className="h-px bg-gray-800" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="flex items-center gap-2 text-sm font-medium text-gray-300">
              <Target className="w-4 h-4" />
              Today's Goals
            </h4>
            <button
              type="button"
              onClick={onAddGoal}
              className="p-1.5 rounded-full hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="space-y-2">
            {dailyGoals.map((goal) => (
              <button
                type="button"
                key={goal.id}
                onClick={() => handleGoalToggle(goal.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl",
                  "bg-gray-900/50",
                  "border border-gray-800/50",
                  "hover:border-purple-500/50",
                  "transition-all",
                )}
              >
                <CheckCircle2
                  className={cn("w-5 h-5", goal.isCompleted ? "text-emerald-500" : "text-gray-600")}
                />
                <span
                  className={cn(
                    "text-sm text-left",
                    goal.isCompleted
                      ? "text-gray-400 line-through"
                      : "text-gray-300",
                  )}
                >
                  {goal.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <button
            type="button"
            onClick={onViewDetails}
            className="inline-flex items-center gap-2 text-sm font-medium
              text-gray-400 hover:text-white
              transition-colors duration-200"
          >
            View Activity Details
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

const INITIAL_METRICS = [
  { label: "Move", value: "420", trend: 85, unit: "cal" },
  { label: "Exercise", value: "35", trend: 70, unit: "min" },
  { label: "Stand", value: "10", trend: 83, unit: "hrs" },
];

const INITIAL_GOALS = [
  { id: "1", title: "30min Morning Yoga", isCompleted: true },
  { id: "2", title: "10k Steps", isCompleted: false },
  { id: "3", title: "Drink 2L Water", isCompleted: true },
];

const Dashboard = () => {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState('tutor');
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [metrics, setMetrics] = useState(INITIAL_METRICS);

  const features = [
    { id: 'tutor', name: 'AI Tutor', icon: '🎓' },
    { id: 'notebook', name: 'Notebook Generation', icon: '📓' },
    { id: 'pdf', name: 'Content PDF', icon: '📄' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feature: activeFeature }),
      });
      
      const data = await response.json();
      setContent(data.content);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getFeatureContent = () => {
    switch (activeFeature) {
      case 'tutor':
        return 'AI Tutor will help you learn any subject interactively';
      case 'notebook':
        return 'Generate comprehensive study notes automatically';
      case 'pdf':
        return 'Convert and organize your content into PDF format';
      default:
        return 'Select a feature to get started';
    }
  };

  const handleToggleGoal = (goalId) => {
    setGoals((prev) => prev.map((goal) => (goal.id === goalId ? { ...goal, isCompleted: !goal.isCompleted } : goal)));
  };

  const handleAddGoal = () => {
    const newGoal = {
      id: `goal-${goals.length + 1}`,
      title: `New Goal ${goals.length + 1}`,
      isCompleted: false,
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const handleViewDetails = () => {
    console.log("Viewing details");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse -top-48 -left-48"></div>
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse -bottom-48 -right-48"></div>
      </div>

      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-800 p-4 relative z-10">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-white hover:text-purple-400 transition-colors duration-300">
            OffNet
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-800/80 px-4 py-2 rounded-full border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
              <Coins className="text-purple-400 w-5 h-5 mr-2" />
              <span className="font-semibold text-white">2,500</span>
            </div>
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              Back to Home
            </button>
          </div>
        </nav>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar */}
        <div className="w-56 bg-gray-900/50 backdrop-blur-lg border-r border-gray-800">
          <div className="p-4">
            <h2 className="text-xl font-bold text-white mb-6">Features</h2>
            <div className="space-y-2">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                    activeFeature === feature.id
                      ? 'bg-purple-500/20 text-white border border-purple-500/50 shadow-lg shadow-purple-500/20'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'
                  }`}
                >
                  <span className="text-xl">{feature.icon}</span>
                  <span>{feature.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            {/* Original Content Area */}
            <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 shadow-lg p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">
                  {features.find(f => f.id === activeFeature)?.name}
                </h1>
                <p className="text-gray-400">
                  {getFeatureContent()}
                </p>
              </div>

              <div className="bg-gray-800/30 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.length > 0 ? (
                    content.map((item, index) => (
                      <div
                        key={index}
                        className="group bg-gray-900/50 p-4 rounded-lg border border-gray-800 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
                      >
                        <h3 className="font-semibold mb-2 text-purple-400 group-hover:text-purple-300">{item.title}</h3>
                        <p className="text-gray-400 group-hover:text-gray-300">{item.content}</p>
                      </div>
                    ))
                  ) : (
                    [1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="group bg-gray-900/50 p-4 rounded-lg border border-gray-800 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
                        >
                        <h3 className="font-semibold mb-2 text-purple-400 group-hover:text-purple-300">Content Display {item}</h3>
                        <p className="text-gray-400 group-hover:text-gray-300">
                          Click generate to create personalized content.
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-500
                  ${isGenerating
                    ? 'bg-purple-500/50 cursor-wait'
                    : 'bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 hover:border-purple-500'
                  } text-white shadow-lg hover:shadow-purple-500/20`}
              >
                {isGenerating ? 'Generating...' : 'Generate Content'}
              </button>
            </div>

            {/* Activity Card */}
            {/* <CardDetails
              metrics={metrics}
              dailyGoals={goals}
              onAddGoal={handleAddGoal}
              onToggleGoal={handleToggleGoal}
              onViewDetails={handleViewDetails}
            /> */}
          </div>
        </div>

        {/* Right Chat History Sidebar */}
        <div className={`bg-gray-900/50 backdrop-blur-lg border-l border-gray-800 w-72 transform transition-all duration-300 ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-purple-400" />
                Chat History
              </h2>
              <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="text-gray-400 hover:text-white transition-colors duration-300 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                {
                  id: 1,
                  question: "How do I solve quadratic equations?",
                  timestamp: "2 hours ago",
                  feature: "tutor"
                },
                {
                  id: 2,
                  question: "Generate notes for World War II",
                  timestamp: "3 hours ago",
                  feature: "notebook"
                },
                {
                  id: 3,
                  question: "Convert my biology notes to PDF",
                  timestamp: "1 day ago",
                  feature: "pdf"
                }
              ].map((chat) => (
                <div
                  key={chat.id}
                  className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
                >
                  <p className="font-medium text-gray-300 group-hover:text-white mb-1">{chat.question}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-400 group-hover:text-purple-300">{chat.feature}</span>
                    <span className="text-gray-500 group-hover:text-gray-400">{chat.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;