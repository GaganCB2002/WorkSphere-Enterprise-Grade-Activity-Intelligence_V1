import React, { useState } from 'react';
import { Clock, CheckCircle, X, Users, Coffee, Timer } from 'lucide-react';
import { useTeam } from '../data/hooks';

export const Attendance: React.FC = () => {
  const { allTeam } = useTeam();
  const [date] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

  const online = allTeam.filter(m => m.status === 'Online').length;
  const inMeeting = allTeam.filter(m => m.status === 'In Meeting').length;
  const offline = allTeam.filter(m => m.status === 'Offline').length;
  const coverage = Math.round(((online + inMeeting) / allTeam.length) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Attendance</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{date}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-[6px] border-emerald-500 flex items-center justify-center mx-auto mb-4 bg-emerald-50 dark:bg-emerald-900/20">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{coverage}% Coverage</h2>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
              {online} online · {inMeeting} in meetings · {offline} offline
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <div className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-violet-500" />
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Standard Check-in</span>
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">09:00 AM</span>
            </div>
            <div className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Coffee className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Lunch Break</span>
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">12:30 PM</span>
            </div>
            <div className="p-3.5 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Timer className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">EOD Standup</span>
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">04:30 PM</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-violet-500" />
            Team Status Overview
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  <th className="p-3 pl-0">Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Module</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Check-in</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {allTeam.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-3 pl-0">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-[9px] font-bold">
                          {m.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{m.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-xs text-slate-500">{m.role}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">{m.module}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${m.status === 'Online' ? 'bg-emerald-500 animate-pulse' : m.status === 'In Meeting' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                        <span className="text-xs text-slate-500 dark:text-slate-400">{m.status}</span>
                      </div>
                    </td>
                    <td className="p-3 text-xs font-semibold text-slate-600 dark:text-slate-300">09:00 AM</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
