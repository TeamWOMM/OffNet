'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
  Coins,
  MessageSquare,
  X,
  Activity,
  ArrowUpRight,
  Plus,
  Target,
  CheckCircle2,
  Table as TableIcon
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/kokonutui/tables";
import useRouteTo from '@/hooks/useRouterTo';

const cn = (...classes) => classes.filter(Boolean).join(' ');
function handleSearch(s){
  console.log(s);
}

// const Dashboard = () => {
//   const router = useRouter();
//   const [activeFeature, setActiveFeature] = useState('tutor');
//   const [isGenerating] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(true);
//   const [goals, setGoals] = useState([
//     { id: "1", title: "Chemical Equations", isCompleted: true },
//     { id: "2", title: "Integration Homework", isCompleted: false },
//     { id: "3", title: "Environment Lecture", isCompleted: false },
//   ]);

//   const [metrics] = useState([
//     { label: "Mathematics", value: "78", trend: 85, unit: "%" },
//     { label: "Physics", value: "89", trend: 70, unit: "%" },
//     { label: "Chemistry", value: "68", trend: 83, unit: "%" },
//   ]);

//   const tableData = [
//     { id: 1, subject: "Mathematics", progress: "85%", status: "On Track", lastActivity: "2h ago" },
//     { id: 2, subject: "Physics", progress: "72%", status: "Need Focus", lastActivity: "1d ago" },
//     { id: 3, subject: "Chemistry", progress: "93%", status: "Excellent", lastActivity: "5h ago" },
//   ];

//   const features = [
//     { id: 'tutor', name: 'AI Tutor', icon: '🎓' },
//     { id: 'notebook', name: 'Quiz Statistics', icon: '📓' },
//     { id: 'pdf', name: 'Content PDF', icon: '📄' }
//   ];

//   const handleToggleGoal = (goalId) => {
//     setGoals(prev => prev.map(goal => 
//       goal.id === goalId ? { ...goal, isCompleted: !goal.isCompleted } : goal
//     ));
//   };

//   const handleAddGoal = () => {
//     setGoals(prev => [...prev, {
//       id: `${prev.length + 1}`,
//       title: `Next Week ${prev.length + 1}`,
//       isCompleted: false
//     }]);
//   };

//   const handleViewDetails = () => {
//     console.log("Viewing details");
//   };

//   const handleSearch = (query) => {
//     console.log('Searching for:', query);
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black">
//       <div className="fixed inset-0"></div>
//       {/* <ParticlesBackground
//         title=""
//         subtitle=""
//         particleCount={1000}
//         noiseIntensity={0.002}
//         particleSize={{ min: 0.2, max: 1 }}
//         className="absolute inset-0 z-0"
//       /> */}
      
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse -top-48 -left-48" />
//           <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse -bottom-48 -right-48" />
//           <div className="absolute w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
//         </div>

//         <header className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-800 p-4 relative z-10">
//           <nav className="flex justify-between items-center max-w-7xl mx-auto">
//             <Link href="/" className="text-xl font-bold text-white hover:text-purple-400 transition-colors duration-300">
//               OffNet
//             </Link>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center bg-gray-800/80 px-4 py-2 rounded-full border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
//                 <Coins className="text-purple-400 w-5 h-5 mr-2" />
//                 <span className="font-semibold text-white">2,500</span>
//               </div>
//             </div>
//           </nav>
//         </header>

