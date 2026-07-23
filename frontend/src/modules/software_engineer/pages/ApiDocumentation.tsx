// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Server, ChevronDown, ExternalLink, Book, Code2 } from 'lucide-react';

export const ApiDocumentation = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/software-engineer/api-documentation')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 space-y-4 animate-pulse"><div className="h-20 bg-[#0F172A]/90 rounded-2xl" /><div className="h-96 bg-[#0F172A]/90 rounded-2xl" /></div>;

  const endpoints = data?.endpoints || [
    { path: '/api/v2/users', method: 'GET', description: 'List all users', params: [{ name: 'page', type: 'integer', required: false }, { name: 'limit', type: 'integer', required: false }], auth: 'Bearer Token', responses: [{ code: 200, description: 'Success' }, { code: 401, description: 'Unauthorized' }] },
    { path: '/api/v2/users/:id', method: 'GET', description: 'Get user by ID', params: [{ name: 'id', type: 'string', required: true }], auth: 'Bearer Token', responses: [{ code: 200, description: 'Success' }, { code: 404, description: 'Not found' }] },
    { path: '/api/v2/users', method: 'POST', description: 'Create a new user', params: [{ name: 'name', type: 'string', required: true }, { name: 'email', type: 'string', required: true }], auth: 'Bearer Token', responses: [{ code: 201, description: 'Created' }, { code: 400, description: 'Validation error' }] },
    { path: '/api/v2/auth/login', method: 'POST', description: 'Authenticate user', params: [{ name: 'email', type: 'string', required: true }, { name: 'password', type: 'string', required: true }], auth: 'None', responses: [{ code: 200, description: 'Token returned' }, { code: 401, description: 'Invalid credentials' }] },
    { path: '/api/v2/payments', method: 'POST', description: 'Process a payment', params: [{ name: 'amount', type: 'number', required: true }, { name: 'currency', type: 'string', required: true }], auth: 'Bearer Token', responses: [{ code: 201, description: 'Payment processed' }] },
    { path: '/api/v2/health', method: 'GET', description: 'Health check endpoint', params: [], auth: 'None', responses: [{ code: 200, description: 'Service healthy' }] },
  ];

  const methodColor = (m) => {
    switch (m) {
      case 'GET': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'POST': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'PUT': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'DELETE': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-400';
    }
  };

  const filtered = endpoints.filter(e => e.path.includes(search) || e.method.includes(search) || e.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-[#0B0F19] text-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div>
          <div className="text-xs font-semibold text-indigo-400">Software Engineer Workspace</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2"><Book className="w-6 h-6 text-indigo-400" /> API Documentation</h1>
          <p className="text-xs text-slate-400 mt-0.5">{endpoints.length} endpoints documented</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Search endpoints..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full bg-[#1E293B] text-slate-200 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-700/60 focus:outline-none focus:border-indigo-500/50" />
      </div>

      <div className="space-y-3">
        {filtered.map((ep, idx) => (
          <motion.details key={ep.path + ep.method} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
            className="bg-[#0F172A]/90 border border-slate-800/80 rounded-2xl overflow-hidden group">
            <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/30 transition-all">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${methodColor(ep.method)}`}>{ep.method}</span>
                <code className="text-xs font-mono font-bold text-slate-200">{ep.path}</code>
                <span className="text-xs text-slate-400 hidden sm:inline">{ep.description}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-4 pb-4 pt-0 border-t border-slate-800">
              <p className="text-xs text-slate-300 mb-3">{ep.description}</p>
              {ep.params.length > 0 && (<div className="mb-3"><h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Parameters</h4>{ep.params.map(p => <div key={p.name} className="flex items-center gap-3 text-xs text-slate-300 py-1"><code className="text-indigo-400 font-mono">{p.name}</code><span className="text-slate-500">{p.type}</span>{p.required && <span className="text-rose-400">*required</span>}</div>))}</div>)}
              <div className="mb-3"><h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Authentication</h4><span className="text-xs text-slate-300">{ep.auth}</span></div>
              <div><h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Responses</h4>{ep.responses.map(r => <div key={r.code} className="flex items-center gap-3 text-xs text-slate-300 py-1"><span className="text-emerald-400 font-bold">{r.code}</span>{r.description}</div>)}</div>
            </div>
          </motion.details>
        ))}
      </div>
    </motion.div>
  );
};
