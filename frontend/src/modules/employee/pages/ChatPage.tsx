import React from 'react';
import { MessageSquare, Filter, Download } from 'lucide-react';
import { EmployeePageLayout } from '../components/EmployeePageLayout';
import { ChatPanel } from '../components/chat/ChatPanel';

export function ChatPage() {
  return (
    <EmployeePageLayout
      title="Chat"
      description="Real-time team chat and direct messaging"
      breadcrumbs={[{ label: 'Employee', href: '/employee/dashboard' }, { label: 'Chat' }]}
      actions={
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900">
            <Download className="w-4 h-4" />
          </button>
        </div>
      }
    >
      <div className="relative">
        <ChatPanel />
      </div>
    </EmployeePageLayout>
  );
}

export default ChatPage;