//         <div className="flex h-[calc(100vh-4rem)] relative z-20">
//           <div className="w-56 bg-gray-900/50 backdrop-blur-lg border-r border-gray-800">
//             <div className="p-4">
//               <h2 className="text-xl font-bold text-white mb-6">Features</h2>
//               <div className="space-y-2">
//                 {features.map((feature) => (
//                   <button
//                     key={feature.id}
//                     onClick={() => setActiveFeature(feature.id)}
//                     className={`w-full px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
//                       activeFeature === feature.id
//                         ? 'bg-purple-500/20 text-white border border-purple-500/50 shadow-lg shadow-purple-500/20'
//                         : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'
//                     }`}
//                   >
//                     <span className="text-xl">{feature.icon}</span>
//                     <span>{feature.name}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="flex-1 p-6 overflow-auto">
//             <div className="max-w-6xl mx-auto space-y-6">
//               <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-3">
//                     <TableIcon className="w-5 h-5 text-purple-400" />
//                     <h2 className="text-xl font-bold text-white">Learning Progress</h2>
//                   </div>
//                 </div>
                
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="border-gray-800">
//                       <TableHead className="text-purple-400">Subject</TableHead>
//                       <TableHead className="text-purple-400">Progress</TableHead>
//                       <TableHead className="text-purple-400">Status</TableHead>
//                       <TableHead className="text-purple-400">Last Activity</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {tableData.map((row) => (
//                       <TableRow key={row.id} className="border-gray-800">
//                         <TableCell className="font-medium text-gray-300">{row.subject}</TableCell>
//                         <TableCell className="text-gray-400">{row.progress}</TableCell>
//                         <TableCell className="text-gray-400">{row.status}</TableCell>
//                         <TableCell className="text-gray-400">{row.lastActivity}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </div>

//           </div>

//           <div className="w-80 bg-gray-900/50 backdrop-blur-lg border-l border-gray-800 p-4">
//             <ActivityCard
//               metrics={metrics}
//               dailyGoals={goals}
//               onAddGoal={handleAddGoal}
//               onToggleGoal={handleToggleGoal}
//               onViewDetails={handleViewDetails}
//             />

//             <div className="space-y-3">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-sm font-semibold text-white flex items-center gap-2">
//                   <MessageSquare className="w-4 h-4 text-purple-400" />
//                   Chat History
//                 </h3>
//                 <button 
//                   onClick={() => setIsChatOpen(!isChatOpen)}
//                   className="text-gray-400 hover:text-white transition-colors duration-300"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
              
//               {isChatOpen && (
//                 <div className="space-y-2">
//                   {[
//                     {
//                       id: 1,
//                       question: "How do I solve quadratic equations?",
//                       timestamp: "2 hours ago",
//                       feature: "tutor"
//                     },
//                     {
//                       id: 2,
//                       question: "Generate notes for World War II",
//                       timestamp: "3 hours ago",
//                       feature: "notebook"
//                     },
//                     {
//                       id: 3,
//                       question: "Convert my biology notes to PDF",
//                       timestamp: "1 day ago",
//                       feature: "pdf"
//                     }
//                   ].map((chat) => (
//                     <div
//                       key={chat.id}
//                       className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer group"
//                     >
//                       <p className="font-medium text-sm text-gray-300 group-hover:text-white mb-1">{chat.question}</p>
//                       <div className="flex justify-between text-xs">
//                         <span className="text-purple-400 group-hover:text-purple-300">{chat.feature}</span>
//                         <span className="text-gray-500 group-hover:text-gray-400">{chat.timestamp}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );


const { io } = require("socket.io-client");
const socket = io('http://localhost:5000', {
  path: '/api',
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true,
  withCredentials: true
});



const METRIC_COLORS = {
  Move: "#FF2D55",
  Exercise: "#2CD758",
  Stand: "#007AFF",
};


