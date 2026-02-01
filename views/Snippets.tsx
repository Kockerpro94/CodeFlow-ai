
import React, { useState } from 'react';
import { SNIPPETS } from '../constants';

export const Snippets: React.FC = () => {
  const [selectedSnippet, setSelectedSnippet] = useState(SNIPPETS[0]);

  return (
    <div className="flex h-full overflow-hidden">
      {/* List */}
      <div className="w-80 lg:w-96 flex-shrink-0 flex flex-col bg-[#16202c] border-r border-[#233348]">
        <div className="p-4 border-b border-[#233348]">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#92a9c9] text-[20px]">search</span>
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 bg-[#111822] border border-[#233348] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#136dec] text-white placeholder-[#92a9c9]" 
              placeholder="Search snippets..."
            />
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button className="px-3 py-1 bg-[#136dec] text-white text-xs font-medium rounded-full whitespace-nowrap">All</button>
            <button className="px-3 py-1 bg-[#1c2633] border border-[#233348] text-[#92a9c9] text-xs font-medium rounded-full whitespace-nowrap hover:text-white transition-colors">React</button>
            <button className="px-3 py-1 bg-[#1c2633] border border-[#233348] text-[#92a9c9] text-xs font-medium rounded-full whitespace-nowrap hover:text-white transition-colors">CSS</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {SNIPPETS.map(snippet => (
            <div 
              key={snippet.id} 
              onClick={() => setSelectedSnippet(snippet)}
              className={`cursor-pointer border-l-[3px] p-4 hover:bg-[#1c2633] transition-colors border-b border-[#233348] ${selectedSnippet.id === snippet.id ? 'border-l-[#136dec] bg-[#1c2633]' : 'border-l-transparent'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-semibold text-white line-clamp-1">{snippet.title}</h3>
                <span className="material-symbols-outlined text-[18px] text-yellow-500">star</span>
              </div>
              <p className="text-xs text-[#92a9c9] mb-3 line-clamp-2">{snippet.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-blue-400">code</span>
                  <span className="text-xs font-medium text-white">{snippet.language}</span>
                </div>
                <span className="text-[10px] text-[#92a9c9]">{snippet.lastEdited}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor/Detail */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#111822]">
        <header className="h-16 border-b border-[#233348] flex items-center justify-between px-6 bg-[#16202c]">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white truncate">{selectedSnippet.title}</h2>
                <span className="material-symbols-outlined text-[#92a9c9] text-[18px] hover:text-white cursor-pointer">edit</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#92a9c9]">
                {selectedSnippet.tags.map(tag => (
                  <span key={tag} className="px-1.5 py-0.5 rounded bg-[#233348] text-white border border-[#233348] border-opacity-50">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-[#136dec] hover:bg-[#136dec]/90 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-[#136dec]/20 transition-all">
              <span>Share</span>
              <span className="material-symbols-outlined text-[16px]">ios_share</span>
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto bg-[#0d1117] p-6 font-mono text-sm">
          <pre className="text-[#e6edf3]">
            {selectedSnippet.code}
          </pre>
        </div>
      </div>
    </div>
  );
};
