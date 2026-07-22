import React, { useState } from 'react';
import { 
  Bot, Send, Sparkles, TrendingUp, AlertTriangle, 
  CheckCircle2, Cpu, HelpCircle 
} from 'lucide-react';

interface ChatMessage {
  sender: 'AI' | 'USER';
  text: string;
  timestamp: string;
}

export const AiAssistantTab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'AI', text: 'FinCorp treasury AI model initialized. I can predict cash flows, audit transactions, and reconcile GST filing tables.', timestamp: '11:30' },
  ]);

  const [inputVal, setInputVal] = useState('');

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;
    const userMsg: ChatMessage = {
      sender: 'USER',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    setTimeout(() => {
      let aiText = '';
      const textLower = textToSend.toLowerCase();

      if (textLower.includes('cash flow') || textLower.includes('liquidity')) {
        aiText = 'Current liquid cash flow stands at ₹1.42B (+2.4% vs last month). Projected Q4 inflow is ₹18.5M with outflows at ₹4.5M, leaving a healthy treasury reserve.';
      } else if (textLower.includes('audit') || textLower.includes('anomaly')) {
        aiText = 'Forensic audit telemetry checks show 14 flagged anomalies. 1 critical compliance risk detected: missing W-9 tax registry files for Acme Corp.';
      } else if (textLower.includes('budget')) {
        aiText = 'Active budget consumption is at 66% (₹16.2M spent of ₹24.5M allocated). Marketing is currently over-budget by 8% (₹3.25M consumed vs ₹3.0M planned).';
      } else {
        aiText = 'I have analyzed your query against our secure local ledger database. General ledger values are healthy and all active operations correspond to authorized protocol guidelines.';
      }

      const aiMsg: ChatMessage = {
        sender: 'AI',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Treasury AI Command</h1>
          <p className="text-[#8693BA] text-sm mt-1">Interact with secure, localized LLM models trained on corporate accounting policies.</p>
        </div>
      </div>

      {/* Chat Workspace */}
      <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl h-[500px] flex flex-col justify-between">
        
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[70%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'USER' 
                    ? 'bg-[#00e5ff] text-[#080B13] font-bold rounded-tr-none' 
                    : 'bg-[#0C101F] border border-[#1C2542] text-[#F0EEF8] rounded-tl-none'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-extrabold tracking-wide uppercase opacity-75">
                  {msg.sender === 'AI' ? <Bot className="w-3.5 h-3.5" /> : null}
                  <span>{msg.sender === 'AI' ? 'Treasury Copilot' : 'Operator'}</span>
                  <span className="ml-auto font-mono text-[9px] font-normal">{msg.timestamp}</span>
                </div>
                <div>{msg.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Controls */}
        <div className="space-y-4 border-t border-[#1D2644] pt-4">
          {/* Quick Query Chips */}
          <div className="flex flex-wrap gap-2 text-[10px] font-bold">
            <button 
              onClick={() => handleSend("Analyze Q3 Budget Variance")}
              className="px-3 py-1.5 bg-[#0C101F] border border-[#1D2644] text-[#8693BA] hover:text-[#00e5ff] hover:border-[#00e5ff]/50 rounded-xl transition-all"
            >
              Analyze Q3 Variance
            </button>
            <button 
              onClick={() => handleSend("Audit current compliance anomalies")}
              className="px-3 py-1.5 bg-[#0C101F] border border-[#1D2644] text-[#8693BA] hover:text-[#00e5ff] hover:border-[#00e5ff]/50 rounded-xl transition-all"
            >
              Check Anomalies
            </button>
            <button 
              onClick={() => handleSend("Forecast Q4 cash flows")}
              className="px-3 py-1.5 bg-[#0C101F] border border-[#1D2644] text-[#8693BA] hover:text-[#00e5ff] hover:border-[#00e5ff]/50 rounded-xl transition-all"
            >
              Forecast Q4 Cash Flow
            </button>
          </div>

          {/* Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(inputVal); }}
            className="flex gap-2"
          >
            <input 
              type="text" 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask AI Copilot about ledger accounts, invoices, or cash reserves..."
              className="flex-1 pl-4 pr-4 py-3 bg-[#070912] border border-[#1D2644] rounded-2xl text-white text-xs placeholder:text-[#5B678E] focus:border-[#00e5ff] focus:outline-none transition-colors"
            />
            <button 
              type="submit"
              className="p-3 bg-[#00e5ff] hover:bg-[#00ccf0] text-[#080B13] rounded-2xl transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
