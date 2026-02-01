
import React from 'react';

interface DigitalClockProps {
  time: Date;
}

const toBengaliNumber = (num: number, pad: number = 2): string => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const formattedNum = num.toString().padStart(pad, '0');
  return formattedNum.split('').map(digit => bnDigits[parseInt(digit)] || digit).join('');
};

const DigitalClock: React.FC<DigitalClockProps> = ({ time }) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? 'অপরাহ্ন' : 'পূর্বাহ্ণ';
  const displayHours = hours % 12 || 12;

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-3 text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 drop-shadow-2xl">
        <span>{toBengaliNumber(displayHours)}</span>
        <span className="animate-pulse opacity-50 text-indigo-400">:</span>
        <span>{toBengaliNumber(minutes)}</span>
        <span className="animate-pulse opacity-50 text-indigo-400">:</span>
        <span>{toBengaliNumber(seconds)}</span>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <span className="px-4 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-lg font-bold">
          {ampm}
        </span>
      </div>
    </div>
  );
};

export default DigitalClock;
