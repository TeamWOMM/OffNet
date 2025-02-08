'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Dashboard = () => {
  const router = useRouter();
  const [activeFeature, setActiveFeature] = useState('tutor');
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState([]);

  const features = [
    { id: 'tutor', name: 'AI Tutor', icon: '🎓' },
    { id: 'notebook', name: 'Notebook Generation', icon: '📓' },
    { id: 'pdf', name: 'Content PDF', icon: '📄' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Example API call - replace with your actual API endpoint
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

  // Content to display based on active feature
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            OffNet
          </Link>
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Back to Home
          </button>
        </nav>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Features</h2>
            <div className="space-y-2">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-300 ${
                    activeFeature === feature.id
                      ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-50 text-gray-700 hover:bg-blue-100'
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
        <div className="flex-1 p-8">
          <div className="bg-white rounded-xl shadow-lg p-6 h-full">
            {/* Content Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {features.find(f => f.id === activeFeature)?.name}
              </h1>
              <p className="text-gray-600">
                {getFeatureContent()}
              </p>
            </div>

            {/* Content Display Area */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 h-[calc(100vh-24rem)] overflow-auto">
              <div className="grid grid-cols-2 gap-4">
                {content.length > 0 ? (
                  content.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md hover:transform hover:scale-105"
                    >
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  ))
                ) : (
                  [1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="bg-white p-4 rounded-lg shadow transition-all duration-300 hover:shadow-md hover:transform hover:scale-105"
                    >
                      <h3 className="font-semibold mb-2">Content Block {item}</h3>
                      <p className="text-gray-600">
                        Click generate to create personalized content.
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-300
                ${isGenerating
                  ? 'bg-blue-300 cursor-wait'
                  : 'bg-blue-500 hover:bg-blue-600 transform hover:scale-105'
                } text-white shadow-lg`}
            >
              {isGenerating ? 'Generating...' : 'Generate Content'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;