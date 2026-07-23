// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Database, Server, Globe, DollarSign, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const CloudResources = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/infra/cloud').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const resources = data?.resources || [
    { name: 'worksphere-prod', provider: 'AWS', type: 'EC2', region: 'us-east-1', status: 'running', cost: '/mo', instances: 12 },
    { name: 'worksphere-db', provider: 'AWS', type: 'RDS', region: 'us-east-1', status: 'running', cost: ',240/mo', instances: 3 },
    { name: 'worksphere-cache', provider: 'AWS', type: 'ElastiCache', region: 'us-east-1', status: 'running', cost: '/mo', instances: 2 },
    { name: 'worksphere-staging', provider: 'AWS', type: 'ECS', region: 'us-east-1', status: 'running', cost: '/mo', instances: 6 },
    { name: 'worksphere-backup', provider: 'AWS', type: 'S3', region: 'us-east-1', status: 'active', cost: '/mo', instances: '--' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Cloud className="w-6 h-6 text-indigo-500" /> Cloud Resources</h1><p className="text-xs text-slate-400 mt-1">{resources.length} resources &bull; AWS us-east-1</p></div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg text-xs font-bold text-indigo-400"><DollarSign className="w-3.5 h-3.5" /> Total: ,967/mo</div>
      </div>
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider"><div className="col-span-2">Name</div><div className="col-span-2">Provider</div><div className="col-span-2">Type</div><div className="col-span-2">Status</div><div className="col-span-2">Cost</div><div className="col-span-2">Instances</div></div>
        <div className="divide-y divide-slate-800">{resources.map((r, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#1E293B]/30 transition-colors">
            <div className="col-span-2"><span className="text-sm font-semibold text-slate-200">{r.name}</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-400"><Globe className="w-3 h-3 inline mr-1" />{r.provider}</span></div>
            <div className="col-span-2"><span className="text-xs font-bold text-slate-300">{r.type}</span></div>
            <div className="col-span-2"><span className={"flex items-center gap-1 text-xs font-bold " + (r.status === 'running' || r.status === 'active' ? 'text-emerald-400' : 'text-rose-400')}>{r.status === 'running' || r.status === 'active' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}{r.status}</span></div>
            <div className="col-span-2"><span className="text-xs font-bold text-slate-300">{r.cost}</span></div>
            <div className="col-span-2"><span className="text-xs text-slate-400">{r.instances}</span></div>
          </div>
        ))}</div>
      </div>
    </motion.div>
  );
};

