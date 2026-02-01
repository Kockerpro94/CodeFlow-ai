
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './views/Dashboard';
import { Projects } from './views/Projects';
import { Snippets } from './views/Snippets';
import { Workflows } from './views/Workflows';
import { Notifications } from './views/Notifications';
import { AIStudio } from './views/AIStudio';
import { AIChat } from './components/AIChat';
import { View } from './types';
import { CURRENT_USER } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case View.Dashboard:
        return <Dashboard />;
      case View.Projects:
      case View.Tasks:
        return <Projects />;
      case View.Snippets:
        return <Snippets />;
      case View.Workflows:
        return <Workflows />;
      case View.Notifications:
        return <Notifications />;
      case View.AIStudio:
        return <AIStudio />;
      case View.Team:
      case View.Settings:
      case View.Analytics:
      case View.Billing:
      case View.Profile:
      default:
        return (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-[#92a9c9]">
            <div>
              <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">construction</span>
              <h2 className="text-xl font-bold text-white mb-2">Under Construction</h2>
              <p>The {currentView} view is coming soon.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#101822] text-slate-300 font-sans selection:bg-[#136dec]/30 selection:text-white relative">
      <Sidebar 
        currentView={currentView} 
        onChangeView={(view) => { setCurrentView(view); setIsMobileMenuOpen(false); }}
        currentUser={CURRENT_USER}
      />
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-[#16202c] shadow-xl z-50">
             <Sidebar 
              currentView={currentView} 
              onChangeView={(view) => { setCurrentView(view); setIsMobileMenuOpen(false); }}
              currentUser={CURRENT_USER}
            />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col min-w-0">
        <Header 
          onNotificationClick={() => setCurrentView(View.Notifications)}
          title={currentView === View.AIStudio ? 'AI Studio' : currentView.charAt(0).toUpperCase() + currentView.slice(1)}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        {renderView()}
      </div>

      {/* AI Floating Button */}
      <button 
        onClick={() => setIsAIChatOpen(!isAIChatOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-4 bg-[#136dec] text-white rounded-full shadow-lg shadow-[#136dec]/30 hover:bg-[#136dec]/90 hover:scale-105 transition-all duration-200"
      >
        <span className="material-symbols-outlined text-[24px]">smart_toy</span>
        <span className="font-bold text-base">AI</span>
      </button>

      {/* AI Chat Overlay */}
      <AIChat isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />
    </div>
  );
};

export default App;
