import React, { useState } from 'react';
import { 
  Settings, ShieldCheck, Key, Copy, Check, RefreshCw 
} from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const [twoFactor, setTwoFactor] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  
  const [apiKey, setApiKey] = useState('tc_live_89f023a89d023b10c92e10ff5a8bc321');
  const [copied, setCopied] = useState(false);

  const handleGenerateKey = () => {
    const randomHex = Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join('');
    setApiKey(`tc_live_${randomHex}`);
    setCopied(false);
    alert("New production ledger API credentials successfully generated and synchronized to encrypted servers.");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Treasury Control Config</h1>
          <p className="text-[#8693BA] text-sm mt-1">Configure global API tokens, session duration guidelines, and two-factor access protocols.</p>
        </div>
      </div>

      {/* Grid Settings Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Security Config */}
        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-[#1D2644] pb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#00e5ff]" />
            <span>Operator Security Protocols</span>
          </h3>

          <div className="space-y-4">
            {/* Toggle 2FA */}
            <div className="flex items-center justify-between p-4 bg-[#0C101F]/80 border border-[#1C2542] rounded-2xl">
              <div>
                <h4 className="text-xs font-bold text-white">Enforce Two-Factor Authentication (2FA)</h4>
                <p className="text-[10px] text-[#8693BA] mt-1">Enforce biometric auth tokens for all wire releases exceeding ₹500,000.</p>
              </div>
              <button 
                onClick={() => setTwoFactor(!twoFactor)}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
                  twoFactor ? 'bg-[#00e5ff]' : 'bg-[#1C2542]'
                }`}
              >
                <div className={`w-4 h-4 bg-[#080B13] rounded-full absolute top-1 transition-all ${
                  twoFactor ? 'left-6' : 'left-1'
                }`} />
              </button>
            </div>

            {/* Toggle IP Whitelisting */}
            <div className="flex items-center justify-between p-4 bg-[#0C101F]/80 border border-[#1C2542] rounded-2xl">
              <div>
                <h4 className="text-xs font-bold text-white">Restrict to Whitelisted HQ IPs</h4>
                <p className="text-[10px] text-[#8693BA] mt-1">Block session logs initiated outside active corporate VPN node profiles.</p>
              </div>
              <button 
                onClick={() => setIpWhitelist(!ipWhitelist)}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
                  ipWhitelist ? 'bg-[#00e5ff]' : 'bg-[#1C2542]'
                }`}
              >
                <div className={`w-4 h-4 bg-[#080B13] rounded-full absolute top-1 transition-all ${
                  ipWhitelist ? 'left-6' : 'left-1'
                }`} />
              </button>
            </div>

            {/* Timeout settings */}
            <div className="flex items-center justify-between p-4 bg-[#0C101F]/80 border border-[#1C2542] rounded-2xl">
              <div>
                <h4 className="text-xs font-bold text-white">Automated Timeout Threshold</h4>
                <p className="text-[10px] text-[#8693BA] mt-1">Disconnect operational token logs after idle minutes.</p>
              </div>
              <select 
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="px-3 py-1.5 bg-[#070912] border border-[#1D2644] rounded-xl text-white text-xs focus:border-[#00e5ff] focus:outline-none cursor-pointer"
              >
                <option value="15">15 Min</option>
                <option value="30">30 Min</option>
                <option value="60">60 Min</option>
              </select>
            </div>
          </div>
        </div>

        {/* API Credentials */}
        <div className="bg-[#0F1326]/40 border border-[#1D2644] rounded-3xl p-6 shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-white border-b border-[#1D2644] pb-3 flex items-center gap-2">
            <Key className="w-5 h-5 text-[#00e5ff]" />
            <span>Developer Ledger Keys</span>
          </h3>

          <div className="space-y-4">
            <div className="p-4 bg-[#0C101F]/80 border border-[#1C2542] rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-white">Live Ledger Read API Key</h4>
              <p className="text-[10px] text-[#8693BA]">Use this key to authorize custom client extensions syncing to read ledger transactions.</p>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={apiKey}
                  className="flex-1 px-3 py-2 bg-[#070912] border border-[#1C2542] rounded-xl text-white font-mono text-[10px] focus:outline-none"
                />
                <button 
                  onClick={handleCopy}
                  className="p-2 bg-[#00e5ff]/10 hover:bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/20 rounded-xl transition-all flex items-center justify-center"
                  title="Copy Key"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button 
              onClick={handleGenerateKey}
              className="w-full py-2.5 bg-[#0C1226]/80 hover:bg-[#121B35] border border-[#1E294B] hover:border-[#00e5ff] text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate Credentials</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
