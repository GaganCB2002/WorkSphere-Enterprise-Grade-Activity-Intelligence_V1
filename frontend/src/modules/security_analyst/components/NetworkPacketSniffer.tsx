import React, { useState, useEffect } from 'react';
import { Activity, Terminal, Filter, DownloadCloud, Pause, Play } from 'lucide-react';

export const NetworkPacketSniffer: React.FC = () => {
  const [packets, setPackets] = useState<any[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const generatePacket = () => {
      const protocols = ['TCP', 'UDP', 'ICMP', 'HTTP', 'TLSv1.3'];
      const sources = ['192.168.1.45', '10.0.0.12', '172.16.254.1', '192.168.1.100', '10.0.0.99'];
      const dests = ['104.18.2.161', '142.250.190.46', '13.107.4.52', '192.168.1.1', '8.8.8.8'];
      
      const protocol = protocols[Math.floor(Math.random() * protocols.length)];
      const isMalicious = Math.random() > 0.95; // 5% chance of malicious packet

      return {
        id: Math.random().toString(36).substr(2, 9),
        time: new Date().toISOString().split('T')[1].slice(0, -1),
        source: sources[Math.floor(Math.random() * sources.length)],
        dest: dests[Math.floor(Math.random() * dests.length)],
        protocol,
        length: Math.floor(Math.random() * 1500) + 64,
        info: isMalicious 
          ? `[SUSPICIOUS] Malformed ${protocol} payload detected` 
          : `${protocol} segment, Seq=${Math.floor(Math.random()*1000)} Len=${Math.floor(Math.random()*100)}`,
        isMalicious
      };
    };

    const interval = setInterval(() => {
      setPackets(prev => {
        const newPackets = [generatePacket(), ...prev];
        return newPackets.slice(0, 50); // Keep last 50
      });
    }, 800); // New packet every 800ms

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Top Controls */}
      <div className="flex items-center justify-between bg-slate-900/50 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold tracking-tight">Live Network Sniffer (eth0)</h3>
            <p className="text-xs text-slate-500">Promiscuous mode enabled. Monitoring traffic.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 border transition-all ${
              isPaused 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            {isPaused ? <><Play className="w-4 h-4" /> Resume Feed</> : <><Pause className="w-4 h-4" /> Pause Feed</>}
          </button>
          <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors">
            <DownloadCloud className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Packet Stream */}
      <div className="flex-1 bg-black border border-slate-800 rounded-xl overflow-hidden flex flex-col">
        <div className="grid grid-cols-6 gap-4 p-3 bg-slate-900 border-b border-slate-800 text-xs font-bold text-slate-400 tracking-wider">
          <div>Time</div>
          <div>Source</div>
          <div>Destination</div>
          <div>Protocol</div>
          <div>Length</div>
          <div>Info</div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar font-mono text-[11px]">
          {packets.map((pkt, idx) => (
            <div 
              key={pkt.id} 
              className={`grid grid-cols-6 gap-4 p-2.5 border-b border-slate-800/50 hover:bg-slate-900/50 cursor-pointer transition-colors ${
                pkt.isMalicious ? 'bg-red-500/10 text-red-400' : 'text-slate-300'
              }`}
            >
              <div className="text-slate-500">{pkt.time}</div>
              <div>{pkt.source}</div>
              <div>{pkt.dest}</div>
              <div className={
                pkt.protocol === 'TCP' ? 'text-blue-400' : 
                pkt.protocol === 'UDP' ? 'text-purple-400' : 
                pkt.protocol === 'HTTP' ? 'text-emerald-400' : 'text-slate-300'
              }>{pkt.protocol}</div>
              <div className="text-slate-500">{pkt.length}</div>
              <div className="truncate pr-4">{pkt.info}</div>
            </div>
          ))}
          {packets.length === 0 && (
            <div className="flex items-center justify-center h-full text-slate-600 flex-col gap-4">
               <Terminal className="w-8 h-8 animate-pulse" />
               <p>Initializing capture interface...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
