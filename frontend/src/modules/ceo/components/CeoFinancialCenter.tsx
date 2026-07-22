import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const mockFinanceData = [
  { month: 'Jan', Revenue: 1200000, Expenses: 800000, Profit: 400000 },
  { month: 'Feb', Revenue: 1350000, Expenses: 850000, Profit: 500000 },
  { month: 'Mar', Revenue: 1100000, Expenses: 750000, Profit: 350000 },
  { month: 'Apr', Revenue: 1450000, Expenses: 900000, Profit: 550000 },
  { month: 'May', Revenue: 1600000, Expenses: 950000, Profit: 650000 },
  { month: 'Jun', Revenue: 1800000, Expenses: 1000000, Profit: 800000 },
];

export const CeoFinancialCenter: React.FC = () => {
  return (
    <div className="space-y-6 mb-8">
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl">
        <div className="flex justify-between items-end border-b border-slate-800 pb-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Financial Intelligence Center</h3>
            <p className="text-slate-400 text-xs mt-1">Enterprise revenue, expense, and profitability forecasting</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
            <p className="text-emerald-400 text-sm font-bold flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4" /> Gross Revenue YTD
            </p>
            <h4 className="text-3xl font-extrabold text-white">₹8.5M</h4>
            <p className="text-xs text-slate-400 mt-2">Target: ₹10.0M (85%)</p>
          </div>
          
          <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
            <p className="text-rose-400 text-sm font-bold flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4" /> Operating Expenses
            </p>
            <h4 className="text-3xl font-extrabold text-white">₹5.25M</h4>
            <p className="text-xs text-slate-400 mt-2">Budgeted: ₹5.5M (Under budget)</p>
          </div>

          <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
            <p className="text-blue-400 text-sm font-bold flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4" /> Net Profit Margin
            </p>
            <h4 className="text-3xl font-extrabold text-white">38.2%</h4>
            <p className="text-xs text-slate-400 mt-2">Industry Average: 24%</p>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockFinanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" tickFormatter={(value) => `${value/1000}k`} />
              <Tooltip 
                formatter={(value: number) => `${(value/1000).toFixed(0)}k`}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '1rem', color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
