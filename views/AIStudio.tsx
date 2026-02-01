
import React, { useState, useEffect } from 'react';
import { AI_LOGS } from '../constants';

const MetricCard: React.FC<{ label: string; value: string; subValue?: string; color: string }> = ({ label, value, subValue, color }) => (
  <div className="bg-[#16202c] border border-[#233348] rounded-xl p-4 flex flex-col gap-1">
    <p className="text-xs font-medium text-[#92a9c9] uppercase tracking-wider">{label}</p>
    <div className="flex items-baseline gap-2">
      <h3 className="text-2xl font-bold text-white">{value}</h3>
      {subValue && <span className={`text-xs ${color}`}>{subValue}</span>}
    </div>
  </div>
);

export const AIStudio: React.FC = () => {
  const [logs, setLogs] = useState<string[]>(AI_LOGS);
  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(50);
  const [accuracy, setAccuracy] = useState(87.4);

  useEffect(() => {
    if (!isTraining) return;
    
    const interval = setInterval(() => {
      setEpoch(e => e + 1);
      setAccuracy(a => Math.min(99.9, a + (Math.random() * 0.5 - 0.1)));
      setLogs(prev => [`[RL] Episode ${epoch + 1} completed. Reward: ${(Math.random() * 20).toFixed(1)}`, ...prev.slice(0, 8)]);
    }, 1500);

    return () => clearInterval(interval);
  }, [isTraining, epoch]);

  return (
    <div className="flex flex-col h-full bg-[#101822] overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#233348] bg-[#16202c]/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <span className="material-symbols-outlined text-[20px]">smart_toy</span>
          </div>
          <div>
            <h2 className="text-white font-bold">Nexus Brain v2.0</h2>
            <p className="text-xs text-[#92a9c9]">Reinforcement Learning • Deep Q-Network • PyTorch</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1c2633] border border-[#233348]">
            <span className={`size-2 rounded-full ${isTraining ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
            <span className="text-xs text-white font-mono">{isTraining ? 'TRAINING' : 'IDLE'}</span>
          </div>
          <button 
            onClick={() => setIsTraining(!isTraining)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all shadow-lg ${isTraining ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-[#136dec] hover:bg-[#136dec]/90 shadow-[#136dec]/20'}`}
          >
            <span className="material-symbols-outlined text-[18px]">{isTraining ? 'stop' : 'play_arrow'}</span>
            {isTraining ? 'Stop Training' : 'Start Training'}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 overflow-y-auto">
        {/* Left Column: Metrics & Config */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <MetricCard label="Current Epoch" value={epoch.toString()} subValue="+1.2/s" color="text-green-400" />
            <MetricCard label="Model Accuracy" value={`${accuracy.toFixed(1)}%`} subValue="+0.4%" color="text-green-400" />
            <MetricCard label="Loss Function" value="0.0421" subValue="-0.0012" color="text-green-400" />
            <MetricCard label="Memory Usage" value="4.2 GB" subValue="VRAM" color="text-purple-400" />
          </div>

          <div className="bg-[#16202c] border border-[#233348] rounded-xl p-5 flex flex-col flex-1">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#92a9c9]">tune</span>
              Hyperparameters
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Learning Rate (Alpha)', value: '0.001' },
                { label: 'Discount Factor (Gamma)', value: '0.95' },
                { label: 'Exploration Rate (Epsilon)', value: '1.0 -> 0.01' },
                { label: 'Batch Size', value: '64' },
                { label: 'Optimizer', value: 'AdamW' }
              ].map((param, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-[#92a9c9]">{param.label}</span>
                  <span className="font-mono text-white bg-[#111822] border border-[#233348] px-2 py-1 rounded">{param.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-4 border-t border-[#233348]">
              <button className="w-full py-2 rounded-lg border border-[#233348] hover:bg-[#1c2633] text-[#92a9c9] hover:text-white text-sm transition-colors">
                Export Config (JSON)
              </button>
            </div>
          </div>
        </div>

        {/* Middle Column: Visualization */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Main Chart Area */}
          <div className="bg-[#16202c] border border-[#233348] rounded-xl p-1 relative overflow-hidden h-80 flex items-center justify-center">
             <div className="absolute top-4 left-4 z-10">
               <h3 className="text-sm font-bold text-white">Reward Convergence</h3>
               <p className="text-xs text-[#92a9c9]">Moving Average (100 Episodes)</p>
             </div>
             {/* Simulated SVG Graph */}
             <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#136dec" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {/* Grid */}
                <path d="M0,50 L600,50 M0,100 L600,100 M0,150 L600,150" stroke="#233348" strokeWidth="1" strokeDasharray="4 4" />
                {/* Data Line */}
                <path 
                  d="M0,180 C 50,170, 100,190, 150,140 S 250,160, 300,100 S 400,120, 450,80 S 550,40, 600,30" 
                  fill="none" 
                  stroke="url(#lineGrad)" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />
                <circle cx="600" cy="30" r="4" fill="#fff" className="animate-pulse" />
             </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-64">
             {/* Terminal */}
             <div className="bg-[#0d1117] border border-[#233348] rounded-xl p-4 flex flex-col font-mono text-xs overflow-hidden">
               <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#233348]">
                 <span className="text-[#92a9c9]">Console Output</span>
                 <div className="flex gap-1.5">
                   <div className="size-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                   <div className="size-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                   <div className="size-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                 </div>
               </div>
               <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
                 {logs.map((log, i) => (
                   <div key={i} className="text-gray-400">
                     <span className="text-blue-500 mr-2">{log.split(' ')[0]}</span>
                     <span>{log.split(' ').slice(1).join(' ')}</span>
                   </div>
                 ))}
                 {isTraining && <div className="text-gray-500 animate-pulse">_</div>}
               </div>
             </div>

             {/* Network Topology Visualization (Static) */}
             <div className="bg-[#16202c] border border-[#233348] rounded-xl p-4 flex flex-col">
               <div className="flex items-center justify-between mb-2">
                 <h3 className="text-sm font-bold text-white">Network Topology</h3>
                 <span className="text-[10px] bg-[#233348] px-1.5 py-0.5 rounded text-[#92a9c9]">DQN-50</span>
               </div>
               <div className="flex-1 flex items-center justify-center">
                  <div className="flex items-center gap-8">
                     {/* Input Layer */}
                     <div className="flex flex-col gap-1">
                       {[1,2,3,4,5].map(i => <div key={i} className="size-2 rounded-full bg-[#92a9c9]"></div>)}
                     </div>
                     {/* Hidden 1 */}
                     <div className="flex flex-col gap-1">
                       {[1,2,3,4,5,6,7].map(i => <div key={i} className="size-3 rounded-full bg-purple-500"></div>)}
                     </div>
                     {/* Hidden 2 */}
                     <div className="flex flex-col gap-1">
                       {[1,2,3,4,5,6,7].map(i => <div key={i} className="size-3 rounded-full bg-purple-500"></div>)}
                     </div>
                     {/* Output */}
                     <div className="flex flex-col gap-2">
                       {[1,2,3,4].map(i => <div key={i} className="size-3 rounded-full bg-[#136dec] shadow-[0_0_10px_rgba(19,109,236,0.5)]"></div>)}
                     </div>
                  </div>
               </div>
               <div className="mt-2 text-center text-[10px] text-[#92a9c9]">
                 Input (24) → FC(64) → ReLU → FC(64) → Output (4)
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
