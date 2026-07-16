import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Send, Code, AlertTriangle, FileText, Loader } from 'lucide-react';

interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
}

const suggestedActions = [
  { icon: Code, label: 'Generate E2E login test script' },
  { icon: AlertTriangle, label: 'Analyze recent test failures' },
  { icon: FileText, label: 'Draft bug report from stack trace' },
];

const aiResponses: Record<string, string> = {
  'generate': `Here's a Cypress E2E login test script:

\`\`\`javascript
describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login with valid credentials', () => {
    cy.get('[data-cy="email"]').type('user@sahara.com');
    cy.get('[data-cy="password"]').type('securePass123');
    cy.get('[data-cy="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="welcome"]').should('contain', 'Welcome back');
  });

  it('should show error on invalid credentials', () => {
    cy.get('[data-cy="email"]').type('invalid@test.com');
    cy.get('[data-cy="password"]').type('wrong');
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="error"]').should('be.visible');
  });
});
\`\`\`

This covers happy path and error scenarios. Would you like me to add SSO or MFA test cases?`,

  'analyze': `## Test Failure Analysis Report

**Suite:** Payment Checkout (Nightly Run)
**Environment:** staging-v2
**Timestamp:** 2026-05-26 03:15 UTC

### Failed Tests (3)
1. **TC-4221** - "Enterprise checkout with 50+ items"  
   → \`TimeoutError: pagination did not complete within 30s\`
   - Root cause: Connection pool exhaustion in payment-gateway-service

2. **TC-4223** - "Currency conversion display"  
   → \`AssertionError: expected "¥1,234" to equal "¥1,234.00"\`
   - Root cause: Missing decimal places in JPY formatter

3. **TC-4225** - "Invoice PDF generation"  
   → \`TypeError: Cannot read properties of undefined (reading 'map')\`
   - Root cause: Empty line items array not handled

### Recommendations
- Increase connection pool size in payment-gateway config
- Fix currency formatter for zero-decimal currencies
- Add null check before rendering line items in PDF template`,

  'draft': `## Bug Report: Payment Gateway Timeout

**ID:** DEF-4092  
**Severity:** CRITICAL  
**Module:** Payment Core  
**Environment:** Production  

### Description
Enterprise customers with >50 items experience timeout during payment processing due to insufficient connection pool size in payment-gateway-service.

### Steps to Reproduce
1. Add 50+ items to cart
2. Proceed to checkout
3. Enter payment details
4. Submit payment
5. Observe 30-second timeout → payment failure

### Expected Behavior
Payment should process within 5 seconds regardless of cart size.

### Actual Behavior
Timeout occurs at 30s with HTTP 504 Gateway Timeout.

### Technical Details
- Service: payment-gateway-service:v2.4.0
- Connection pool: 10 (should be 50 for enterprise)
- Stack trace: [Link to Sentry event #8923]

### Suggested Fix
Increase \`PG_CONNECTION_POOL_SIZE\` from 10 to 50 in Helm values and redeploy.`,
};

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi! I'm Sahara AI. I can help you write Cypress/Playwright assertions, analyze stack traces from failed CI builds, or draft bug reports. What do you need help with today?" },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('generate') || q.includes('script') || q.includes('test') || q.includes('e2e') || q.includes('cypress') || q.includes('playwright')) {
      return aiResponses.generate;
    }
    if (q.includes('analyze') || q.includes('failure') || q.includes('failed') || q.includes('stack') || q.includes('crash')) {
      return aiResponses.analyze;
    }
    if (q.includes('draft') || q.includes('bug') || q.includes('report') || q.includes('defect')) {
      return aiResponses.draft;
    }
    return `I understand you're asking about "${query}". I can help with:\n\n1. **Generate test scripts** - Cypress, Playwright, or Selenium\n2. **Analyze failures** - Parse stack traces and CI logs\n3. **Draft bug reports** - Structured defect descriptions\n\nWhich would you like me to help with?`;
  };

  const handleSend = (text: string) => {
    const msg = text.trim();
    if (!msg || isLoading) return;
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setInput('');
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: getResponse(msg) }]);
      setIsLoading(false);
    }, 800);
  };

  const handleSuggestedAction = (label: string) => {
    handleSend(label);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          AI Assistant <Sparkles className="w-5 h-5 text-amber-500" />
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Generate test scripts and analyze crash logs instantly</p>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-sm min-h-[500px]">
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">Sahara AI</span>
            <span className="text-xs text-slate-400 ml-2">Quality Engineering Assistant</span>
          </div>
          <span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </span>
        </div>

        <div className="flex-1 p-5 overflow-y-auto space-y-5">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.role === 'assistant' ? (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm">
                  AM
                </div>
              )}
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'assistant'
                    ? 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-tl-none'
                    : 'bg-violet-600 text-white rounded-tr-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <Loader className="w-5 h-5 text-violet-500 animate-spin" />
              </div>
            </div>
          )}

          {messages.length === 1 && !isLoading && (
            <div className="flex flex-wrap gap-2">
              {suggestedActions.map((action, i) => (
                <button key={i} onClick={() => handleSuggestedAction(action.label)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-violet-300 dark:hover:border-violet-700 transition-all shadow-sm">
                  <action.icon className="w-4 h-4 text-violet-500" />
                  {action.label}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <form onSubmit={e => { e.preventDefault(); handleSend(input); }}
          className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
          <div className="relative">
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              placeholder="Ask the AI to write tests, analyze failures, or draft reports..."
              className="w-full pl-4 pr-12 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/30 text-slate-900 dark:text-slate-100 placeholder-slate-400 shadow-sm" />
            <button type="submit" disabled={!input.trim() || isLoading}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-white bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-700 hover:to-violet-700 rounded-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
