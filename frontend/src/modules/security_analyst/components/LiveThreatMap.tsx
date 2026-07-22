import React, { useEffect, useState } from 'react';

export const LiveThreatMap: React.FC = () => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full bg-slate-900/50 border border-slate-800 rounded-2xl relative overflow-hidden flex items-center justify-center">
      {/* Aesthetic Mock Map */}
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-center bg-no-repeat bg-contain opacity-10 filter invert sepia hue-rotate-[200deg] saturate-200"></div>
      
      <div className={`absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-red-500 shadow-[0_0_20px_#ef4444] transition-all duration-1000 ${pulse ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`} />
      <div className={`absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_20px_#f59e0b] transition-all duration-1000 delay-500 ${pulse ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`} />
      <div className={`absolute bottom-1/3 left-1/2 w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_20px_#06b6d4] transition-all duration-1000 delay-300 ${!pulse ? 'scale-150 opacity-100' : 'scale-100 opacity-50'}`} />
      
      {/* Simulated attack lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <path d="M 25% 25% Q 30% 10% 66% 50%" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse" />
        <path d="M 66% 50% Q 50% 80% 50% 66%" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="5,5" className="animate-pulse delay-75" />
      </svg>

      <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-slate-950/80 backdrop-blur border border-slate-800 text-xs font-mono shadow-2xl">
        <div className="text-red-400 font-bold mb-2 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
          Incoming DDoS Detected
        </div>
        <div className="text-slate-400 mb-1"><span className="text-slate-500">Source:</span> Multiple Regions (Botnet)</div>
        <div className="text-slate-400 mb-1"><span className="text-slate-500">Target:</span> API Gateway EU-Central</div>
        <div className="text-slate-400"><span className="text-slate-500">Volume:</span> 450 Gbps (Mitigating)</div>
      </div>
      
      <div className="absolute top-6 right-6 p-4 rounded-xl bg-slate-950/80 backdrop-blur border border-slate-800 text-xs font-mono shadow-2xl text-right">
        <div className="text-cyan-400 font-bold mb-2">Global Defense Grid</div>
        <div className="text-slate-400 mb-1">Status: <span className="text-emerald-400">ACTIVE</span></div>
        <div className="text-slate-400">Nodes Online: 1,402</div>
      </div>
    </div>
  );
};
