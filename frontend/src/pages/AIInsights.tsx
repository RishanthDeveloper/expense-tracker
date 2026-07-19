import React, { useState } from 'react';
import { useAI } from '../hooks/useAI';
import { AIHistoryRecord, AIChatMessage } from '../types/ai';
import { AIRecommendations } from '../components/ai/AIRecommendations';
import { AIChatHistory } from '../components/ai/AIChatHistory';
import { Sparkles, Send, Bot, User, Loader2, Zap, RefreshCw } from 'lucide-react';

const initialMessages: AIChatMessage[] = [
  {
    id: '1',
    sender: 'ai',
    text: "Hello! I am your Gemini AI Financial Advisor. I have audited your transactions, income streams, and category limits. How can I help optimize your money today?",
    timestamp: 'Just now',
  },
];

const promptChips = [
  "How can I save $300 more this month?",
  "Analyze my July Food & Dining expenses",
  "Predict my 6-month net worth growth",
  "Identify overspending risks & unused SaaS",
];

export const AIInsightsPage: React.FC = () => {
  const { history, lastAnalysis, isGenerating, generateInsight } = useAI();
  const [messages, setMessages] = useState<AIChatMessage[]>(initialMessages);
  const [inputPrompt, setInputPrompt] = useState('');

  const handleSendPrompt = async (promptToSend?: string) => {
    const query = (promptToSend || inputPrompt).trim();
    if (!query || isGenerating) return;

    const userMsg: AIChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');

    try {
      const result = await generateInsight(query);

      const aiMsg: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: result.responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendations: result.analysis,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I encountered a network issue analyzing your request. Please try again shortly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  const handleSelectHistoryRecord = (record: AIHistoryRecord) => {
    const historicalMsg: AIChatMessage = {
      id: record.id,
      sender: 'user',
      text: record.prompt,
      timestamp: new Date(record.created_at).toLocaleDateString(),
    };
    const historicalAiResponse: AIChatMessage = {
      id: record.id + '_res',
      sender: 'ai',
      text: record.response,
      timestamp: new Date(record.created_at).toLocaleDateString(),
    };
    setMessages([initialMessages[0], historicalMsg, historicalAiResponse]);
  };

  return (
    <div className="space-y-8 relative">
      
      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-main)] flex items-center space-x-3">
            <span>Gemini AI Insights Hub</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              Gemini 1.5 Pro
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            AI-driven transaction audits, overspending detection, and automated wealth building strategies.
          </p>
        </div>

        <button
          onClick={() => handleSendPrompt("Generate comprehensive financial summary for July 2026")}
          disabled={isGenerating}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-teal-500 to-emerald-500 hover:opacity-90 text-white font-semibold text-xs sm:text-sm shadow-glow flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] disabled:opacity-50"
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          <span>Generate Financial Summary</span>
        </button>
      </div>

      {/* ===== AI RECOMMENDATIONS SUMMARY CARDS ===== */}
      <AIRecommendations data={lastAnalysis} />

      {/* ===== DUAL PANEL LAYOUT (Desktop: 2/3 Chat + 1/3 History | Mobile: Stacked) ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Conversation Column (2/3) */}
        <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
          
          {/* Chat Messages Container */}
          <div className="glass-panel p-6 rounded-3xl border border-[var(--border)] min-h-[420px] max-h-[550px] overflow-y-auto space-y-4">
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${
                  msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-bold text-xs ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-600'
                      : 'bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-glow'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm space-y-2 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-500/20 text-[var(--text-main)] border border-emerald-500/30 rounded-tr-none'
                      : 'glass-card text-[var(--text-main)] border border-[var(--border)] rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-[10px] text-[var(--text-dim)] text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Skeleton Loading State during streaming */}
            {isGenerating && (
              <div className="flex items-start space-x-3 animate-pulse">
                <div className="w-9 h-9 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <div className="glass-card p-4 rounded-2xl space-y-2 w-3/4 border border-[var(--border)]">
                  <div className="h-3 bg-[var(--surface-hover)] rounded-full w-5/6" />
                  <div className="h-3 bg-[var(--surface-hover)] rounded-full w-2/3" />
                  <span className="text-[10px] text-indigo-400 font-semibold flex items-center space-x-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Gemini is calculating your financial audit...</span>
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Quick Prompt Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-xs font-semibold text-[var(--text-muted)] flex items-center space-x-1 py-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Suggested:</span>
            </span>
            {promptChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(chip)}
                disabled={isGenerating}
                className="px-3 py-1.5 rounded-xl glass-card text-xs text-[var(--text-muted)] hover:text-emerald-400 hover:border-emerald-500/40 border border-[var(--border)] transition-all disabled:opacity-50"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="glass-card p-2 rounded-2xl border border-[var(--border)] flex items-center space-x-2">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
              placeholder="Ask Gemini AI about your budget, savings rate, or spending habits..."
              className="flex-1 px-4 py-3 bg-transparent text-xs sm:text-sm text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none"
            />
            <button
              onClick={() => handleSendPrompt()}
              disabled={!inputPrompt.trim() || isGenerating}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs shadow-glow flex items-center space-x-1.5 transition-all disabled:opacity-50"
            >
              <span>Ask AI</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* History Panel Column (1/3) */}
        <div>
          <AIChatHistory
            records={history}
            onSelectRecord={handleSelectHistoryRecord}
            onNewChat={() => setMessages(initialMessages)}
          />
        </div>

      </div>

    </div>
  );
};

export default AIInsightsPage;
