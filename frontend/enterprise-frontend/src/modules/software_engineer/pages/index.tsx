import React from 'react';

const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-full text-[#8b949e]">
    <h1 className="text-2xl font-bold text-[#e6edf3] mb-2">{title}</h1>
    <p>This module is currently under construction for Phase 2-5.</p>
  </div>
);

export const Overview = () => <Placeholder title="Dashboard Overview" />;
export { TaskBoard } from './TaskBoard';
export { CodeWorkspace } from './CodeWorkspace';
export { DevOps } from './DevOps';
export { FocusSpace } from './FocusSpace';
export { Team } from './Team';
export { LeaveManagement } from './LeaveManagement';
export { BugTracker } from './BugTracker';
export const Documentation = () => <Placeholder title="Engineering Documentation" />;
