
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const toBengaliNumber = (num: number, pad: number = 2): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const formattedNum = num.toString().padStart(pad, '0');
  return formattedNum.split('').map(digit => bnDigits[parseInt(digit)] || digit).join('');
};

const Timer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [inputVal, setInputVal] = useState('');
  // Fix: Use number instead of NodeJS.Timeout for browser compatibility
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      // Use window.setInterval to ensure the return type is number
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      alert('সময় শেষ!');
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    } else if (inputVal) {
      const minutes = parseInt(inputVal);
      if (!isNaN(minutes)) {
        setTimeLeft(minutes * 60);
        setIsRunning(true);
      }
    }
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${toBengaliNumber(minutes)}:${toBengaliNumber(seconds)}`;
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-8">
      {!isRunning && timeLeft === 0 ? (
        <div className="flex flex-col items-center gap-4 w-full">
           <label className="text-slate-400 font-medium">কত মিনিটের টাইমার সেট করবেন?</label>
           <input 
            type="number" 
            placeholder="মিনিট লিখুন..." 
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-4 text-center text-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-slate-600"
           />
        </div>
      ) : (
        <div className="text-8xl font-black text-indigo-400 drop-shadow-xl tracking-tighter">
          {formatTime(timeLeft)}
        </div>
      )}

      <div className="flex gap-4">
        <button 
          onClick={isRunning ? () => setIsRunning(false) : handleStart}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white shadow-lg`}
        >
          {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
        </button>
        <button 
          onClick={() => { setTimeLeft(0); setIsRunning(false); setInputVal(''); }}
          className="w-16 h-16 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Timer;
