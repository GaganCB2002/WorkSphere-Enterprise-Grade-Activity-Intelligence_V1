// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Phone, PhoneOff, Users, Volume2, VolumeX, Clock } from 'lucide-react';

export const ChatVoice = () => {
  const [muted, setMuted] = useState(false);
  const [participants] = useState([{ name: 'Sarah J.', speaking: true }, { name: 'Alex D.', speaking: false }, { name: 'Emma W.', speaking: false }, { name: 'You', speaking: false }]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 flex items-center justify-center">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-md w-full max-w-lg text-center space-y-8">
        <div><h1 className="text-2xl font-bold text-white">Voice Channel</h1><p className="text-xs text-slate-400 mt-1">Engineering Standup</p></div>
        <div className="flex justify-center gap-3">{participants.map((p, i) => (
          <div key={i} className="text-center">
            <div className={"w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-2 border-2 " + (p.speaking ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 bg-[#1E293B]/50')}>
              <span className="text-lg font-bold text-slate-200">{p.name.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <p className="text-[10px] text-slate-400">{p.name}</p>
            {p.speaking && <div className="flex justify-center gap-0.5 mt-1"><span className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse"></span><span className="w-1 h-4 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span><span className="w-1 h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span></div>}
          </div>
        ))}</div>
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => setMuted(!muted)} className={"w-14 h-14 rounded-full flex items-center justify-center transition-all " + (muted ? 'bg-rose-600 hover:bg-rose-500' : 'bg-[#1E293B] hover:bg-slate-700 border border-slate-700/60')}>
            {muted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-slate-300" />}
          </button>
          <button className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-500 flex items-center justify-center transition-all"><PhoneOff className="w-7 h-7 text-white" /></button>
          <button className="w-14 h-14 rounded-full bg-[#1E293B] hover:bg-slate-700 border border-slate-700/60 flex items-center justify-center"><Volume2 className="w-6 h-6 text-slate-300" /></button>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400"><Clock className="w-3.5 h-3.5" />00:12:34</div>
      </div>
    </motion.div>
  );
};

