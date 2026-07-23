// @ts-nocheck
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Users, Monitor, MessageSquare } from 'lucide-react';

export const ChatVideo = () => {
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [muted, setMuted] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-3xl overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-2 gap-3 p-4 bg-[#090b10]">
          <div className="aspect-video bg-[#1E293B] rounded-2xl flex items-center justify-center relative border border-slate-700/60">
            <div className="w-20 h-20 rounded-full bg-indigo-900/50 border-2 border-indigo-500/30 flex items-center justify-center"><span className="text-2xl font-bold text-indigo-400">AD</span></div>
            <span className="absolute bottom-3 left-3 text-xs text-slate-400 font-bold">Alex D.</span>
          </div>
          <div className="aspect-video bg-[#1E293B] rounded-2xl flex items-center justify-center relative border border-indigo-500/40">
            <div className="w-20 h-20 rounded-full bg-emerald-900/50 border-2 border-emerald-500/30 flex items-center justify-center"><span className="text-2xl font-bold text-emerald-400">YOU</span></div>
            <span className="absolute bottom-3 left-3 text-xs text-emerald-400 font-bold">You</span>
          </div>
        </div>
        <div className="p-6 text-center">
          <h1 className="text-xl font-bold text-white mb-1">Video Meeting</h1>
          <p className="text-xs text-slate-400">Sprint Planning &bull; 5 participants</p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => setVideoEnabled(!videoEnabled)} className={"w-12 h-12 rounded-full flex items-center justify-center " + (!videoEnabled ? 'bg-rose-600' : 'bg-[#1E293B] border border-slate-700/60')}>
              {videoEnabled ? <Video className="w-5 h-5 text-slate-300" /> : <VideoOff className="w-5 h-5 text-white" />}
            </button>
            <button onClick={() => setMuted(!muted)} className={"w-12 h-12 rounded-full flex items-center justify-center " + (muted ? 'bg-rose-600' : 'bg-[#1E293B] border border-slate-700/60')}>
              {muted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-slate-300" />}
            </button>
            <button className="w-12 h-12 rounded-full bg-[#1E293B] border border-slate-700/60 flex items-center justify-center"><Monitor className="w-5 h-5 text-slate-300" /></button>
            <button className="w-12 h-12 rounded-full bg-[#1E293B] border border-slate-700/60 flex items-center justify-center"><MessageSquare className="w-5 h-5 text-slate-300" /></button>
            <button className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-500 flex items-center justify-center"><PhoneOff className="w-6 h-6 text-white" /></button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

