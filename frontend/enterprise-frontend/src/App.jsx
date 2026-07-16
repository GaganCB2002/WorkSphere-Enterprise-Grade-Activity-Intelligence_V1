import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { GlobalSilentTracker } from './components/GlobalSilentTracker';
import { ContactProvider } from './components/layout/ContactContext';
import { ThemeProvider } from './components/layout/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <ContactProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
          <GlobalSilentTracker />
          <AppRoutes />
        </div>
      </ContactProvider>
    </ThemeProvider>
  );
};

export default App;
