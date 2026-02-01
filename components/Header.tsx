
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  onNotificationClick: () => void;
  title?: string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNotificationClick, title, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <header className="h-16 flex items-center justify-between gap-4 border-b border-[#233348] bg-[#16202c]/50 backdrop-blur-md px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button 
          className="md:hidden text-[#92a9c9]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="relative w-full group hidden sm:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#92a9c9] group-focus-within:text-[#136dec] transition-colors">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border border-[#233348] bg-[#1c2633] py-2 pl-10 pr-4 text-sm text-white placeholder-[#92a9c9] focus:border-[#136dec] focus:bg-[#1c2633] focus:ring-1 focus:ring-[#136dec] transition-all"
            placeholder="Search projects, tasks, or commands... (Cmd+K)"
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <kbd className="hidden lg:inline-block rounded border border-[#233348] bg-[#101822] px-2 py-0.5 text-[10px] font-bold text-[#92a9c9] font-mono">⌘K</kbd>
          </div>
        </div>
        {title && <h2 className="text-white font-semibold md:hidden truncate">{title}</h2>}
      </div>

      <div className="flex items-center gap-3">
        <button 
          className="relative flex size-9 items-center justify-center rounded-lg border border-[#233348] bg-[#1c2633] text-[#92a9c9] hover:text-white hover:border-[#136dec]/50 transition-colors"
          onClick={onNotificationClick}
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-2 right-2.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#136dec] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#136dec]"></span>
          </span>
        </button>
        <button className="flex size-9 items-center justify-center rounded-lg border border-[#233348] bg-[#1c2633] text-[#92a9c9] hover:text-white hover:border-[#136dec]/50 transition-colors">
          <span className="material-symbols-outlined text-[20px]">help</span>
        </button>
      </div>
    </header>
  );
};
