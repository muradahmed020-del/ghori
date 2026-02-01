
import React from 'react';

interface AnalogClockProps {
  time: Date;
}

const AnalogClock: React.FC<AnalogClockProps> = ({ time }) => {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secDeg = (seconds / 60) * 360;
  const minDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30;

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      {/* Clock Face */}
      <div className="absolute inset-0 rounded-full border-4 border-slate-800 bg-slate-900/40 shadow-inner" />
      
      {/* Markers */}
      {[...Array(12)].map((_, i) => (
        <div 
          key={i} 
          className="absolute w-1 h-4 bg-slate-700 rounded-full origin-bottom"
          style={{ 
            transform: `rotate(${i * 30}deg) translateY(-140px)`,
            height: i % 3 === 0 ? '12px' : '6px',
            backgroundColor: i % 3 === 0 ? '#6366f1' : '#334155'
          }}
        />
      ))}

      {/* Hour Hand */}
      <div 
        className="absolute w-1.5 h-20 bg-white rounded-full origin-bottom shadow-lg"
        style={{ 
          transform: `rotate(${hourDeg}deg) translateY(-40px)`,
          transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      />

      {/* Minute Hand */}
      <div 
        className="absolute w-1 h-28 bg-indigo-400 rounded-full origin-bottom shadow-lg"
        style={{ 
          transform: `rotate(${minDeg}deg) translateY(-56px)`,
          transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      />

      {/* Second Hand */}
      <div 
        className="absolute w-0.5 h-32 bg-pink-500 rounded-full origin-bottom"
        style={{ 
          transform: `rotate(${secDeg}deg) translateY(-64px)`,
          transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />

      {/* Center Pin */}
      <div className="absolute w-4 h-4 bg-indigo-500 rounded-full border-2 border-white z-10 shadow-lg" />
    </div>
  );
};

export default AnalogClock;
