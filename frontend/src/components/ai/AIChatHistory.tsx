import React from 'react';
import { AIHistoryRecord } from '../../types/ai';
import { MessageSquare, Clock, Sparkles } from 'lucide-react';

interface AIChatHistoryProps {
  records: AIHistoryRecord[];
  onSelectRecord?: (record: AIHistoryRecord) => void;
  onNewChat?: () => void;
}

export const AIChatHistory: React.FC<AIChatHistoryProps> = ({
  records,
  onSelectRecord,
  onNewChat,
}) => {
  return (
    <div className="glass-panel p-6 rounded-3xl border border-[var(--border)] space-y-4 h-full flex flex-col justify-between">
      
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-[var(--text-main)]">Prompt History</h4>
          </div>
          <span className="text-[10px] font-semibold text-[var(--text-dim)] bg-[var(--surface-card)] px-2 py-0.5 rounded-full">
            {records.length} Saved
          </span>
        </div>

        {/* New Session Button */}
        <button
          onClick={onNewChat}
          className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>New AI Conversation</span>
        </button>

        {/* History List */}
        <div className="space-y-2 overflow-y-auto max-h-96 pr-1">
          {records.length === 0 ? (
            <p className="text-xs text-[var(--text-dim)] text-center py-6">
              No previous AI conversations logged.
            </p>
          ) : (
            records.map((rec) => {
              const formattedDate = new Date(rec.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={rec.id}
                  onClick={() => onSelectRecord && onSelectRecord(rec)}
                  className="glass-card p-3 rounded-xl hover:border-emerald-500/40 cursor-pointer space-y-1.5 transition-all group"
                >
                  <p className="text-xs font-semibold text-[var(--text-main)] group-hover:text-emerald-400 truncate">
                    {rec.prompt}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[var(--text-dim)]">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formattedDate}</span>
                    </span>
                    {rec.tokens_used && (
                      <span>{rec.tokens_used} tokens</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-[var(--border)] text-[10px] text-[var(--text-dim)] text-center">
        <span>History stored in Supabase <code className="text-emerald-400 font-mono">ai_history</code></span>
      </div>

    </div>
  );
};
