
import React from 'react';
import { NOTIFICATIONS } from '../constants';

export const Notifications: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
      <div className="mx-auto max-w-3xl flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">Notifications</h2>
          <button className="text-sm text-[#136dec] font-medium hover:underline">Mark all as read</button>
        </div>
        
        <div className="space-y-4">
          {NOTIFICATIONS.map(notif => (
            <div key={notif.id} className={`group relative flex gap-4 p-5 rounded-xl border ${notif.read ? 'border-[#233348] bg-[#16202c]' : 'border-[#136dec]/40 bg-[#136dec]/5'} transition-all`}>
              <div className="relative shrink-0">
                <div className={`size-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${notif.type === 'alert' ? 'bg-red-500/20 text-red-500' : 'bg-[#1c2633] border border-[#233348]'}`}>
                  {notif.type === 'alert' ? (
                    <span className="material-symbols-outlined text-[20px]">warning</span>
                  ) : notif.type === 'success' ? (
                    <span className="material-symbols-outlined text-[20px] text-green-500">check_circle</span>
                  ) : (
                    <span>{notif.user ? 'U' : 'S'}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">{notif.title}</span>
                  {!notif.read && <span className="size-2 rounded-full bg-[#136dec]"></span>}
                  <span className="text-xs text-[#92a9c9] ml-auto">{notif.time}</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{notif.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
