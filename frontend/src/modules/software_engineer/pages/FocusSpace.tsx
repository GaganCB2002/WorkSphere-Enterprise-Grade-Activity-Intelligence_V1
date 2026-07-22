import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Target, Calendar, CheckSquare, Clock } from 'lucide-react';

export const FocusSpace: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'FOCUS' | 'BREAK'>('FOCUS');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsActive(false);
      // Auto-switch mode
      if (mode === 'FOCUS') {
        setMode('BREAK');
        setTimeLeft(5 * 60);
      } else {
        setMode('FOCUS');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'FOCUS' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#e6edf3]">Focus Workspace</h1>
        <p className="text-sm text-[#8b949e] mt-1">Manage your deep work sessions and daily coding planner.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pomodoro Timer */}
        <div className="lg:col-span-1 bg-[#161b22] border border-[#30363d] rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
          {/* Subtle gradient background based on mode */}
          <div className={`absolute inset-0 opacity-5 ${mode === 'FOCUS' ? 'bg-blue-500' : 'bg-emerald-500'} blur-3xl rounded-full`} />
          
          <div className="relative z-10 w-full">
            <div className="flex items-center justify-center gap-4 mb-8 text-sm font-medium">
              <button 
                onClick={() => { setMode('FOCUS'); setTimeLeft(25*60); setIsActive(false); }}
                className={`px-4 py-1.5 rounded-full transition-colors ${mode === 'FOCUS' ? 'bg-blue-600 text-white' : 'text-[#8b949e] hover:text-[#e6edf3]'}`}
              >
                Deep Work
              </button>
              <button 
                onClick={() => { setMode('BREAK'); setTimeLeft(5*60); setIsActive(false); }}
                className={`px-4 py-1.5 rounded-full transition-colors ${mode === 'BREAK' ? 'bg-emerald-600 text-white' : 'text-[#8b949e] hover:text-[#e6edf3]'}`}
              >
                Short Break
              </button>
            </div>

            <div className="text-[5rem] font-black font-mono text-center text-[#e6edf3] tracking-tighter tabular-nums leading-none mb-10">
              {formatTime(timeLeft)}
            </div>

            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={resetTimer}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#21262d] text-[#8b949e] hover:bg-[#30363d] hover:text-white transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button 
                onClick={toggleTimer}
                className={`w-16 h-16 flex items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                  isActive ? 'bg-[#f85149] hover:bg-[#ff6a63]' : mode === 'FOCUS' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
              >
                {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#30363d] w-full text-center">
              <p className="text-xs text-[#8b949e] font-medium uppercase tracking-wider">Today's Focus Time</p>
              <p className="text-xl font-bold text-[#e6edf3] mt-1">3h 45m</p>
            </div>
          </div>
        </div>

        {/* Daily Planner */}
        <div className="lg:col-span-2 bg-[#0d1117] border border-[#30363d] rounded-2xl overflow-hidden flex flex-col">
          <div className="bg-[#161b22] px-6 py-4 border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-[#e6edf3]">
              <Calendar className="w-5 h-5 text-purple-400" />
              Daily Execution Plan
            </div>
            <span className="text-sm font-medium text-[#8b949e]">May 21, 2026</span>
          </div>

          <div className="flex-1 p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-xs font-mono text-[#8b949e] pt-1">09:00</div>
              <div className="flex-1 bg-[#1f6feb]/10 border border-[#1f6feb]/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-[#58a6ff] font-semibold text-sm mb-1">
                  <Target className="w-4 h-4" /> Daily Standup
                </div>
                <p className="text-xs text-[#8b949e]">Sync with backend team regarding gRPC specs.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-xs font-mono text-[#8b949e] pt-1">10:00</div>
              <div className="flex-1 bg-[#238636]/10 border border-[#238636]/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-[#2ea043] font-semibold text-sm mb-1">
                  <CheckSquare className="w-4 h-4" /> Deep Work Block (Active)
                </div>
                <p className="text-xs text-[#8b949e]">Implementing protobuf definitions for telemetry streaming.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 opacity-50">
              <div className="text-xs font-mono text-[#8b949e] pt-1">13:30</div>
              <div className="flex-1 bg-[#21262d] border border-[#30363d] rounded-lg p-3">
                <div className="flex items-center gap-2 text-[#e6edf3] font-semibold text-sm mb-1">
                  <Clock className="w-4 h-4 text-[#8b949e]" /> Code Review
                </div>
                <p className="text-xs text-[#8b949e]">Review PR #401 (Auth service JWT race condition).</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 opacity-50">
              <div className="text-xs font-mono text-[#8b949e] pt-1">15:00</div>
              <div className="flex-1 bg-[#d29922]/10 border border-[#d29922]/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-[#d29922] font-semibold text-sm mb-1">
                  <Target className="w-4 h-4" /> Architecture Sync
                </div>
                <p className="text-xs text-[#8b949e]">Discuss Kubernetes scaling metrics with DevOps.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
