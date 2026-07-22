import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { GlobalSilentTracker } from './components/GlobalSilentTracker';
import { ContactProvider } from './components/layout/ContactContext';
import { ThemeProvider } from './components/layout/ThemeContext';
import { PrototypeBanner } from './components/PrototypeBanner';
import { PrototypeWatermark } from './components/PrototypeWatermark';
import { ComingSoonProvider } from './components/ComingSoonContext';

const App = () => {
  return (
    <ThemeProvider>
      <ContactProvider>
        <ComingSoonProvider>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
            <PrototypeBanner />
            <GlobalSilentTracker />
            <AppRoutes />
            <PrototypeWatermark />
          </div>
        </ComingSoonProvider>
      </ContactProvider>
    </ThemeProvider>
  );
};

export default App;
