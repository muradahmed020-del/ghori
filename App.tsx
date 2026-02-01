
import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Timer as TimerIcon, 
  TimerReset, 
  Globe, 
  BrainCircuit, 
  Settings, 
  Calendar,
  Zap
} from 'lucide-react';
import DigitalClock from './components/DigitalClock';
import AnalogClock from './components/AnalogClock';
import Stopwatch from './components/Stopwatch';
import Timer from './components/Timer';
import SmartTips from './components/SmartTips';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clock' | 'stopwatch' | 'timer'>('clock');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const bnDate = currentTime.toLocaleDateString('bn-BD', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-12 z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/20">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">সময় প্রবাহ</h1>
            <p className="text-sm text-slate-400">আপনার সময়, আপনার ছন্দে</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
           <Calendar className="w-4 h-4 text-indigo-400" />
           <span className="text-sm font-medium">{bnDate}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 z-10">
        {/* Left Side - Navigation & AI Integration */}
        <aside className="lg:w-1/3 flex flex-col gap-6">
          <nav className="glass p-2 rounded-3xl flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('clock')}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'clock' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40' : 'hover:bg-slate-800/50 text-slate-400'}`}
            >
              <Clock className="w-5 h-5" />
              <span className="font-semibold">ডিজিটাল ও এনালগ ঘড়ি</span>
            </button>
            <button 
              onClick={() => setActiveTab('stopwatch')}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'stopwatch' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40' : 'hover:bg-slate-800/50 text-slate-400'}`}
            >
              <TimerReset className="w-5 h-5" />
              <span className="font-semibold">স্টপওয়াচ</span>
            </button>
            <button 
              onClick={() => setActiveTab('timer')}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === 'timer' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40' : 'hover:bg-slate-800/50 text-slate-400'}`}
            >
              <TimerIcon className="w-5 h-5" />
              <span className="font-semibold">টাইমার</span>
            </button>
          </nav>

          <SmartTips time={currentTime} />
          
          <div className="glass p-6 rounded-3xl mt-auto">
             <div className="flex items-center gap-3 mb-2">
               <Globe className="w-5 h-5 text-indigo-400" />
               <h3 className="font-semibold">টাইম জোন</h3>
             </div>
             <p className="text-sm text-slate-400">এশিয়া/ঢাকা (বাংলাদেশ মান সময়)</p>
          </div>
        </aside>

        {/* Right Side - Interactive View */}
        <section className="flex-1 flex flex-col gap-6">
          <div className="glass p-8 md:p-12 rounded-[40px] flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden group">
            {activeTab === 'clock' && (
              <div className="w-full flex flex-col items-center gap-12">
                <div className="animate-in fade-in zoom-in duration-500">
                  <AnalogClock time={currentTime} />
                </div>
                <div className="animate-in slide-in-from-bottom duration-700">
                  <DigitalClock time={currentTime} />
                </div>
              </div>
            )}
            
            {activeTab === 'stopwatch' && (
              <div className="w-full animate-in zoom-in duration-300">
                <Stopwatch />
              </div>
            )}

            {activeTab === 'timer' && (
              <div className="w-full animate-in zoom-in duration-300">
                <Timer />
              </div>
            )}
          </div>

          {/* Quick Stats/Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass p-6 rounded-3xl flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">একুরেসি</div>
                <div className="text-lg font-semibold">১০০% সঠিক</div>
              </div>
            </div>
            <div className="glass p-6 rounded-3xl flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">এআই টিপস</div>
                <div className="text-lg font-semibold">সক্রিয়</div>
              </div>
            </div>
            <div className="glass p-6 rounded-3xl flex items-center gap-4">
              <div className="p-3 bg-pink-500/10 rounded-2xl text-pink-400">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">মোড</div>
                <div className="text-lg font-semibold">ডার্ক থিম</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-slate-500 text-sm pb-8 z-10">
        &copy; ২০২৪ সময় প্রবাহ অ্যাপ | বাংলা ভাষায় আধুনিক সময় সেবা
      </footer>
    </div>
  );
};

export default App;
