import React, { useState } from 'react';
import { 
  Bell, CheckCircle2, Clock, AlertTriangle, Trash2, 
  RefreshCw, ShieldAlert, Sparkles 
} from 'lucide-react';

interface AlertNotification {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  category: 'SECURITY' | 'COMPLIANCE' | 'APPROVAL' | 'SYSTEM';
  read: boolean;
}

export const NotificationsTab: React.FC = () => {
  const [notifications, setNotifications] = useState<AlertNotification[]>([
    { id: '1', title: 'Compliance alert: Missing W-9 form', detail: 'Acme Corp vendor records indicate missing statutory registration documentation for current tax year.', timestamp: '2026-05-25 11:05', category: 'COMPLIANCE', read: false },
    { id: '2', title: 'Payout clearance required: AWS Infrastructure', detail: 'Pending Invoice INV-AWS-8930 for ₹84,200 is approaching the Net-30 deadline. Payout recommended.', timestamp: '2026-05-25 10:12', category: 'APPROVAL', read: false },
    { id: '3', title: 'Audit completed successfully', detail: 'Annual corporate audit logs for tech corp branch compiled and submitted to tax registers.', timestamp: '2026-05-24 14:22', category: 'SYSTEM', read: true },
    { id: '4', title: 'New operator credentials verified', detail: 'Rohan Sharma successfully generated an access token key for the newly added analyst kabir mehta.', timestamp: '2026-05-24 10:05', category: 'SECURITY', read: true },
  ]);

  const [filter, setFilter] = useState<'ALL' | 'UNREAD' | 'READ'>('ALL');

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    alert('All treasury notifications marked as read.');
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'UNREAD') return !n.read;
    if (filter === 'READ') return n.read;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Alerts & Security Center</h1>
          <p className="text-[#8693BA] text-sm mt-1">Review active security logs, transaction approval prompts, and compliance anomalies.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleMarkAllAsRead}
            disabled={notifications.filter(n => !n.read).length === 0}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              notifications.filter(n => !n.read).length === 0
                ? 'bg-[#1D2644]/40 border-[#1D2644] text-[#5B678E] cursor-not-allowed'
                : 'bg-[#0F1326] border-[#1D2644] text-[#8693BA] hover:text-white hover:border-[#00e5ff]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Mark All Read</span>
          </button>
        </div>
      </div>

      {/* Grid splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Alerts Listings (Left 8 Columns) */}
        <div className="lg:col-span-8 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-[#1D2644] pb-4">
            <h3 className="text-lg font-bold text-white">Notification Stream</h3>
            
            <div className="flex items-center gap-1 bg-[#070912] border border-[#1D2644] rounded-xl p-1 text-xs">
              {(['ALL', 'UNREAD', 'READ'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    filter === f ? 'bg-[#00e5ff]/10 text-[#00e5ff]' : 'text-[#8693BA] hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredNotifs.map(n => (
              <div 
                key={n.id} 
                className={`p-4 bg-[#0C101F]/80 border rounded-2xl transition-all relative group flex gap-3.5 border-l-4 ${
                  n.read ? 'border-[#1C2542] opacity-75' : 'border-[#00e5ff] hover:border-[#00e5ff]/50'
                } ${
                  n.category === 'SECURITY' || n.category === 'COMPLIANCE' ? 'border-l-red-500' : 
                  n.category === 'APPROVAL' ? 'border-l-blue-500' : 'border-l-emerald-500'
                }`}
              >
                <div className={`p-2 rounded-xl h-fit flex-shrink-0 ${
                  n.category === 'SECURITY' || n.category === 'COMPLIANCE' ? 'bg-red-500/10 text-red-400' :
                  n.category === 'APPROVAL' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'
                }`}>
                  {n.category === 'SECURITY' || n.category === 'COMPLIANCE' ? <ShieldAlert className="w-4.5 h-4.5" /> : <Bell className="w-4.5 h-4.5" />}
                </div>

                <div className="flex-1 pr-8">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs font-bold text-white leading-tight">{n.title}</h4>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#8693BA] mt-1.5 leading-relaxed">{n.detail}</p>
                  <p className="text-[9px] text-[#5B678E] mt-3 font-mono">{n.timestamp} • {n.category}</p>
                </div>

                {/* Actions */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {!n.read && (
                    <button 
                      onClick={() => handleMarkAsRead(n.id)}
                      className="p-1.5 hover:bg-[#00e5ff]/10 text-[#8693BA] hover:text-[#00e5ff] rounded-lg transition-all"
                      title="Mark as Read"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => handleDeleteNotification(n.id)}
                    className="p-1.5 hover:bg-red-500/10 text-[#8693BA] hover:text-red-400 rounded-lg transition-all"
                    title="Delete Alert"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {filteredNotifs.length === 0 && (
              <div className="p-12 text-center text-[#5B678E] font-medium font-mono text-xs">
                No alerts in feed buffer matching this category filter.
              </div>
            )}
          </div>
        </div>

        {/* Right Info Box (Right 4 Columns) */}
        <div className="lg:col-span-4 bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-md font-bold text-white border-b border-[#1D2644] pb-3 mb-4">Security Intel</h3>
            <div className="p-4 bg-red-500/5 border border-red-500/15 rounded-2xl text-xs text-[#8693BA] leading-relaxed flex gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p>
                All payouts cleared outside operator limits will trigger high confidence compliance anomalies.
              </p>
            </div>
            
            <div className="p-4 bg-[#00e5ff]/5 border border-[#00e5ff]/15 rounded-2xl text-xs text-[#8693BA] leading-relaxed flex gap-2">
              <Sparkles className="w-5 h-5 text-[#00e5ff] shrink-0 mt-0.5" />
              <p>
                Keep alert protocols armed to receive push sync wire updates from integrated billing platforms.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
