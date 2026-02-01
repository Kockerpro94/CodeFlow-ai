
import React from 'react';

const StatCard: React.FC<{ title: string; value: string; trend: string; trendUp: boolean; icon: string }> = ({ title, value, trend, trendUp, icon }) => (
  <div className="flex flex-col p-5 rounded-xl border border-[#233348] bg-[#16202c]/50 hover:border-[#136dec]/30 transition-colors">
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-medium text-[#92a9c9]">{title}</p>
      <span className="material-symbols-outlined text-[#92a9c9] text-[20px]">{icon}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className={`text-xs font-medium flex items-center ${trendUp ? 'text-green-500' : 'text-red-400'}`}>
        <span className="material-symbols-outlined text-[14px]">{trendUp ? 'trending_up' : 'trending_down'}</span>
        {trend}
      </span>
    </div>
  </div>
);

const ActivityItem: React.FC<{ icon: string; color: string; user: string; action: string; target: string; time: string }> = ({ icon, color, user, action, target, time }) => (
  <div className="relative pl-10 group">
    <div className={`absolute left-0 top-1 size-8 rounded-full border border-[#233348] bg-[#1c2633] flex items-center justify-center z-10 group-hover:border-[#136dec]/50 transition-colors`}>
      <span className={`material-symbols-outlined ${color} text-[16px]`}>{icon}</span>
    </div>
    <div>
      <div className="flex items-center gap-2 mb-0.5">
        <p className="text-sm font-medium text-white">{user} <span className="text-[#92a9c9] font-normal">{action}</span></p>
      </div>
      <p className="text-xs text-[#92a9c9]">{target}</p>
      <p className="text-[10px] text-[#92a9c9] mt-1 font-mono opacity-70">{time}</p>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Dashboard Overview</h2>
          <p className="text-[#92a9c9] mt-1">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-500 border border-green-500/20 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span>
            System Operational
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Sprints" value="3" trend="10%" trendUp={true} icon="bolt" />
        <StatCard title="Open PRs" value="12" trend="2%" trendUp={true} icon="rebase" />
        <StatCard title="Deployments" value="5" trend="Today" trendUp={true} icon="rocket_launch" />
        <StatCard title="Team Velocity" value="87%" trend="1.2%" trendUp={false} icon="speed" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simple SVG Chart Implementation */}
        <div className="lg:col-span-2 rounded-xl border border-[#233348] bg-[#16202c] p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-white">Project Velocity</h3>
              <p className="text-xs text-[#92a9c9]">Commit volume & story points over last 30 days</p>
            </div>
            <select className="bg-[#1c2633] border border-[#233348] text-white text-xs rounded-lg px-2 py-1 outline-none focus:border-[#136dec]">
              <option>Last 30 Days</option>
              <option>This Quarter</option>
            </select>
          </div>
          <div className="relative h-64 w-full">
            <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#136dec" stopOpacity="0.3"></stop>
                  <stop offset="100%" stopColor="#136dec" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1="0" y1={i * 75} x2="800" y2={i * 75} stroke="#233348" strokeWidth="1" strokeDasharray="4 4" />
              ))}
              {/* Data Path */}
              <path d="M0 250 C 50 250, 50 180, 100 190 S 150 220, 200 150 S 250 100, 300 120 S 350 180, 400 160 S 450 80, 500 90 S 550 140, 600 110 S 650 50, 700 60 S 750 100, 800 80 V 300 H 0 Z" fill="url(#chartGradient)" stroke="none" />
              <path d="M0 250 C 50 250, 50 180, 100 190 S 150 220, 200 150 S 250 100, 300 120 S 350 180, 400 160 S 450 80, 500 90 S 550 140, 600 110 S 650 50, 700 60 S 750 100, 800 80" fill="none" stroke="#136dec" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Data Points */}
              <circle cx="200" cy="150" r="4" fill="#101822" stroke="#136dec" strokeWidth="2" />
              <circle cx="500" cy="90" r="4" fill="#101822" stroke="#136dec" strokeWidth="2" />
              <circle cx="700" cy="60" r="6" fill="#136dec" stroke="white" strokeWidth="2" />
            </svg>
            <div className="absolute top-[35px] right-[100px] bg-[#1c2633] border border-[#233348] p-2 rounded shadow-lg">
              <p className="text-xs text-[#92a9c9] mb-1">Oct 24</p>
              <p className="text-sm font-bold text-white">42 Commits</p>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-xs text-[#92a9c9] font-mono">
            <span>Oct 01</span>
            <span>Oct 08</span>
            <span>Oct 15</span>
            <span>Oct 22</span>
            <span>Oct 29</span>
          </div>
        </div>

        {/* Task Distribution */}
        <div className="rounded-xl border border-[#233348] bg-[#16202c] p-6 flex flex-col">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white">Task Distribution</h3>
            <p className="text-xs text-[#92a9c9]">Current sprint allocation</p>
          </div>
          <div className="flex-1 flex items-center justify-center relative my-4">
            <svg width="180" height="180" viewBox="0 0 40 40" className="transform -rotate-90">
              <circle cx="20" cy="20" r="15.9155" fill="transparent" stroke="#233348" strokeWidth="5"></circle>
              <circle cx="20" cy="20" r="15.9155" fill="transparent" stroke="#136dec" strokeWidth="5" strokeDasharray="45 55" strokeDashoffset="0"></circle>
              <circle cx="20" cy="20" r="15.9155" fill="transparent" stroke="#8b5cf6" strokeWidth="5" strokeDasharray="30 70" strokeDashoffset="-45"></circle>
              <circle cx="20" cy="20" r="15.9155" fill="transparent" stroke="#14b8a6" strokeWidth="5" strokeDasharray="25 75" strokeDashoffset="-75"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-white">32</span>
              <span className="text-[10px] text-[#92a9c9] uppercase tracking-wider">Total</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-auto">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#136dec]"></span>
                <span className="text-[#92a9c9]">Features</span>
              </div>
              <span className="font-mono text-white">45%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-purple-500"></span>
                <span className="text-[#92a9c9]">Bugs</span>
              </div>
              <span className="font-mono text-white">30%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-teal-500"></span>
                <span className="text-[#92a9c9]">Refactor</span>
              </div>
              <span className="font-mono text-white">25%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[#233348] bg-[#16202c] p-6 flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Recent Activity</h3>
            <button className="p-1 rounded hover:bg-[#1c2633] text-[#92a9c9] hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[20px]">refresh</span>
            </button>
          </div>
          <div className="flex-1 relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-[#233348]"></div>
            <div className="space-y-6">
              <ActivityItem icon="rocket_launch" color="text-green-400" user="Alex" action="deployed" target="commit #8a2b3c" time="10m ago" />
              <ActivityItem icon="code" color="text-blue-400" user="Sarah" action="updated snippet" target="AuthMiddleware in Shared" time="1h ago" />
              <ActivityItem icon="warning" color="text-yellow-400" user="System" action="Alert" target="High latency in us-east-1" time="3h ago" />
              <ActivityItem icon="merge_type" color="text-purple-400" user="Mike" action="merged" target="feat/user-auth into main" time="5h ago" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
