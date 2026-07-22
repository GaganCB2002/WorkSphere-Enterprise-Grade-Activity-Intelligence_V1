import React, { useEffect, useState } from 'react';
import { Download, Activity } from 'lucide-react';

interface ActivityLog {
    id: string;
    employeeId: string;
    moduleOpened: string;
    durationSeconds: number;
    timestamp: string;
}

export const ActivityReportsView = () => {
    const [activities, setActivities] = useState<ActivityLog[]>([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await fetch(import.meta.env.VITE_TELEMETRY_API_URL ? `${import.meta.env.VITE_TELEMETRY_API_URL}/api/telemetry/activity/report` : 'http://localhost:5000/api/telemetry/activity/report');
                if (res.ok) {
                    const data = await res.json();
                    setActivities(data.reverse()); // latest first
                }
            } catch (e) {
                console.error("Failed to fetch activities");
            }
        };
        fetchActivities();
        const interval = setInterval(fetchActivities, 5000);
        return () => clearInterval(interval);
    }, []);

    const downloadCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Employee ID,Module Opened,Duration (Seconds),Timestamp\n";
        
        activities.forEach(row => {
            const rowStr = `${row.employeeId},${row.moduleOpened},${row.durationSeconds},${row.timestamp}`;
            csvContent += rowStr + "\n";
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Enterprise_Activity_Report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex-1 flex flex-col p-6 h-full text-slate-300">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-400" /> Enterprise Activity Ledger
                    </h2>
                    <p className="text-xs text-slate-400">Silent module navigation and dwell-time tracker across all enterprise roles</p>
                </div>
                <button 
                    onClick={downloadCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all"
                >
                    <Download className="w-4 h-4" /> Download CSV Report
                </button>
            </div>

            <div className="flex-1 overflow-y-auto border border-slate-800 rounded-2xl bg-slate-900/50">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-slate-950 z-10 border-b border-slate-800">
                        <tr className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                            <th className="p-4">Timestamp</th>
                            <th className="p-4">Employee ID</th>
                            <th className="p-4">Module Visited</th>
                            <th className="p-4 text-right">Dwell Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {activities.map(act => (
                            <tr key={act.id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="p-4 text-xs font-mono text-slate-500">{new Date(act.timestamp).toLocaleTimeString()}</td>
                                <td className="p-4 text-xs font-bold text-white">
                                    <span 
                                        className="cursor-pointer hover:text-blue-400 hover:underline transition-all"
                                        onClick={() => window.open(`/command-center?userId=${act.employeeId}`, '_blank')}
                                    >
                                        {act.employeeId}
                                    </span>
                                </td>
                                <td className="p-4 text-xs text-blue-300 font-mono">{act.moduleOpened}</td>
                                <td className="p-4 text-xs text-right font-bold text-emerald-400">{act.durationSeconds}s</td>
                            </tr>
                        ))}
                        {activities.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-slate-500 text-sm">
                                    No activity logged yet. Tracking is running silently.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
