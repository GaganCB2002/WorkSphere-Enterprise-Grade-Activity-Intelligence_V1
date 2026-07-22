import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Bot, Send, Sparkles, AlertTriangle, Cloud, Activity, Shield, DollarSign, Users, Target } from 'lucide-react';

export const EnterpriseAiCopilot: React.FC = () => {
  const [query, setQuery] = useState('');
  const user = useSelector((state: any) => state.auth.user) || { role: 'EMPLOYEE' };

  // Context-aware logic based on role
  const getContextAwareConfig = (role: string) => {
    switch(role) {
      case 'SECURITY_ANALYST':
      case 'SUPER_ADMIN':
      case 'ADMIN':
        return {
          title: "AI Security & Operations Copilot",
          welcome: "I am actively monitoring SIEM logs and access telemetry. I can isolate threats, investigate IP anomalies, or generate audit reports. How can I assist?",
          suggestions: [
            { text: "Analyze anomalous login from Moscow", icon: <Shield className="w-4 h-4 text-blue-400" /> },
            { text: "Isolate DESKTOP-X94J from network", icon: <AlertTriangle className="w-4 h-4 text-red-400" /> },
            { text: "Generate SOC2 compliance report", icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
          ],
          capabilities: [
            "Threat Isolation", "Forensic Log Analysis", "RBAC Matrix Audit", "Automated Compliance Reporting"
          ]
        };
      case 'CEO':
      case 'CTO':
      case 'FINANCE_MANAGER':
        return {
          title: "AI Executive Copilot",
          welcome: "I am analyzing enterprise-wide telemetry, cloud costs, and revenue streams. I can generate predictive models for next quarter or analyze current burn rates.",
          suggestions: [
            { text: "Predict next month's AWS OPEX", icon: <DollarSign className="w-4 h-4 text-green-400" /> },
            { text: "Generate cross-team OKR summary", icon: <Target className="w-4 h-4 text-purple-400" /> },
            { text: "Identify highest cost centers", icon: <Activity className="w-4 h-4 text-rose-400" /> },
          ],
          capabilities: [
            "Revenue Burn Rate Prediction", "Cloud Cost Optimization", "Team Velocity Summaries", "Risk Modeling"
          ]
        };
      case 'DEVOPS_ENGINEER':
      case 'TECH_LEAD':
        return {
          title: "AI DevOps & Engineering Copilot",
          welcome: "I am monitoring the Kubernetes clusters and CI/CD pipelines. I can explain deployment failures, optimize cloud resources, or analyze code PRs.",
          suggestions: [
            { text: "Why did payment-gateway deployment fail?", icon: <AlertTriangle className="w-4 h-4 text-rose-400" /> },
            { text: "Show pods consuming high memory", icon: <Activity className="w-4 h-4 text-purple-400" /> },
            { text: "Predict next month's AWS costs", icon: <Cloud className="w-4 h-4 text-orange-400" /> },
          ],
          capabilities: [
            "Explain Deployment Failures", "Predict System Outages", "Analyze ELK Stack Logs", "Optimize Kubernetes Pods"
          ]
        };
      case 'HR_MANAGER':
      case 'HR_EXECUTIVE':
        return {
          title: "AI Workforce Copilot",
          welcome: "I am analyzing workforce telemetry and engagement metrics. I can predict employee burnout risk, summarize attendance, or assist with onboarding.",
          suggestions: [
            { text: "Show top 10 burnout risk employees", icon: <Users className="w-4 h-4 text-rose-400" /> },
            { text: "Generate weekly attendance summary", icon: <Activity className="w-4 h-4 text-blue-400" /> },
            { text: "Draft onboarding plan for new Devs", icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
          ],
          capabilities: [
            "Burnout Prediction", "Attendance Summarization", "Policy Generation", "Sentiment Analysis"
          ]
        };
      default:
        return {
          title: "Enterprise AI Copilot",
          welcome: "Hello! I am your Enterprise AI Copilot. I can assist you with your daily tasks, retrieve documents, and answer organizational questions.",
          suggestions: [
            { text: "Summarize my tasks for today", icon: <Activity className="w-4 h-4 text-blue-400" /> },
            { text: "Find the latest IT security policy", icon: <Shield className="w-4 h-4 text-purple-400" /> },
            { text: "Draft an email to my manager", icon: <Sparkles className="w-4 h-4 text-emerald-400" /> },
          ],
          capabilities: [
            "Task Summarization", "Document Retrieval", "Draft Emails", "Organizational Q&A"
          ]
        };
    }
  };

  const config = getContextAwareConfig(user.role);
  
  // Initialize with the contextual welcome message
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: config.welcome }
  ]);

  const handleSend = () => {
    if (!query.trim()) return;
    
    const newMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, newMsg]);
    
    const userQuery = query;
    setQuery('');

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: `Processing: "${userQuery}". As your ${config.title}, I am analyzing the enterprise telemetry data... Please stand by for the detailed report.`
      }]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Bot className="w-5 h-5 text-brand" />
        <h2 className="text-xl font-bold text-white tracking-wide">{config.title}</h2>
      </div>

      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row gap-6">
        
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col min-h-[400px] border border-slate-800 rounded-2xl bg-slate-950 overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-brand/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center shadow-lg shadow-brand/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">WorkSphere Copilot</h3>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Context: {user.role.replace('_', ' ')}</p>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${msg.sender === 'user' ? 'bg-slate-700' : 'bg-brand'}`}>
                  {msg.sender === 'user' ? <span className="text-[10px] font-bold text-white">U</span> : <Bot className="w-3.5 h-3.5 text-white" />}
                </div>
                <div className={`rounded-2xl p-3 text-sm shadow-md ${
                  msg.sender === 'user' 
                    ? 'bg-brand text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-300 rounded-tl-none border border-slate-700'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 bg-slate-900 border-t border-slate-800">
            <div className="relative">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your AI Copilot..." 
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand hover:bg-brand-600 text-white rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* AI Capabilities / Suggestions */}
        <div className="w-full md:w-80 space-y-4">
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand" /> Contextual Suggestions
            </h4>
            <div className="space-y-2">
              {config.suggestions.map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => setQuery(item.text)}
                  className="w-full flex items-center gap-3 p-3 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800/50 transition-colors text-left"
                >
                  <div className="p-1.5 bg-slate-950 rounded-lg shadow-inner flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-xs text-slate-300 font-medium">{item.text}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5">
            <h4 className="text-sm font-bold text-white mb-2">Role Capabilities</h4>
            <ul className="text-xs text-slate-400 space-y-2">
              {config.capabilities.map((cap, idx) => (
                <li key={idx} className="flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-brand before:rounded-full">
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
    </section>
  );
};
