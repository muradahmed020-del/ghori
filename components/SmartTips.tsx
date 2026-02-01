
import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface SmartTipsProps {
  time: Date;
}

const LOCAL_TIPS = [
  "সময়ের সঠিক ব্যবহারই সফলতার মূল চাবিকাঠি।",
  "আজকের কাজ কালকের জন্য ফেলে রাখবেন না।",
  "ছোট ছোট লক্ষ্য স্থির করুন এবং সেগুলো পূরণ করুন।",
  "প্রতিদিন অন্তত ১০ মিনিট বই পড়ার অভ্যাস করুন।",
  "সকালবেলা পরিকল্পনা করলে সারা দিন ভালো কাটে।",
  "পরিশ্রম ও ধৈর্য সাফল্যের দুই মূল মন্ত্র।",
  "বিরতি নিন, এতে কাজের গতি বাড়ে।"
];

const SmartTips: React.FC<SmartTipsProps> = ({ time }) => {
  const [tip, setTip] = useState<string>('লোড হচ্ছে...');
  const [loading, setLoading] = useState(true);

  const fetchTip = async () => {
    const randomLocalTip = LOCAL_TIPS[Math.floor(Math.random() * LOCAL_TIPS.length)];
    
    // Check if API key exists
    if (!process.env.API_KEY || process.env.API_KEY === 'undefined') {
      setTip(randomLocalTip);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const hours = time.getHours();
      let context = '';

      if (hours >= 5 && hours < 10) context = 'সকালবেলা (ভোর/সকাল)';
      else if (hours >= 10 && hours < 13) context = 'সকাল থেকে দুপুর (কাজের সময়)';
      else if (hours >= 13 && hours < 16) context = 'দুপুর (লাঞ্চের পর)';
      else if (hours >= 16 && hours < 19) context = 'বিকাল (বিশ্রাম/ব্যায়াম)';
      else if (hours >= 19 && hours < 22) context = 'সন্ধ্যা/রাত (পড়া বা স্কিল ডেভেলপমেন্ট)';
      else context = 'গভীর রাত (ঘুম/রিলাক্সেশন)';

      const prompt = `এখন সময় ${context}। এই সময়ের জন্য একটি অনুপ্রেরণামূলক বাংলা প্রোডাক্টিভিটি টিপ বা উক্তি দাও যা ১-২ লাইনের মধ্যে। সরাসরি উত্তর দাও, কোনো ভনিতা ছাড়া।`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setTip(response.text || randomLocalTip);
    } catch (error) {
      console.error('Error fetching tip:', error);
      setTip(randomLocalTip);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTip();
    // Refresh every hour
    const interval = setInterval(fetchTip, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass p-6 rounded-[32px] border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-transparent">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-yellow-400" />
        <h3 className="font-bold text-indigo-400">স্মার্ট টিপস</h3>
        {loading && <Loader2 className="w-3 h-3 animate-spin text-slate-500" />}
      </div>
      <p className="text-slate-300 leading-relaxed text-sm italic">
        "{tip}"
      </p>
    </div>
  );
};

export default SmartTips;
