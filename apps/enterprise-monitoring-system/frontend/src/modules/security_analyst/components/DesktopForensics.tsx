import React from 'react';
import { Camera, Search, Download } from 'lucide-react';

export const DesktopForensics: React.FC = () => {
  return (
    <div className="h-full flex gap-6">
      <div className="w-1/3 bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex flex-col relative overflow-hidden">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Search className="w-4 h-4 text-slate-400" /> Flagged Endpoints</h3>
        <div className="space-y-2 overflow-y-auto custom-scrollbar relative z-10">
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 cursor-pointer shadow-lg shadow-red-500/5 transform transition-transform hover:-translate-y-1">
            <div className="flex justify-between items-start mb-2">
              <div className="font-bold text-sm text-white">DESKTOP-X94J</div>
              <div className="px-2 py-0.5 bg-red-500/20 text-red-500 text-[10px] font-bold rounded">CRITICAL</div>
            </div>
            <div className="text-xs text-red-400">Flag: Unauthorized DB Export</div>
            <div className="text-[10px] text-slate-500 mt-2 font-mono">User: root_admin • 14:32:01 UTC</div>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:bg-slate-800/80 transition-all hover:-translate-y-1">
            <div className="flex justify-between items-start mb-2">
              <div className="font-bold text-sm text-white">MAC-FINANCE-02</div>
              <div className="px-2 py-0.5 bg-amber-500/20 text-amber-500 text-[10px] font-bold rounded">WARNING</div>
            </div>
            <div className="text-xs text-amber-400">Flag: Encrypted USB Mount</div>
            <div className="text-[10px] text-slate-500 mt-2 font-mono">User: fin_exec • 12:15:44 UTC</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:bg-slate-800/80 transition-all hover:-translate-y-1">
            <div className="flex justify-between items-start mb-2">
              <div className="font-bold text-sm text-white">LINUX-DEV-88</div>
              <div className="px-2 py-0.5 bg-blue-500/20 text-blue-500 text-[10px] font-bold rounded">NOTICE</div>
            </div>
            <div className="text-xs text-blue-400">Flag: Unusual SSH Connection</div>
            <div className="text-[10px] text-slate-500 mt-2 font-mono">User: dev_04 • 09:00:12 UTC</div>
          </div>
        </div>
        
        {/* Aesthetic background glow */}
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white flex items-center gap-2"><Camera className="w-5 h-5 text-slate-400" /> Desktop Snapshot: DESKTOP-X94J</h3>
          <div className="flex items-center gap-3">
             <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded flex items-center gap-2 transition-colors">
               <Download className="w-3 h-3" /> Export Evidence
             </button>
             <div className="px-3 py-1.5 bg-red-500/20 text-red-400 text-xs font-bold rounded border border-red-500/30 flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div> LIVE FEED
             </div>
          </div>
        </div>
        
        <div className="flex-1 bg-black rounded-xl border border-slate-800 flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
          
          {/* Fake UI Overlay simulating a captured terminal */}
          <div className="absolute top-10 left-10 w-96 h-64 bg-slate-900 border border-slate-700 rounded shadow-2xl p-4 opacity-90 font-mono text-[10px] sm:text-xs">
             <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
               <div className="text-slate-400">root@production-db:~</div>
               <div className="flex gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
               </div>
             </div>
             <div className="text-green-400 mb-1">$ pg_dump -U root production_db &gt; /tmp/dump.sql</div>
             <div className="text-slate-300 mb-1">Password:</div>
             <div className="text-slate-400 mb-1">pg_dump: reading schemas</div>
             <div className="text-slate-400 mb-1">pg_dump: reading user-defined tables</div>
             <div className="text-slate-400 mb-1">pg_dump: dumping contents of table "users"</div>
             <div className="text-red-400 font-bold mt-4 animate-pulse"># SECURITY INTERVENTION ACTIVATED</div>
             <div className="text-red-400">Connection terminated by SIEM Policy #402</div>
          </div>

          {/* Glitch effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent pointer-events-none opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};
