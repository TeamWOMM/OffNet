// import React, { useState } from 'react';
// import { redirect } from 'next/navigation'


// const Dashboard = () => {

//   // Inside the component 
// const navigate = useNavigate();

// // on button click 
// const handleDashboardAccess = () => {
//     redirect('/dashboard');
// }  
//   const [activeFeature, setActiveFeature] = useState('tutor');
//   const [isGenerating, setIsGenerating] = useState(false);

//   const features = [
//     { id: 'tutor', name: 'AI Tutor', icon: '🎓' },
//     { id: 'notebook', name: 'Notebook Generation', icon: '📓' },
//     { id: 'pdf', name: 'Content PDF', icon: '📄' }
//   ];

//   const handleGenerate = () => {
//     setIsGenerating(true);
//     // Add your generation logic here
//     setTimeout(() => setIsGenerating(false), 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
//       <div className="flex h-screen">
//         {/* Sidebar */}
//         <div className="w-64 bg-white shadow-lg">
//           <div className="p-4">
//             <h2 className="text-xl font-bold text-gray-800 mb-6">Features</h2>
//             <div className="space-y-2">
//               {features.map((feature) => (
//                 <button
//                   key={feature.id}
//                   onClick={() => setActiveFeature(feature.id)}
//                   className={`w-full px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
//                     activeFeature === feature.id
//                       ? 'bg-blue-500 text-white shadow-lg transform scale-105'
//                       : 'bg-gray-50 text-gray-700 hover:bg-blue-100'
//                   }`}
//                 >
//                   <span className="text-xl">{feature.icon}</span>
//                   <span>{feature.name}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 p-8">
//           <div className="bg-white rounded-xl shadow-lg p-6 h-[calc(100vh-4rem)]">
//             {/* Content Header */}
//             <div className="mb-6">
//               <h1 className="text-2xl font-bold text-gray-800">
//                 {features.find(f => f.id === activeFeature)?.name}
//               </h1>
//               <p className="text-gray-600">
//                 Generate personalized content based on your needs
//               </p>
//             </div>

//             {/* Content Display Area */}
//             <div className="bg-gray-50 rounded-lg p-6 mb-6 h-[calc(100vh-16rem)] overflow-auto">
//               <div className="grid grid-cols-2 gap-4">
//                 {[1, 2, 3, 4].map((item) => (
//                   <div
//                     key={item}
//                     className="bg-white p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md hover:transform hover:scale-105"
//                   >
//                     <h3 className="font-semibold mb-2">Content Block {item}</h3>
//                     <p className="text-gray-600">
//                       Sample content for demonstration. This will be replaced with actual generated content.
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Generate Button */}
//             <button
//               onClick={handleGenerate}
//               className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 
//                 ${isGenerating 
//                   ? 'bg-blue-300 cursor-wait'
//                   : 'bg-blue-500 hover:bg-blue-600 transform hover:scale-105'
//                 } text-white shadow-lg`}
//             >
//               {isGenerating ? 'Generating...' : 'Generate Content'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;