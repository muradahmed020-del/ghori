
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

const toBengaliNumber = (num: number, pad: number = 2): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const formattedNum = num.toString().padStart(pad, '0');
  return formattedNum.split('').map(digit => bnDigits[parseInt(digit)] || digit).join('');
};

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  // Fix: Use number instead of NodeJS.Timeout for browser compatibility
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      // Use window.setInterval to ensure the return type is number
      timerRef.current = window.setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${toBengaliNumber(minutes)}:${toBengaliNumber(seconds)}:${toBengaliNumber(milliseconds)}`;
  };

  const handleLap = () => {
    setLaps([time, ...laps]);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-8">
      <div className="text-7xl font-mono font-bold text-indigo-400 drop-shadow-xl tabular-nums">
        {formatTime(time)}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => setIsRunning(!isRunning)}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white shadow-lg`}
        >
          {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
        <button 
          onClick={handleLap}
          disabled={!isRunning}
          className="w-16 h-16 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all disabled:opacity-50"
        >
          <Flag className="w-6 h-6" />
        </button>
        <button 
          onClick={() => { setTime(0); setIsRunning(false); setLaps([]); }}
          className="w-16 h-16 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>

      {laps.length > 0 && (
        <div className="w-full bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 h-48 overflow-y-auto custom-scrollbar">
          {laps.map((lap, index) => (
            <div key={index} className="flex justify-between items-center px-6 py-3 border-b border-slate-800 last:border-none">
              <span className="text-slate-500 font-medium">ল্যাপ {toBengaliNumber(laps.length - index)}</span>
              <span className="font-mono text-indigo-300">{formatTime(lap)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
