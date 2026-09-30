'use client';

import React, { useState } from 'react';
import { ActivityLog, UserRole } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { History, MessageSquarePlus, Send } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export interface ActivityTimelineProps {
  logs: ActivityLog[];
  onAddNote?: (noteText: string) => Promise<void>;
}

export function ActivityTimeline({ logs, onAddNote }: ActivityTimelineProps) {
  const [newNote, setNewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, role } = useAuth();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !onAddNote) return;
    try {
      setIsSubmitting(true);
      await onAddNote(newNote.trim());
      setNewNote('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">Audit & History Timeline</h3>
            <p className="text-xs text-slate-400">Chronological activity log and system events</p>
          </div>
        </div>
      </div>

      {/* Add note input box */}
      {onAddNote && (
        <form onSubmit={handleAdd} className="mb-6 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
          <div className="flex items-start gap-3">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
              alt={user?.name || 'User'}
              className="w-7 h-7 rounded-full border border-slate-200 object-cover mt-1"
            />
            <div className="flex-1 space-y-2">
              <textarea
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="Log an audit note or compliance update..."
                rows={2}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="sm"
                  variant="primary"
                  isLoading={isSubmitting}
                  disabled={!newNote.trim()}
                  leftIcon={<Send className="w-3 h-3" />}
                >
                  Log Note
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Timeline List */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {logs.map(log => (
          <div key={log.id} className="relative group">
            {/* Timeline node dot */}
            <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-purple-500 group-hover:scale-125 transition-transform" />

            <div className="bg-white border border-slate-100 p-4 rounded-xl space-y-2 shadow-sm">
              <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src={log.actor?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={log.actor?.name || 'User'}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="font-semibold text-slate-800">{log.actor?.name || 'System'}</span>
                  <Badge variant={log.actor?.role} showDot={false}>
                    {log.actor?.role}
                  </Badge>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {formatDate(log.timestamp)}
                </span>
              </div>

              <p className="text-xs font-semibold text-purple-600">{log.action}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{log.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
