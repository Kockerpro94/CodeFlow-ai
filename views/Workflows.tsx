
import React from 'react';
import { WORKFLOW_NODES, WORKFLOW_EDGES } from '../constants';

export const Workflows: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-[#101822] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#233348_1px,_transparent_1px)] bg-[length:20px_20px] opacity-40"></div>
      
      {/* Floating Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto bg-[#16202c] border border-[#233348] p-1 rounded-lg flex flex-col gap-2 shadow-xl">
          <button className="p-2 text-[#92a9c9] hover:text-white hover:bg-[#233348] rounded transition-colors"><span className="material-symbols-outlined">add</span></button>
          <button className="p-2 text-[#92a9c9] hover:text-white hover:bg-[#233348] rounded transition-colors"><span className="material-symbols-outlined">remove</span></button>
          <button className="p-2 text-[#92a9c9] hover:text-white hover:bg-[#233348] rounded transition-colors"><span className="material-symbols-outlined">center_focus_strong</span></button>
        </div>
        <div className="pointer-events-auto flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#16202c] border border-[#233348] text-white hover:bg-[#233348] transition-colors shadow-lg">
            <span className="material-symbols-outlined text-[18px]">play_arrow</span> Test Run
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#136dec] text-white hover:bg-[#136dec]/90 transition-colors shadow-lg shadow-[#136dec]/20">
            <span className="material-symbols-outlined text-[18px]">rocket_launch</span> Deploy
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative w-full h-full overflow-auto">
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
            </marker>
          </defs>
          {WORKFLOW_EDGES.map(edge => {
            const source = WORKFLOW_NODES.find(n => n.id === edge.from);
            const target = WORKFLOW_NODES.find(n => n.id === edge.to);
            if (!source || !target) return null;
            
            // Simple curve calculation
            const x1 = source.x + 240; // width of node (approx)
            const y1 = source.y + 40;  // mid height
            const x2 = target.x;
            const y2 = target.y + 40;
            
            return (
              <path 
                key={edge.id}
                d={`M ${x1} ${y1} C ${x1 + 50} ${y1}, ${x2 - 50} ${y2}, ${x2} ${y2}`}
                fill="none"
                stroke="#475569"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          })}
        </svg>

        {WORKFLOW_NODES.map(node => (
          <div 
            key={node.id}
            className="absolute w-[240px] bg-[#16202c] rounded-xl border border-[#233348] shadow-lg hover:border-white/20 transition-all cursor-grab active:cursor-grabbing z-10 group"
            style={{ left: node.x, top: node.y }}
          >
            <div className={`px-4 py-2 rounded-t-xl border-b border-[#233348] flex items-center justify-between bg-[#111822]/50`}>
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-[18px] ${node.type === 'trigger' ? 'text-yellow-500' : node.type === 'condition' ? 'text-purple-500' : 'text-blue-500'}`}>{node.icon}</span>
                <span className="text-sm font-semibold text-white">{node.label}</span>
              </div>
              <button className="text-[#92a9c9] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined text-[16px]">more_horiz</span></button>
            </div>
            <div className="p-3">
              <div className="text-xs text-[#92a9c9]">
                {node.type === 'trigger' && 'Runs when a new issue is created in Linear.'}
                {node.type === 'condition' && 'Checks if priority equals "High".'}
                {node.type === 'action' && 'Performs the configured action.'}
              </div>
            </div>
            {/* Ports */}
            {node.type !== 'trigger' && <div className="absolute top-10 -left-2 w-4 h-4 bg-[#101822] border border-[#233348] rounded-full"></div>}
            {node.type !== 'action' && <div className="absolute top-10 -right-2 w-4 h-4 bg-[#101822] border border-[#233348] rounded-full"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};
