
import React, { useState } from 'react';
import { Task } from '../types';
import { TASKS, USERS } from '../constants';

const KanbanColumn: React.FC<{ title: string; tasks: Task[]; count: number; color: string }> = ({ title, tasks, count, color }) => (
  <div className="flex flex-col w-[300px] h-full rounded-xl bg-[#16202c]/50 border border-white/5 shrink-0">
    <div className="p-3 flex items-center justify-between sticky top-0 bg-inherit rounded-t-xl z-10">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span className="bg-[#233348] text-[#92a9c9] text-xs font-medium px-2 py-0.5 rounded-full">{count}</span>
      </div>
      <button className="text-[#92a9c9] hover:text-white"><span className="material-symbols-outlined text-[18px]">more_horiz</span></button>
    </div>
    <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
      {tasks.map(task => {
        const priorityColors = {
          high: 'bg-red-500/10 text-red-400 border-red-500/20',
          medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
          low: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
        };
        const user = USERS.find(u => u.id === task.assignees[0]);

        return (
          <div key={task.id} className="group flex flex-col gap-3 rounded-lg bg-[#233348] p-3 shadow-sm hover:ring-1 hover:ring-[#136dec]/50 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-all duration-200">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold tracking-wider text-[#92a9c9]">{task.id.toUpperCase()}</span>
              <button className="opacity-0 group-hover:opacity-100 text-[#92a9c9] hover:text-white transition-opacity"><span className="material-symbols-outlined text-[18px]">edit</span></button>
            </div>
            <p className="text-sm font-medium text-white leading-tight">{task.title}</p>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${priorityColors[task.priority]}`}>
                {task.priority.toUpperCase()}
              </span>
              {task.dueDate && (
                <div className="flex items-center gap-1 text-[11px] text-[#92a9c9]">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  <span>{task.dueDate}</span>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mt-2 pt-3 border-t border-white/5">
              <div className="flex -space-x-1.5">
                {user && (
                  <div 
                    className="h-6 w-6 rounded-full ring-1 ring-[#233348] bg-cover bg-center" 
                    style={{ backgroundImage: `url("${user.avatar}")` }}
                    title={user.name}
                  ></div>
                )}
              </div>
              <div className="flex items-center gap-2 text-[#92a9c9]">
                {task.comments > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">chat_bubble</span>
                    <span className="text-[10px]">{task.comments}</span>
                  </div>
                )}
                {task.attachments > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">attach_file</span>
                    <span className="text-[10px]">{task.attachments}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800 transition-all text-sm mt-auto">
        <span className="material-symbols-outlined text-[18px]">add</span>
        <span>Quick Add</span>
      </button>
    </div>
  </div>
);

export const Projects: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-[#233348] bg-[#111822]/50 backdrop-blur-sm z-10 shrink-0">
        <div>
          <h2 className="text-white text-2xl font-bold leading-tight">Sprint 24 - Core Features</h2>
          <p className="text-[#92a9c9] text-sm mt-1">Oct 24 - Nov 07 • 12 days remaining</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#233348] text-white hover:bg-slate-700 transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            Complete Sprint
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#136dec] text-white hover:bg-[#136dec]/90 transition-colors text-sm font-medium shadow-lg shadow-[#136dec]/20">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Task
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        <div className="flex h-full gap-6 min-w-max">
          <KanbanColumn title="To Do" count={2} tasks={TASKS.filter(t => t.status === 'todo')} color="border-slate-500" />
          <KanbanColumn title="In Progress" count={2} tasks={TASKS.filter(t => t.status === 'in-progress')} color="border-[#136dec]" />
          <KanbanColumn title="Review" count={1} tasks={TASKS.filter(t => t.status === 'review')} color="border-purple-500" />
          <KanbanColumn title="Done" count={1} tasks={TASKS.filter(t => t.status === 'done')} color="border-green-500" />
        </div>
      </div>
    </div>
  );
};
