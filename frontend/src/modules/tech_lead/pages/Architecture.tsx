// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, Server, Database, Globe, ArrowRight, Shield, Cloud, Cpu } from 'lucide-react';

export const Architecture = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { fetch('/api/tech-lead/docs/architecture').then(r => r.json()).then(d => setData(d)).catch(() => {}); }, []);
  const layers = data?.layers || [
    { name: 'Client Layer', desc: 'React SPA, Mobile Apps', tech: ['React', 'React Native', 'Tailwind'], icon: Globe, color: 'text-indigo-400' },
    { name: 'API Gateway', desc: 'Load balancer, Auth, Rate limiting', tech: ['Nginx', 'Kong', 'OAuth2'], icon: Shield, color: 'text-emerald-400' },
    { name: 'Microservices', desc: 'Business logic services', tech: ['Node.js', 'Python', 'Go'], icon: Cpu, color: 'text-amber-400' },
    { name: 'Data Layer', desc: 'Primary DB, Cache, Queue', tech: ['PostgreSQL', 'Redis', 'RabbitMQ'], icon: Database, color: 'text-blue-400' },
    { name: 'Infrastructure', desc: 'Cloud, K8s, Monitoring', tech: ['AWS', 'Kubernetes', 'Prometheus'], icon: Cloud, color: 'text-purple-400' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2"><Layers className="w-6 h-6 text-indigo-500" /> System Architecture</h1>
        <p className="text-xs text-slate-400 mt-0.5">High-level architecture overview</p>
      </div>
      <div className="relative flex flex-col items-center gap-2">
        {layers.map((layer, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            className="w-full bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md hover:border-indigo-500/40 transition-all">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#1E293B]/50 rounded-xl"><layer.icon className={"w-6 h-6 " + layer.color} /></div>
              <div className="flex-1"><h3 className="font-bold text-base text-slate-100">{layer.name}</h3><p className="text-xs text-slate-400 mt-0.5">{layer.desc}</p><div className="flex gap-2 mt-2">{layer.tech.map((t, j) => <span key={j} className="text-[10px] font-bold text-slate-400 bg-[#1E293B]/50 px-2 py-0.5 rounded border border-slate-700/60">{t}</span>)}</div></div>
              {i < layers.length - 1 && <ArrowRight className="w-5 h-5 text-slate-600 rotate-90 md:rotate-0" />}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

