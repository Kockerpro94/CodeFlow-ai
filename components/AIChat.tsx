
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm the CodeFlow AI Assistant. I can help you generate code, debug issues, or plan your next sprint. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-2.5-flash-latest'; // Using Flash for speed

      // Create a placeholder message for streaming
      const responseId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: responseId,
        role: 'model',
        text: '',
        timestamp: new Date(),
        isStreaming: true
      }]);

      const result = await ai.models.generateContentStream({
        model: model,
        contents: [
          {
            role: 'user',
            parts: [{ text: input }]
          }
        ],
        config: {
          systemInstruction: "You are a senior software engineer assistant inside the CodeFlow application. Be concise, technical, and helpful. Format code blocks with Markdown."
        }
      });

      let fullText = '';
      for await (const chunk of result) {
        const chunkText = chunk.text;
        if (chunkText) {
          fullText += chunkText;
          setMessages(prev => prev.map(msg => 
            msg.id === responseId 
              ? { ...msg, text: fullText }
              : msg
          ));
        }
      }
      
      setMessages(prev => prev.map(msg => 
        msg.id === responseId 
          ? { ...msg, isStreaming: false }
          : msg
      ));

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I apologize, but I encountered an error connecting to the AI service. Please verify your API key and try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-[#16202c] border border-[#233348] rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in-up overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#233348] bg-[#1c2633]">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
             <span className="material-symbols-outlined text-[20px]">smart_toy</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">CodeFlow AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] text-[#92a9c9]">Online</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-[#92a9c9] hover:text-white p-1 rounded hover:bg-white/5 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-xl p-3 text-sm ${
              msg.role === 'user' 
                ? 'bg-[#136dec] text-white rounded-br-none' 
                : 'bg-[#1c2633] text-gray-200 border border-[#233348] rounded-bl-none'
            }`}>
              <div className={`whitespace-pre-wrap ${msg.isStreaming ? 'typing-cursor' : ''}`}>
                {msg.text}
              </div>
              <p className={`text-[10px] mt-1 opacity-50 ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>
        ))}
        {isLoading && !messages[messages.length - 1].isStreaming && (
          <div className="flex justify-start">
             <div className="bg-[#1c2633] border border-[#233348] rounded-xl p-3 rounded-bl-none flex items-center gap-1">
               <span className="size-1.5 bg-[#92a9c9] rounded-full animate-bounce"></span>
               <span className="size-1.5 bg-[#92a9c9] rounded-full animate-bounce delay-75"></span>
               <span className="size-1.5 bg-[#92a9c9] rounded-full animate-bounce delay-150"></span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-[#233348] bg-[#1c2633]">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI anything..."
            className="w-full bg-[#101822] border border-[#233348] rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[#136dec] transition-colors"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-2 p-1.5 bg-[#136dec] text-white rounded-lg hover:bg-[#136dec]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </form>
    </div>
  );
};