const Dashboard = () => {
// I want to run this js when this comp mounts

const [tableData, setTableData] = useState([]);
let [mainContent, setMainContent] = useState();


useEffect(() => {

  setTimeout(()=>{
    socket.emit('message', 'tableData');
  },1000);
  socket.on("connect", () => {
    console.log("Connected to server with ID:", socket.id)
  });

  socket.on("message", (message) => {
    try {
      const parsedData = JSON.parse(message);
      setTableData(parsedData.data);
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  });

  return () => {
    socket.off("connect");
    socket.off("message");
  };
}, []);

useRouteTo('table', setMainContent, tableData);

///////////////

  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState('tutor');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [goals, setGoals] = useState([
    { id: "1", title: "30min Morning Yoga", isCompleted: true },
    { id: "2", title: "10k Steps", isCompleted: false },
    { id: "3", title: "Drink 2L Water", isCompleted: true },
  ]);

  const [metrics] = useState([
    { label: "Move", value: "420", trend: 85, unit: "cal" },
    { label: "Exercise", value: "35", trend: 70, unit: "min" },
    { label: "Stand", value: "10", trend: 83, unit: "hrs" },
  ]);

  console.log('table:', tableData);

  // Sample table data
  // const tableData = [
  //   { id: 1, subject: "Mathematics", progress: "85%", status: "On Track", lastActivity: "2h ago" },
  //   { id: 2, subject: "Physics", progress: "72%", status: "Need Focus", lastActivity: "1d ago" },
  //   { id: 3, subject: "Chemistry", progress: "93%", status: "Excellent", lastActivity: "5h ago" },
  // ];

  const features = [
    { id: 'tutor', name: 'AI Tutor', icon: '🎓' },
    { id: 'notebook', name: 'Notebook Generation', icon: '📓' },
    { id: 'pdf', name: 'Content PDF', icon: '📄' }
  ];

  const handleToggleGoal = (goalId) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, isCompleted: !goal.isCompleted } : goal
    ));
  };

  const handleAddGoal = () => {
    setGoals(prev => [...prev, {
      id: `${prev.length + 1}`,
      title: `New Goal ${prev.length + 1}`,
      isCompleted: false
    }]);
  };

  const handleViewDetails = () => {
    console.log("Viewing details");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse -top-48 -left-48" />
        <div className="absolute w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse -bottom-48 -right-48" />
        <div className="absolute w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-800 p-4 relative z-10">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="text-xl font-bold text-white hover:text-purple-400 transition-colors duration-300">
            OffNet
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-800/80 px-4 py-2 rounded-full border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
              <Coins className="text-purple-400 w-5 h-5 mr-2" />
              <span className="font-semibold text-white">2,500</span>
            </div>
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
        {mainContent}
        {/* Right Sidebar */}
        <div className="w-80 bg-gray-900/50 backdrop-blur-lg border-l border-gray-800 p-4">
          {/* Activity Card */}
          <ActivityCard
            metrics={metrics}
            dailyGoals={goals}
            onAddGoal={handleAddGoal}
            onToggleGoal={handleToggleGoal}
            onViewDetails={handleViewDetails}
          />

          {/* Chat History */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                Chat History
              </h3>
              <button 
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            {/* Chat Items */}
            <div className="space-y-2">
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
                  <p className="font-medium text-sm text-gray-300 group-hover:text-white mb-1">{chat.question}</p>
                  <div className="flex justify-between text-xs">
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


function ActivityCard({ metrics, dailyGoals, onAddGoal, onToggleGoal, onViewDetails }) {
  const [isHovering, setIsHovering] = useState(null);

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 rounded-xl p-4 mb-4 hover:border-purple-500/50 transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-full bg-gray-800/50">
          <Activity className="w-4 h-4 text-[#FF2D55]" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Activity</h3>
          <p className="text-xs text-gray-400">Today's Progress</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setIsHovering(metric.label)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-gray-800/50" />
              <div
                className={cn(
                  "absolute inset-0 rounded-full border-2 transition-all duration-500",
                  isHovering === metric.label && "scale-105",
                )}
                style={{
                  borderColor: METRIC_COLORS[metric.label],
                  clipPath: `polygon(0 0, 100% 0, 100% ${metric.trend}%, 0 ${metric.trend}%)`,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-bold text-white">{metric.value}</span>
                <span className="text-xs text-gray-400">{metric.unit}</span>
              </div>
            </div>
            <span className="mt-2 text-xs font-medium text-gray-300">{metric.label}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Target className="w-4 h-4" />
            Today's Goals
          </h4>
          <button
            onClick={onAddGoal}
            className="p-1 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="space-y-2">
          {dailyGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => onToggleGoal(goal.id)}
              className="w-full flex items-center gap-2 p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-all"
            >
              <CheckCircle2
                className={cn("w-4 h-4", goal.isCompleted ? "text-emerald-500" : "text-gray-600")}
              />
              <span className={cn(
                "text-xs",
                goal.isCompleted ? "text-gray-400 line-through" : "text-gray-300"
              )}>
                {goal.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onViewDetails}
        className="mt-4 w-full flex items-center justify-center gap-2 p-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all"
      >
        View Activity Details
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  );
}


export default Dashboard;

