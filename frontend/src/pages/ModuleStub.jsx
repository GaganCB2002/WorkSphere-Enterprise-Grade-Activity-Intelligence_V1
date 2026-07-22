import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import { Construction } from 'lucide-react';

export default function ModuleStub({ title, description = 'This module is under development for this prototype.' }) {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface-secondary">
      <div className="px-6 py-5">
        <PageHeader title={title} description={description} status="Prototype" />
        
        <div className="flex flex-col items-center justify-center py-20 mt-4 rounded-2xl bg-surface border border-subtle border-dashed shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-6">
            <Construction className="w-8 h-8 text-brand-500" />
          </div>
          <h2 className="text-xl font-bold text-primary mb-2">{title} under construction</h2>
          <p className="text-sm text-secondary text-center max-w-md">
            This module is being integrated into the new global architecture. It will be available in the next sprint release.
          </p>
        </div>
      </div>
    </div>
  );
}
