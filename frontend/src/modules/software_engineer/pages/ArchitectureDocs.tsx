// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, Layers, Server, Database, Globe, Shield, ArrowRight, GitBranch, Cloud, Cpu, Network, Lock } from 'lucide-react';

export const ArchitectureDocs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/software-engineer/architecture-docs')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="grid grid-cols-2 gap-4"><div className="h-48" /><div className="h-48" /></div></div>;

  const systems = data?.systems || [
    { name: 'API Gateway', icon: Server, desc: 'Entry point for all client requests. Handles routing, rate limiting, and authentication.', tech: 'Go, Envoy', status: 'Active' },
    { name: 'User Service', icon: Users, desc: 'Manages user accounts, profiles, and authentication flows.', tech: 'Node.js, PostgreSQL', status: 'Active' },
    { name: 'Payment Service', icon: Globe, desc: 'Processes payments via Stripe and PayPal integrations.', tech: 'Java, MySQL', status: 'Active' },
    { name: 'Notification Service', icon: Bell, desc: 'Sends email, SMS, and push notifications.', tech: 'Node.js, RabbitMQ', status: 'Active' },
    { name: 'Search Service', icon: Database, desc: 'Full-text search powered by Elasticsearch.', tech: 'Python, Elasticsearch', status: 'Active' },
    { name: 'Cache Layer', icon: Database, desc: 'Redis-based distributed caching for improved performance.', tech: 'Redis', status: 'Active' },
    { name: 'Message Queue', icon: Network, desc: 'Async task processing via RabbitMQ.', tech: 'RabbitMQ', status: 'Active' },
    { name: 'CDN & Storage', icon: Cloud, desc: 'Static asset delivery and file storage.', tech: 'AWS S3, CloudFront', status: 'Active' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Layers className="w-6 h-6 text-indigo-400" /> Architecture Documentation</h1>
          <p className="text-xs text-slate-400 mt-0.5">System architecture overview &bull; {systems.length} services</p>
        </div>
      </div>

      <div className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-sm font-bold text-white mb-4">System Architecture Diagram</h2>
        <div className="flex flex-col items-center gap-3 p-6 border border-slate-800 rounded-xl bg-[#0E1117]/50">
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl"><Globe className="w-5 h-5 text-indigo-400" /><span className="text-xs font-bold text-white">Clients (Web, Mobile, API)</span></div>
          <ArrowRight className="w-5 h-5 text-slate-600 rotate-90" />
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl"><Shield className="w-5 h-5 text-amber-400" /><span className="text-xs font-bold text-white">API Gateway (Rate Limit, Auth)</span></div>
          <ArrowRight className="w-5 h-5 text-slate-600 rotate-90" />
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {systems.filter(s => s.name !== 'API Gateway' && s.name !== 'Clients').map(s => (
              <div key={s.name} className="flex flex-col items-center p-3 bg-[#1E293B]/70 border border-slate-800 rounded-xl min-w-[100px]">
                <s.icon className="w-5 h-5 text-indigo-400 mb-1" />
                <span className="text-[10px] font-bold text-white text-center">{s.name}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg"><Database className="w-4 h-4 text-blue-400" /><span className="text-[10px] font-bold text-white">Databases</span></div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg"><Cloud className="w-4 h-4 text-purple-400" /><span className="text-[10px] font-bold text-white">Cloud Services</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systems.map((s, idx) => (
          <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md hover:border-indigo-500/40 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20"><s.icon className="w-4 h-4 text-indigo-400" /></div>
              <h3 className="text-sm font-bold text-white">{s.name}</h3>
            </div>
            <p className="text-xs text-slate-400 mb-3">{s.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">{s.tech}</span>
              <span className="text-[10px] text-emerald-400">{s.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
