// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, CheckCircle2, Info, Clock, XCircle, Filter, Settings2 } from 'lucide-react';

export const AlertsPage = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/monitoring/alerts').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const alerts = data?.alerts || [
    { severity: 'critical', title: 'API Gateway Latency Spike', desc: 'Latency exceeded 2000ms threshold on /v1/auth/verify', time: '10:15 AM', source: 'AWS CloudWatch', acknowledged: false },
    { severity: 'warning', title: 'High Memory Usage', desc: 'Redis cache memory at 88% on cache-01', time: '10:08 AM', source: 'Prometheus', acknowledged: true },
    { severity: 'info', title: 'Deployment Successful', desc: 'v2.4.1 deployed to production', time: '10:00 AM', source: 'CI/CD Pipeline', acknowledged: true },
    { severity: 'critical', title: 'Database Connection Pool Exhausted', desc: 'Connection pool at 95% capacity on db-primary', time: '9:45 AM', source: 'RDS Monitoring', acknowledged: false },
    { severity: 'warning', title: 'SSL Certificate Expiring', desc: 'worksphere.com SSL expires in 14 days', time: '8:30 AM', source: 'Certificate Manager', acknowledged: false },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Bell className="w-6 h-6 text-indigo-500" /> Alerts</h1><p className="text-xs text-slate-400 mt-0.5">{alerts.filter(a => !a.acknowledged).length} unacknowledged alerts</p></div>
        <button className="flex items-center gap-2 bg-[#1E293B] hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-md text-xs font-semibold border border-slate-700/60"><Settings2 className="w-4 h-4" /> Alert Rules</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[{ label: 'Critical', count: alerts.filter(a => a.severity === 'critical').length, color: 'text-rose-400' }, { label: 'Warnings', count: alerts.filter(a => a.severity === 'warning').length, color: 'text-amber-400' }, { label: 'Info', count: alerts.filter(a => a.severity === 'info').length, color: 'text-blue-400' }].map((s, i) => (
          <div key={i} className="bg-[#0F172A]/90 border border-slate-800/80 rounded-xl p-4 backdrop-blur-md"><p className="text-xs text-slate-400">{s.label}</p><p className={"text-2xl font-extrabold " + s.color}>{s.count}</p></div>
        ))}
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="divide-y divide-slate-800">{alerts.map((a, i) => (
          <div key={i} className={"p-4 flex items-start gap-4 hover:bg-[#1E293B]/30 transition-colors " + (!a.acknowledged ? 'bg-rose-500/5' : '')}>
            <div className={"mt-0.5 p-1.5 rounded-lg " + (a.severity === 'critical' ? 'bg-rose-500/10' : a.severity === 'warning' ? 'bg-amber-500/10' : 'bg-blue-500/10')}>
              {a.severity === 'critical' ? <XCircle className={"w-4 h-4 text-rose-400"} /> : a.severity === 'warning' ? <AlertTriangle className="w-4 h-4 text-amber-400" /> : <Info className="w-4 h-4 text-blue-400" />}
            </div>
            <div className="flex-1"><div className="flex items-center justify-between"><h3 className={"font-bold text-sm " + (a.severity === 'critical' ? 'text-rose-400' : a.severity === 'warning' ? 'text-amber-400' : 'text-blue-400')}>{a.title}</h3><span className={"text-xs font-bold px-2 py-0.5 rounded " + (a.severity === 'critical' ? 'bg-rose-500/10 text-rose-400' : a.severity === 'warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400')}>{a.severity}</span></div>
              <p className="text-xs text-slate-300 mt-1">{a.desc}</p><div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400"><Clock className="w-3 h-3" />{a.time}<span>{a.source}</span>{!a.acknowledged && <button className="text-indigo-400 font-bold hover:text-indigo-300">Acknowledge</button>}</div></div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

