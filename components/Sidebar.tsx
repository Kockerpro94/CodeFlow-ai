
import React from 'react';
import { View, User } from '../types';

interface SidebarProps {
  currentView: View;
  onChangeView: (view: View) => void;
  currentUser: User;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, currentUser }) => {
  const navItems = [
    { id: View.Dashboard, icon: 'hub', label: 'Dashboard' },
    { id: View.AIStudio, icon: 'smart_toy', label: 'AI Studio' },
    { id: View.Projects, icon: 'folder_open', label: 'Projects' },
    { id: View.Tasks, icon: 'check_box', label: 'Tasks' },
    { id: View.Snippets, icon: 'code', label: 'Snippets' },
    { id: View.Workflows, icon: 'account_tree', label: 'Workflows' },
    { id: View.Team, icon: 'group', label: 'Team' },
  ];

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-[#233348] bg-[#16202c] shrink-0 h-screen">
      <div className="flex h-16 items-center gap-3 px-6 border-b border-[#233348] cursor-pointer" onClick={() => onChangeView(View.Dashboard)}>
        <div className="size-8 rounded-lg bg-[#136dec]/20 flex items-center justify-center text-[#136dec]">
          <span className="material-symbols-outlined text-[24px]">hub</span>
        </div>
        <div>
          <h1 className="text-base font-bold leading-none tracking-tight text-white">CodeFlow</h1>
          <p className="text-xs text-[#92a9c9] mt-0.5">Central Dashboard</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4 overflow-y-auto">
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors w-full text-left ${
                currentView === item.id
                  ? 'bg-[#136dec]/10 text-[#136dec] border border-[#136dec]/20'
                  : 'text-[#92a9c9] hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${currentView === item.id ? 'filled' : ''}`}>
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-4 mt-4 border-t border-[#233348] pt-4">
          <nav className="flex flex-col gap-1.5">
            <button
              onClick={() => onChangeView(View.Settings)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors w-full text-left ${
                currentView === View.Settings
                  ? 'bg-[#136dec]/10 text-[#136dec] border border-[#136dec]/20'
                  : 'text-[#92a9c9] hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span className="text-sm font-medium">Settings</span>
            </button>
          </nav>

          <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg h-10 bg-[#136dec] text-white text-sm font-bold shadow-lg shadow-[#136dec]/20 hover:bg-[#136dec]/90 transition-colors">
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Project</span>
          </button>

          <div 
            className="flex items-center gap-3 px-3 pt-2 cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-colors"
            onClick={() => onChangeView(View.Profile)}
          >
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full size-8 shrink-0 border border-[#233348]"
              style={{ backgroundImage: `url("${currentUser.avatar}")` }}
            ></div>
            <div className="flex flex-col min-w-0 text-left">
              <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
              <p className="text-xs text-[#92a9c9] truncate">{currentUser.email}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
