import { useState, useEffect } from 'react';

const AnimatedCard = () => {
  const [position, setPosition] = useState(0);
  const [showGraph, setShowGraph] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Sample education data
  const educationData = [
    { year: '2018', Africa: 32, Asia: 25, SouthAmerica: 28, Europe: 12 },
    { year: '2019', Africa: 30, Asia: 23, SouthAmerica: 26, Europe: 11 },
    { year: '2020', Africa: 35, Asia: 27, SouthAmerica: 29, Europe: 13 },
    { year: '2021', Africa: 33, Asia: 24, SouthAmerica: 25, Europe: 10 },
    { year: '2022', Africa: 31, Asia: 22, SouthAmerica: 24, Europe: 9 },
  ];

  const regions = ['Africa', 'Asia', 'SouthAmerica', 'Europe'];
  const colors = {
    Africa: '#8884d8',
    Asia: '#82ca9d',
    SouthAmerica: '#ffc658',
    Europe: '#ff7300'
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => (prev + 0.5) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Convert data points to SVG coordinates
  const getPoints = (region) => {
    const maxValue = 40; // Maximum value in dataset + padding
    const width = 760; // SVG width - padding
    const height = 360; // SVG height - padding
    const points = educationData.map((d, i) => ({
      x: (i * (width / 4)) + 20,
      y: height - (d[region] / maxValue * height) + 20,
      value: d[region],
      year: d.year
    }));
    return points;
  };

  // Create SVG path from points
  const createPath = (points) => {
    return points.map((p, i) => 
      (i === 0 ? 'M' : 'L') + `${p.x},${p.y}`
    ).join(' ');
  };

  return (
    <div className="relative p-0 m-0 w-full min-h-[500px] bg-black overflow-hidden">
      {/* Animated background circles */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gray-800 opacity-20 animate-pulse"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            left: `${(i * 150 + position) % 1000}px`,
            top: `${Math.random() * 400}px`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: '3s'
          }}
        />
      ))}
      
      {/* Content container */}
      <div className="relative flex flex-col items-center p-8 h-full">
        <div className="flex w-full mb-8">
          {/* Image */}
          <div className="w-1/3 animate-fadeIn">
            <img
              src="/api/placeholder/300/300"
              alt="Education Access"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          
          {/* Text */}
          <div className="w-2/3 p-8">
            <p className="text-white text-xl font-bold animate-slideIn leading-relaxed">
              "Education inequality remains a global challenge, with millions of children lacking access to quality education. Regional disparities persist, particularly affecting developing nations. The data highlights the urgent need for systematic changes and increased investment in educational infrastructure worldwide."
            </p>
            <button 
              onClick={() => setShowGraph(!showGraph)}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              {showGraph ? 'Hide Statistics' : 'Show Statistics'}
            </button>
          </div>
        </div>
        {/* Custom Graph Section */}
        {showGraph && (
          <div className="w-full bg-white p-6 rounded-lg animate-fadeIn">
            <h2 className="text-xl font-bold mb-4 text-center">
              Percentage of Students Without Education Access by Continent
            </h2>
            <div className="relative">
              <svg width="800" height="400" className="bg-white">
                {/* Grid lines */}
                {[...Array(5)].map((_, i) => (
                  <g key={i}>
                    <line
                      x1="20"
                      y1={20 + i * 90}
                      x2="780"
                      y2={20 + i * 90}
                      stroke="#e0e0e0"
                      strokeDasharray="3,3"
                    />
                    <text x="0" y={25 + i * 90} fill="#666" fontSize="12">
                      {40 - i * 10}%
                    </text>
                  </g>
                ))}

                {/* X-axis labels */}
                {educationData.map((d, i) => (
                  <text
                    key={i}
                    x={20 + i * 190}
                    y="390"
                    fill="#666"
                    fontSize="12"
                    textAnchor="middle"
                  >
                    {d.year}
                  </text>
                ))}

                {/* Lines and points */}
                {regions.map(region => {
                  const points = getPoints(region);
                  return (
                    <g key={region}>
                      <path
                        d={createPath(points)}
                        fill="none"
                        stroke={colors[region]}
                        strokeWidth="2"
                        className="transition-all duration-500"
                      />
                      {points.map((point, i) => (
                        <g key={i}>
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            fill={colors[region]}
                            className="cursor-pointer hover:r-6 transition-all duration-300"
                            onMouseEnter={() => setHoveredPoint({ ...point, region })}
                            onMouseLeave={() => setHoveredPoint(null)}
                          />
                        </g>
                      ))}
                    </g>
                  );
                })}

                {/* Tooltip */}
                {hoveredPoint && (
                  <g>
                    <rect
                      x={hoveredPoint.x - 60}
                      y={hoveredPoint.y - 40}
                      width="120"
                      height="30"
                      fill="rgba(0,0,0,0.8)"
                      rx="4"
                    />
                    <text
                      x={hoveredPoint.x}
                      y={hoveredPoint.y - 20}
                      fill="white"
                      fontSize="12"
                      textAnchor="middle"
                    >
                      {`${hoveredPoint.region}: ${hoveredPoint.value}% (${hoveredPoint.year})`}
                    </text>
                  </g>
                )}
              </svg>

              {/* Legend */}
              <div className="flex justify-center gap-6 mt-4">
                {regions.map(region => (
                  <div key={region} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: colors[region] }}
                    />
                    <span className="text-sm">{region}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedCard;