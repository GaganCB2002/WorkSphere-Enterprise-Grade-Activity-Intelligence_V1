import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { GlobalSilentTracker } from './components/GlobalSilentTracker';

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <GlobalSilentTracker />
      <AppRoutes />
    </div>
  );
};

export default App;
